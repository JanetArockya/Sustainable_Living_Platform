# Render Deployment Guide for Sustainable Living Backend

## Prerequisites
1. MongoDB Atlas cluster set up with connection string
2. GitHub repository pushed to GitHub
3. Render account created

## Deployment Steps

### 1. Create New Web Service on Render
- Go to https://render.com/dashboard
- Click "New +" → "Web Service"
- Connect your GitHub repository: `Sustainable_Living_Platform`
- Select the repository

### 2. Configure Service Settings
**Basic Settings:**
- Name: `sustainable-living-backend`
- Region: Choose closest to your users
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Node`
- Build Command: `npm ci && npm run build`
- Start Command: `npm start`

### 3. Environment Variables
Add these environment variables in Render dashboard:

**Required:**
- `NODE_ENV` = `production`
- `MONGODB_URI` = `mongodb+srv://sustainableuser:yourpassword@sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living`
- `JWT_SECRET` = `your-super-secret-jwt-key-here`
- `JWT_EXPIRE` = `7d`
- `CLIENT_URL` = `https://your-frontend-domain.onrender.com`

**Optional:**
- `PORT` = `10000` (Render default)

### 4. Advanced Settings
- **Auto-Deploy:** Yes
- **Health Check Path:** `/api/health`

### 5. Deploy
Click "Create Web Service" and wait for deployment to complete.

## Common Issues and Solutions

### Issue 1: "tsc: command not found"
**Solution:** TypeScript moved to dependencies in package.json

### Issue 2: Build fails with exit code 127
**Solution:** Check that all build dependencies are in `dependencies`, not `devDependencies`

### Issue 3: MongoDB connection fails
**Solution:** Ensure MONGODB_URI is correctly set in environment variables

### 4. Health Check Endpoint
Make sure your server.ts has a health check endpoint:
```typescript
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

## Testing Deployment
Once deployed, test these endpoints:
- `https://your-app.onrender.com/api/health` - Should return 200 OK
- `https://your-app.onrender.com/api/auth/register` - Should accept POST requests
