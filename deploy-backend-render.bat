@echo off
REM Render Deployment Script for Backend (Windows)
echo 🚀 Preparing backend for Render deployment...

REM Navigate to backend directory
cd backend

REM Install dependencies
echo 📦 Installing dependencies...
call npm ci

REM Build the project
echo 🔨 Building TypeScript project...
call npm run build

REM Check if build was successful
if exist "dist" (
    echo ✅ Build successful! dist/ directory created
    echo 📁 Contents of dist/:
    dir dist
) else (
    echo ❌ Build failed! dist/ directory not found
    exit /b 1
)

REM Create deployment verification
echo 🔍 Verifying deployment files...
if exist "dist\server.js" (
    echo ✅ server.js found
) else (
    echo ❌ server.js not found in dist/
    exit /b 1
)

echo ✅ Backend is ready for Render deployment!
echo.
echo 📝 Next steps:
echo 1. Go to https://render.com/dashboard
echo 2. Create new Web Service
echo 3. Connect your GitHub repository
echo 4. Select 'backend' as root directory
echo 5. Use these settings:
echo    - Build Command: npm ci ^&^& npm run build
echo    - Start Command: npm start
echo    - Node version: 18
echo.
echo 🔧 Environment Variables to set in Render:
echo NODE_ENV=production
echo MONGODB_URI=your_mongodb_connection_string
echo JWT_SECRET=your_jwt_secret
echo CLIENT_URL=https://sustainable-living-platform-n87u.vercel.app
echo PORT=10000

pause
