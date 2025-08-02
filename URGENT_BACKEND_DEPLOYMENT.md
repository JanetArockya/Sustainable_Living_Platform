# 🚀 URGENT: Backend Deployment to Render

## The Problem
Your frontend is working at `https://sustainable-living-platform-n87u.vercel.app` but the backend is NOT deployed to Render, causing authentication failures.

## Solution: Deploy Backend to Render NOW

### Step 1: Go to Render Dashboard
1. Visit: https://dashboard.render.com
2. Log in to your account
3. Click "Create new Web Service"

### Step 2: Connect Repository
1. Connect your GitHub account if not already connected
2. Select your `Sustainable_Living_Platform` repository
3. Click "Connect"

### Step 3: Configure the Service
```
Service Name: sustainable-living-backend
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm ci && npm run build
Start Command: npm start
Plan: Free
```

### Step 4: Environment Variables (CRITICAL!)
Add these environment variables in Render:

```
NODE_ENV=production
JWT_SECRET=your_super_secure_jwt_secret_key_here_min_32_chars
JWT_EXPIRE=7d
CLIENT_URL=https://sustainable-living-platform-n87u.vercel.app
PORT=10000
MONGODB_URI=mongodb+srv://sustainableuser:your_password@sustainable-living-cluster.mongodb.net/sustainableDB?retryWrites=true&w=majority
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

**IMPORTANT**: Replace `your_password` with your actual MongoDB password!

### Step 5: Advanced Settings
- Auto-Deploy: Yes
- Health Check Path: `/health`

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Copy the generated URL (e.g., `https://sustainable-living-backend-xyz.onrender.com`)

## After Backend Deployment

### Update Frontend Environment Variables in Vercel
1. Go to: https://vercel.com/dashboard
2. Find your `sustainable-living-platform` project
3. Go to Settings → Environment Variables
4. Update or add:
   ```
   VITE_API_URL = https://your-new-backend-url.onrender.com/api
   ```

### Test the Deployment
1. Visit: `https://your-backend-url.onrender.com/health`
2. Should return: `{"status":"OK","message":"Sustainable Living Platform API is running"}`

## Why This Is Happening
1. ❌ Backend was never deployed to Render
2. ❌ Frontend environment variables point to non-existent backend URLs
3. ❌ Authentication fails because API calls can't reach the backend

## Once Fixed
✅ Login will work
✅ Registration will work  
✅ Dashboard data will load
✅ All API calls will succeed

## Need Help?
If you encounter issues:
1. Check Render deployment logs
2. Verify environment variables are set correctly
3. Test the health endpoint
4. Update Vercel environment variables with the correct backend URL

## Expected Timeline
- Backend deployment: 5-10 minutes
- Frontend environment update: 2-3 minutes
- Total time to fix: ~15 minutes
