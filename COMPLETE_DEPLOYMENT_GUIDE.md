# Complete Deployment Guide for Sustainable Living Platform

## 🎯 Overview
This guide covers deploying both the frontend (React/Vite) and backend (Node.js/Express) of your Sustainable Living Platform.

## 📋 Prerequisites
- MongoDB Atlas cluster configured with IP whitelist
- GitHub repository updated
- Render account (for backend)
- Vercel/Netlify account (for frontend)

## 🚀 Deployment Strategy

### Phase 1: Backend Deployment (Render)
1. **MongoDB Atlas Setup** ✅
   - Cluster created: `sustainable-living-cluster`
   - User created: `sustainableuser`
   - IP whitelist configured (0.0.0.0/0 for all IPs)

2. **Backend Deployment**
   - Platform: Render (Free Tier)
   - Runtime: Node.js
   - Build: `npm ci && npm run build`
   - Start: `npm start`

### Phase 2: Frontend Deployment (Vercel)
1. **Frontend Configuration**
   - Update API URL to point to deployed backend
   - Build static assets
   - Deploy to Vercel

2. **Environment Variables**
   - `VITE_API_URL`: Backend URL from Render

## 🔧 Step-by-Step Instructions

### Step 1: Deploy Backend to Render

#### Manual Upload Method:
1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Choose "Upload" tab
4. Upload the `backend/render-deploy` folder as ZIP

#### Configuration:
```
Service Name: sustainable-living-backend
Runtime: Node
Build Command: npm ci && npm run build
Start Command: npm start
Health Check Path: /health
```

#### Environment Variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://sustainableuser:yourpassword@sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRE=7d
CLIENT_URL=https://sustainable-living-frontend.vercel.app
PORT=10000
```

### Step 2: Deploy Frontend to Vercel

#### Method 1: GitHub Integration
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`

#### Method 2: Manual Upload
1. Build locally: `npm run build`
2. Upload `dist` folder to Vercel

#### Environment Variables:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## 🔗 Integration Points

### API Connection
- Frontend connects to backend via environment variable
- Backend serves API at `/api/*` endpoints
- Health check available at `/health`

### Authentication Flow
- JWT tokens stored in localStorage
- API requests include Authorization header
- Backend validates tokens for protected routes

## 🛠️ Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure CLIENT_URL is set correctly in backend
2. **API Connection**: Verify VITE_API_URL points to correct backend URL
3. **Database Connection**: Check MongoDB Atlas IP whitelist
4. **Build Failures**: Ensure all dependencies are in correct package.json sections

## 📊 Testing Deployment

### Backend Tests:
- Health check: `https://your-backend.onrender.com/health`
- API endpoint: `https://your-backend.onrender.com/api/auth/register`

### Frontend Tests:
- Load application: `https://your-frontend.vercel.app`
- Check console for API connection errors
- Test user registration/login flow

## 🎉 Final Steps

1. Update frontend environment variable with actual backend URL
2. Test complete user flow (register → login → dashboard)
3. Verify data persistence in MongoDB Atlas
4. Monitor application performance and logs

## 📈 Post-Deployment

### Monitoring:
- Render dashboard for backend logs
- Vercel dashboard for frontend analytics
- MongoDB Atlas for database metrics

### Updates:
- Push to GitHub triggers automatic redeployment
- Environment variables can be updated in platform dashboards
