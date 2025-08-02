# Manual Render Deployment Instructions

## Files to Upload
Create a ZIP file containing:
- package.json
- tsconfig.json
- tsconfig.prod.json
- src/ folder (entire directory)
- dist/ folder (if exists after build)

## Render Manual Deploy Steps

### 1. Create Web Service
- Go to https://render.com/dashboard
- Click "New +" → "Web Service"
- Choose "Deploy an existing image or build and deploy from a Git repository"
- Select "Public Git repository" or "Upload"

### 2. Choose Manual Upload
- Click "Upload" tab
- Upload your backend folder as a ZIP file

### 3. Service Configuration
**Basic Settings:**
- Service Name: `sustainable-living-backend`
- Region: `Oregon (US West)`
- Runtime: `Node`
- Build Command: `npm ci && npm run build`
- Start Command: `npm start`

### 4. Environment Variables
Add these in the Environment section:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://sustainableuser:yourpassword@sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRE=7d
CLIENT_URL=https://sustainable-living-frontend.onrender.com
PORT=10000
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### 5. Advanced Settings
- Auto-Deploy: No (since it's manual)
- Health Check Path: `/health`

### 6. Deploy
Click "Create Web Service" and wait for deployment to complete.

## Testing After Deployment
Your backend will be available at: `https://sustainable-living-backend.onrender.com`

Test endpoints:
- `https://your-backend-url.onrender.com/health`
- `https://your-backend-url.onrender.com/api/auth/register` (POST)
