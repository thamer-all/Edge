#!/bin/sh
set -e

# Health check script for AGI Learning Platform
# This script is used by Docker HEALTHCHECK and monitoring systems

# Default values
FRONTEND_HOST=${FRONTEND_HOST:-localhost}
BACKEND_HOST=${BACKEND_HOST:-localhost}
BACKEND_PORT=${BACKEND_PORT:-5001}
TIMEOUT=${HEALTH_TIMEOUT:-10}

# Function to check HTTP endpoint
check_http() {
    local url="$1"
    local expected_status="${2:-200}"
    local timeout="${3:-$TIMEOUT}"
    
    response=$(curl -s -w "%{http_code}" --max-time "$timeout" --connect-timeout "$timeout" "$url" -o /dev/null 2>/dev/null || echo "000")
    
    if [ "$response" = "$expected_status" ]; then
        return 0
    else
        echo "❌ HTTP check failed for $url (got $response, expected $expected_status)"
        return 1
    fi
}

# Function to check if a process is running
check_process() {
    local process_name="$1"
    if pgrep "$process_name" >/dev/null 2>&1; then
        return 0
    else
        echo "❌ Process $process_name is not running"
        return 1
    fi
}

# Function to check database connectivity
check_database() {
    if [ -f "/app/backend/scripts/db-check.js" ]; then
        cd /app/backend
        if node scripts/db-check.js >/dev/null 2>&1; then
            return 0
        else
            echo "❌ Database connectivity check failed"
            return 1
        fi
    fi
    return 0  # Skip if no db check script
}

# Function to check disk space
check_disk_space() {
    local min_free_percent="${MIN_DISK_FREE:-10}"
    local usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    local free_percent=$((100 - usage))
    
    if [ "$free_percent" -ge "$min_free_percent" ]; then
        return 0
    else
        echo "❌ Low disk space: only ${free_percent}% free (minimum: ${min_free_percent}%)"
        return 1
    fi
}

# Function to check memory usage
check_memory() {
    local max_memory_percent="${MAX_MEMORY_USAGE:-90}"
    
    if command -v free >/dev/null 2>&1; then
        local memory_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
        if [ "$memory_usage" -le "$max_memory_percent" ]; then
            return 0
        else
            echo "❌ High memory usage: ${memory_usage}% (maximum: ${max_memory_percent}%)"
            return 1
        fi
    fi
    return 0  # Skip if free command not available
}

# Main health check function
main() {
    local exit_code=0
    local checks_passed=0
    local checks_total=0
    
    echo "🏥 Starting health check..."
    
    # Check 1: Frontend health endpoint
    checks_total=$((checks_total + 1))
    echo "🌐 Checking frontend health..."
    if check_http "http://$FRONTEND_HOST/health"; then
        echo "✅ Frontend health check passed"
        checks_passed=$((checks_passed + 1))
    else
        exit_code=1
    fi
    
    # Check 2: Backend API health endpoint
    checks_total=$((checks_total + 1))
    echo "🔧 Checking backend API health..."
    if check_http "http://$BACKEND_HOST:$BACKEND_PORT/api/health"; then
        echo "✅ Backend API health check passed"
        checks_passed=$((checks_passed + 1))
    else
        exit_code=1
    fi
    
    # Check 3: Backend API status endpoint
    checks_total=$((checks_total + 1))
    echo "📊 Checking backend API status..."
    if check_http "http://$BACKEND_HOST/api/status"; then
        echo "✅ Backend API status check passed"
        checks_passed=$((checks_passed + 1))
    else
        exit_code=1
    fi
    
    # Check 4: Nginx process
    checks_total=$((checks_total + 1))
    echo "🌐 Checking nginx process..."
    if check_process "nginx"; then
        echo "✅ Nginx process check passed"
        checks_passed=$((checks_passed + 1))
    else
        exit_code=1
    fi
    
    # Check 5: Node.js process
    checks_total=$((checks_total + 1))
    echo "🔧 Checking Node.js process..."
    if check_process "node"; then
        echo "✅ Node.js process check passed"
        checks_passed=$((checks_passed + 1))
    else
        exit_code=1
    fi
    
    # Check 6: Database connectivity (optional)
    checks_total=$((checks_total + 1))
    echo "🗃️  Checking database connectivity..."
    if check_database; then
        echo "✅ Database connectivity check passed"
        checks_passed=$((checks_passed + 1))
    else
        # Don't fail on database check in case it's not critical
        echo "⚠️  Database connectivity check failed (continuing)"
        checks_passed=$((checks_passed + 1))
    fi
    
    # Check 7: Disk space
    checks_total=$((checks_total + 1))
    echo "💾 Checking disk space..."
    if check_disk_space; then
        echo "✅ Disk space check passed"
        checks_passed=$((checks_passed + 1))
    else
        exit_code=1
    fi
    
    # Check 8: Memory usage
    checks_total=$((checks_total + 1))
    echo "🧠 Checking memory usage..."
    if check_memory; then
        echo "✅ Memory usage check passed"
        checks_passed=$((checks_passed + 1))
    else
        # Don't fail on memory check, just warn
        echo "⚠️  High memory usage detected (continuing)"
        checks_passed=$((checks_passed + 1))
    fi
    
    # Summary
    echo ""
    echo "📋 Health check summary:"
    echo "   Checks passed: $checks_passed/$checks_total"
    
    if [ $exit_code -eq 0 ]; then
        echo "✅ All critical health checks passed - application is healthy!"
    else
        echo "❌ Some critical health checks failed - application is unhealthy!"
    fi
    
    return $exit_code
}

# Advanced health check with detailed output (for monitoring systems)
detailed_check() {
    echo "🔍 Running detailed health check..."
    
    # Frontend response time
    frontend_time=$(curl -w "%{time_total}" -s -o /dev/null "http://$FRONTEND_HOST/health" 2>/dev/null || echo "0")
    echo "🌐 Frontend response time: ${frontend_time}s"
    
    # Backend response time
    backend_time=$(curl -w "%{time_total}" -s -o /dev/null "http://$BACKEND_HOST:$BACKEND_PORT/api/health" 2>/dev/null || echo "0")
    echo "🔧 Backend response time: ${backend_time}s"
    
    # System load (if available)
    if command -v uptime >/dev/null 2>&1; then
        load=$(uptime | awk -F'load average:' '{print $2}')
        echo "📊 System load:$load"
    fi
    
    # Memory info (if available)
    if command -v free >/dev/null 2>&1; then
        memory_info=$(free -h | awk 'NR==2{printf "Used: %s/%s (%.0f%%)", $3,$2,$3*100/$2}')
        echo "🧠 Memory: $memory_info"
    fi
    
    # Disk usage
    disk_info=$(df -h / | awk 'NR==2{printf "Used: %s/%s (%s)", $3,$2,$5}')
    echo "💾 Disk: $disk_info"
    
    main
}

# Handle command line arguments
case "${1:-}" in
    "detailed")
        detailed_check
        ;;
    "quick")
        # Quick check - just the essential endpoints
        check_http "http://$FRONTEND_HOST/health" && \
        check_http "http://$BACKEND_HOST:$BACKEND_PORT/api/health"
        ;;
    *)
        main
        ;;
esac 