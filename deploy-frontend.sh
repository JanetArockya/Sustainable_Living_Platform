#!/bin/bash
# Frontend Deployment Preparation Script

echo "🚀 Preparing Frontend for Deployment..."

# Build the frontend
echo "📦 Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
    echo "📁 Built files are in the 'dist' directory"
    echo ""
    echo "📋 Next steps:"
    echo "1. Deploy to Vercel: https://vercel.com/new"
    echo "2. Upload the 'dist' folder or connect GitHub repository"
    echo "3. Set environment variable: VITE_API_URL=https://your-backend.onrender.com/api"
    echo ""
    echo "🔗 Or deploy via CLI:"
    echo "   npx vercel --prod"
else
    echo "❌ Frontend build failed!"
    echo "Please check the errors above and fix them before deploying."
fi
