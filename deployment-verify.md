# Deployment Verification Script

## Quick Test Commands

### Test Frontend Deployment
curl https://sustainable-living-platform-fhueffuyv8-janet-arockyas-projects.vercel.app

### Test Backend Health Check
curl https://sustainable-living-platform.onrender.com/api/health

### Test Backend Demo Authentication
curl -X POST https://sustainable-living-platform.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "demo@example.com", "password": "demo123"}'

### Test Backend Protected Route with Demo Token
curl https://sustainable-living-platform.onrender.com/api/users/goals \
  -H "Authorization: Bearer demo-jwt-token-abc123"

## Browser Tests
1. Open: https://sustainable-living-platform-fhueffuyv8-janet-arockyas-projects.vercel.app
2. Try login with any credentials
3. Check dashboard loads
4. Test metric saving functionality

## Expected Results
- Frontend: Should load authentication page
- Backend Health: {"success": true, "message": "Server is running!"}
- Demo Auth: Should return success with demo user data
- Protected Route: Should return mock goals data

## Deployment Status Monitoring
- Vercel: Check https://vercel.com/dashboard
- Render: Check https://dashboard.render.com
