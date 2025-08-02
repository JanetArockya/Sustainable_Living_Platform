# Quick Deployment Verification

## Step 1: Find Your URLs
1. Render Dashboard → Your backend service → Copy URL
2. Vercel Dashboard → Your frontend project → Copy URL

## Step 2: Test Backend
Open: https://YOUR-BACKEND-URL.onrender.com/health

Should return:
```json
{
  "status": "OK",
  "message": "Sustainable Living Platform API is running",
  "timestamp": "...",
  "environment": "production"
}
```

## Step 3: Test Frontend
Open: https://YOUR-FRONTEND-URL.vercel.app

Should show: Beautiful dashboard with login/register options

## Step 4: Test Connection
1. Try registering a new user
2. Check browser console (F12) for any errors
3. If errors, check environment variables

## Step 5: Update Environment Variables (if needed)

### Frontend (Vercel):
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### Backend (Render):
```
CLIENT_URL=https://your-frontend-url.vercel.app
MONGODB_URI=mongodb+srv://sustainableuser:password@...
JWT_SECRET=your-jwt-secret
```

## Common Success Indicators:
✅ Backend health endpoint returns JSON
✅ Frontend loads without console errors
✅ User registration works
✅ MongoDB connection successful in backend logs
✅ No CORS errors

## If Something's Wrong:
1. Check deployment logs in dashboards
2. Verify environment variables match
3. Ensure MongoDB Atlas IP whitelist allows 0.0.0.0/0
4. Check that MongoDB user has correct permissions
