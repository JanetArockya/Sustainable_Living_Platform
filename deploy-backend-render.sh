#!/bin/bash

# Render Deployment Script for Backend
echo "🚀 Preparing backend for Render deployment..."

# Navigate to backend directory
cd backend

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building TypeScript project..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! dist/ directory created"
    echo "📁 Contents of dist/:"
    ls -la dist/
else
    echo "❌ Build failed! dist/ directory not found"
    exit 1
fi

# Create deployment verification
echo "🔍 Verifying deployment files..."
if [ -f "dist/server.js" ]; then
    echo "✅ server.js found"
else
    echo "❌ server.js not found in dist/"
    exit 1
fi

echo "✅ Backend is ready for Render deployment!"
echo ""
echo "📝 Next steps:"
echo "1. Go to https://render.com/dashboard"
echo "2. Create new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Select 'backend' as root directory"
echo "5. Use these settings:"
echo "   - Build Command: npm ci && npm run build"
echo "   - Start Command: npm start"
echo "   - Node version: 18"
echo ""
echo "🔧 Environment Variables to set in Render:"
echo "NODE_ENV=production"
echo "MONGODB_URI=your_mongodb_connection_string"
echo "JWT_SECRET=your_jwt_secret"
echo "CLIENT_URL=https://sustainable-living-platform-n87u.vercel.app"
echo "PORT=10000"
