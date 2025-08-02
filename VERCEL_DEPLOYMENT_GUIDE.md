# Vercel Frontend Deployment Guide

## Current Status
✅ **Backend Deployed**: Your backend is successfully deployed on Render  
✅ **Frontend Domain Created**: `sustainable-living-platform-n87u.vercel.app`  
⏳ **Next Step**: Configure environment variables to connect frontend to backend

## Step-by-Step Vercel Configuration

### Step 1: Get Your Backend URL
1. Go to your **Render Dashboard**: https://dashboard.render.com
2. Find your backend service
3. Copy the URL (should look like: `https://your-service-name.onrender.com`)

### Step 2: Configure Environment Variables in Vercel
1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your project: **"sustainable-living-platform"**
3. Go to **Settings** tab (top navigation)
4. Click **"Environment Variables"** in the left sidebar
5. Add these variables one by one:

#### Required Variables:
```
Name: VITE_API_BASE_URL
Value: https://YOUR-RENDER-URL.onrender.com/api
Environment: Production
```

```
Name: NODE_ENV
Value: production
Environment: Production
```

#### Optional Variables:
```
Name: VITE_ENABLE_ANALYTICS
Value: true
Environment: Production
```

### Step 3: Redeploy to Apply Changes
1. After adding all environment variables, go to **"Deployments"** tab
2. Click on the latest deployment
3. Click **"Redeploy"** button (three dots menu → Redeploy)
4. Wait for the new deployment to complete

### Step 4: Test Your Application
1. Visit your domain: `https://sustainable-living-platform-n87u.vercel.app`
2. Try to register a new account
3. Check if login works
4. Verify dashboard loads with data

## Important Notes

### API Endpoint Configuration
Your frontend will make requests to:
```
Frontend Domain: https://sustainable-living-platform-n87u.vercel.app
Backend API: https://your-render-url.onrender.com/api
```

### Environment Variable Format
- Use `VITE_` prefix for variables accessed in frontend code
- The `VITE_API_BASE_URL` should include `/api` at the end
- Example: `https://sustainable-living-backend-xyz.onrender.com/api`

### CORS Configuration
Your backend is already configured to accept requests from Vercel domains.

## Troubleshooting

### If Frontend Can't Connect to Backend:
1. Check if environment variables are set correctly
2. Verify backend URL is accessible (visit the health endpoint)
3. Check browser console for CORS errors
4. Ensure you redeployed after adding environment variables

### If Authentication Doesn't Work:
1. Verify JWT_SECRET is set in backend (Render)
2. Check if MongoDB connection is working
3. Test backend endpoints directly using a tool like Postman

### Health Check URLs:
- **Backend Health**: `https://your-render-url.onrender.com/health`
- **Frontend**: `https://sustainable-living-platform-n87u.vercel.app`

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "API not found" errors | Check `VITE_API_BASE_URL` includes `/api` suffix |
| "CORS error" | Verify backend CORS settings include Vercel domain |
| "Environment variables not working" | Redeploy frontend after adding variables |
| "Backend not responding" | Check if Render service is running (free tier sleeps) |

## Next Steps After Deployment
1. ✅ Test user registration
2. ✅ Test login functionality  
3. ✅ Verify dashboard data loading
4. ✅ Test all main features
5. 📱 Share the live URL for your LabMentix presentation!

---
**Your Live Application**: https://sustainable-living-platform-n87u.vercel.app
