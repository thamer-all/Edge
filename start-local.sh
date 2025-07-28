#!/bin/bash

echo "🚀 Starting AGI Learning Platform locally..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    pkill -f "node.*server-simple.js"
    pkill -f "vite"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server
echo "📡 Starting backend server on port 5001..."
cd server && node server-simple.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "🌐 Starting frontend server on port 3002..."
cd .. && pnpm run dev &
FRONTEND_PID=$!

echo "✅ Both servers are starting..."
echo "🔗 Backend API: http://localhost:5001"
echo "🌐 Frontend: http://localhost:3002"
echo "📊 Health check: http://localhost:5001/api/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID 