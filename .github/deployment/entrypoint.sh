#!/bin/sh
set -e

echo "🚀 Starting AGI Learning Platform..."

# Environment variables with defaults
NODE_ENV=${NODE_ENV:-production}
PORT=${PORT:-5001}
FRONTEND_URL=${FRONTEND_URL:-http://localhost}
BACKEND_URL=${BACKEND_URL:-http://localhost:5001}

echo "📊 Environment: $NODE_ENV"
echo "🌐 Frontend URL: $FRONTEND_URL"
echo "🔧 Backend URL: $BACKEND_URL"
echo "🔌 Backend Port: $PORT"

# Create necessary directories
mkdir -p /var/log/app
mkdir -p /var/cache/nginx
mkdir -p /tmp/nginx

# Set proper permissions for nginx directories
if [ "$(whoami)" = "root" ]; then
    chown -R nginx:nginx /var/cache/nginx
    chown -R nginx:nginx /var/log/nginx
    chown -R nginx:nginx /tmp/nginx
fi

# Function to handle shutdown gracefully
shutdown() {
    echo "🛑 Shutting down gracefully..."
    
    # Stop backend server
    if [ ! -z "$BACKEND_PID" ]; then
        echo "⏹️  Stopping backend server (PID: $BACKEND_PID)..."
        kill -TERM "$BACKEND_PID" 2>/dev/null || true
        wait "$BACKEND_PID" 2>/dev/null || true
    fi
    
    # Stop nginx
    if [ ! -z "$NGINX_PID" ]; then
        echo "⏹️  Stopping nginx (PID: $NGINX_PID)..."
        kill -TERM "$NGINX_PID" 2>/dev/null || true
        wait "$NGINX_PID" 2>/dev/null || true
    fi
    
    echo "✅ Shutdown complete"
    exit 0
}

# Trap signals for graceful shutdown
trap shutdown SIGTERM SIGINT

# Validate environment
echo "🔍 Validating environment..."

# Check if backend files exist
if [ ! -f "/app/backend/server.js" ]; then
    echo "❌ Backend server.js not found!"
    exit 1
fi

# Check if frontend files exist
if [ ! -f "/app/frontend/index.html" ]; then
    echo "❌ Frontend index.html not found!"
    exit 1
fi

# Check if package.json exists
if [ ! -f "/app/backend/package.json" ]; then
    echo "❌ Backend package.json not found!"
    exit 1
fi

echo "✅ Environment validation complete"

# Database migration/setup (if needed)
echo "🗃️  Setting up database..."
cd /app/backend
if [ -f "scripts/migrate.js" ]; then
    echo "🔄 Running database migrations..."
    node scripts/migrate.js || {
        echo "❌ Database migration failed!"
        exit 1
    }
fi

# Start backend server
echo "🔧 Starting backend server..."
cd /app/backend

# Set environment variables for backend
export NODE_ENV="$NODE_ENV"
export PORT="$PORT"
export FRONTEND_URL="$FRONTEND_URL"

# Start backend in background
node server.js > /var/log/app/backend.log 2>&1 &
BACKEND_PID=$!

echo "✅ Backend server started (PID: $BACKEND_PID)"

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
BACKEND_READY=0
RETRY_COUNT=0
MAX_RETRIES=30

while [ $BACKEND_READY -eq 0 ] && [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -f "http://localhost:$PORT/api/health" >/dev/null 2>&1; then
        BACKEND_READY=1
        echo "✅ Backend is ready!"
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        echo "⏳ Backend not ready yet (attempt $RETRY_COUNT/$MAX_RETRIES)..."
        sleep 2
    fi
done

if [ $BACKEND_READY -eq 0 ]; then
    echo "❌ Backend failed to start within timeout!"
    echo "📋 Backend logs:"
    tail -20 /var/log/app/backend.log
    exit 1
fi

# Test nginx configuration
echo "🔍 Testing nginx configuration..."
nginx -t || {
    echo "❌ Nginx configuration test failed!"
    exit 1
}

echo "✅ Nginx configuration is valid"

# Start nginx
echo "🌐 Starting nginx..."

# Start nginx in background
nginx > /var/log/app/nginx.log 2>&1 &
NGINX_PID=$!

echo "✅ Nginx started (PID: $NGINX_PID)"

# Wait for nginx to be ready
echo "⏳ Waiting for nginx to be ready..."
NGINX_READY=0
RETRY_COUNT=0
MAX_RETRIES=10

while [ $NGINX_READY -eq 0 ] && [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -f "http://localhost/health" >/dev/null 2>&1; then
        NGINX_READY=1
        echo "✅ Nginx is ready!"
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        echo "⏳ Nginx not ready yet (attempt $RETRY_COUNT/$MAX_RETRIES)..."
        sleep 1
    fi
done

if [ $NGINX_READY -eq 0 ]; then
    echo "❌ Nginx failed to start within timeout!"
    echo "📋 Nginx logs:"
    tail -20 /var/log/app/nginx.log
    exit 1
fi

# Final health check
echo "🏥 Performing final health check..."
if curl -f "http://localhost/api/health" >/dev/null 2>&1; then
    echo "✅ Application is healthy and ready!"
else
    echo "❌ Final health check failed!"
    exit 1
fi

# Print startup summary
echo ""
echo "🎉 AGI Learning Platform started successfully!"
echo "📊 Environment: $NODE_ENV"
echo "🌐 Frontend: http://localhost"
echo "🔧 Backend API: http://localhost/api"
echo "🏥 Health Check: http://localhost/health"
echo "📈 Metrics: http://localhost:8080/metrics"
echo ""

# Monitor processes and restart if needed
echo "👀 Monitoring processes..."
while true; do
    # Check if backend is still running
    if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
        echo "❌ Backend process died! Exiting..."
        exit 1
    fi
    
    # Check if nginx is still running
    if ! kill -0 "$NGINX_PID" 2>/dev/null; then
        echo "❌ Nginx process died! Exiting..."
        exit 1
    fi
    
    # Check if backend is responding
    if ! curl -f "http://localhost:$PORT/api/health" >/dev/null 2>&1; then
        echo "⚠️  Backend health check failed!"
        echo "📋 Recent backend logs:"
        tail -10 /var/log/app/backend.log
    fi
    
    # Check if nginx is responding
    if ! curl -f "http://localhost/health" >/dev/null 2>&1; then
        echo "⚠️  Nginx health check failed!"
        echo "📋 Recent nginx logs:"
        tail -10 /var/log/app/nginx.log
    fi
    
    sleep 30
done 