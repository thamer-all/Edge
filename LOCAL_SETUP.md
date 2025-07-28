# AGI Learning Platform - Local Setup

## 🚀 Quick Start

The application is now running locally with both frontend and backend servers!

### Current Status
- ✅ **Frontend**: Running on http://localhost:3002
- ✅ **Backend**: Running on http://localhost:5001
- ✅ **API Health**: http://localhost:5001/api/health
- ✅ **Missing Dependencies**: Fixed (created analytics-dashboard.js, analytics-tools.js, chart-manager.js)

### How to Start (Future Runs)

#### Option 1: Use the convenience script
```bash
pnpm run dev:full
```

#### Option 2: Start manually
1. **Backend**: `cd server && node server-simple.js`
2. **Frontend**: `pnpm run dev` (in root directory)

### API Endpoints Available

- `GET /api/health` - Server health check
- `GET /api/users` - Mock user data
- `GET /api/lessons` - Mock lesson data
- `GET /api/progress` - Mock progress data
- `GET /api/analytics` - Mock analytics data

### Environment Configuration

The application uses:
- `.env.local` - Frontend environment variables
- `server/config.env` - Backend environment variables

### Database

Currently using a simplified server without database dependencies to avoid SQLite3 native binding issues on macOS ARM64. The server provides mock data for development.

### Issues Resolved

1. **SQLite3 Native Bindings**: Created `server-simple.js` to bypass database dependencies
2. **Missing JavaScript Files**: Created missing analytics modules:
   - `claude-flow/src/ui/console/js/analytics-dashboard.js`
   - `claude-flow/src/ui/console/js/analytics-tools.js`
   - `claude-flow/src/ui/console/js/chart-manager.js`

### Troubleshooting

If you encounter issues:

1. **Port conflicts**: Check if ports 3002 and 5001 are available
2. **Dependencies**: Run `pnpm install` in both root and server directories
3. **SQLite issues**: The simplified server bypasses database dependencies
4. **Missing files**: All required JavaScript files have been created

### Next Steps

To access the full application:
1. Open http://localhost:3002 in your browser
2. The frontend will connect to the backend API automatically
3. All features should work with mock data
4. Analytics dashboard should load without errors

### Development Notes

- Frontend: React + Vite + Tailwind CSS
- Backend: Express.js with mock data
- Package Manager: pnpm
- Ports: Frontend (3002), Backend (5001)
- Analytics: Chart.js integration with custom dashboard 