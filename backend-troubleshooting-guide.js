// Backend Deployment Troubleshooting Guide
console.log('🔧 BACKEND DEPLOYMENT TROUBLESHOOTING');
console.log('=====================================\n');

console.log('❌ CURRENT STATUS:');
console.log('   Backend URL: https://sustainable-living-platform.onrender.com');
console.log('   Health Endpoint: Not responding');
console.log('   Issue: Service not accessible\n');

console.log('🔍 DEBUGGING STEPS:\n');

console.log('1. CHECK RENDER SERVICE STATUS:');
console.log('   → Go to: https://dashboard.render.com');
console.log('   → Find service: sustainable-living-platform');
console.log('   → Look for status: Building, Live, Failed, or Sleeping');
console.log('   → If "Building": Wait for completion (5-10 minutes)');
console.log('   → If "Failed": Check build logs for errors');
console.log('   → If "Sleeping": Visit URL in browser to wake up\n');

console.log('2. VERIFY RENDER CONFIGURATION:');
console.log('   ✅ Service Name: sustainable-living-platform');
console.log('   ✅ Root Directory: backend');
console.log('   ✅ Build Command: npm ci && npm run build');
console.log('   ✅ Start Command: npm start');
console.log('   ✅ Port: 10000 (or leave empty for auto-detect)\n');

console.log('3. CHECK ENVIRONMENT VARIABLES:');
console.log('   Required variables in Render:');
console.log('   ✅ NODE_ENV=production');
console.log('   ✅ JWT_SECRET=(your secret key)');
console.log('   ✅ CLIENT_URL=https://sustainable-living-platform-n87u.vercel.app');
console.log('   🔄 MONGODB_URI=mongodb+srv://growwithmeuser:Grow_sus25@sustainable-living-clus.z90luwx.mongodb.net/sustainable_living?retryWrites=true&w=majority&appName=sustainable-living-cluster');
console.log('   ✅ PORT=10000\n');

console.log('4. COMMON ISSUES & SOLUTIONS:');
console.log('   🔸 Build Failed:');
console.log('     - Check package.json scripts');
console.log('     - Ensure TypeScript compiles correctly');
console.log('     - Verify all dependencies are listed');
console.log('   🔸 Start Failed:');
console.log('     - Ensure dist/server.js exists after build');
console.log('     - Check start command points to correct file');
console.log('   🔸 Runtime Error:');
console.log('     - Check MongoDB connection');
console.log('     - Verify environment variables');
console.log('     - Check application logs\n');

console.log('5. IMMEDIATE ACTIONS:');
console.log('   A. Check Render Dashboard Status');
console.log('   B. Update MONGODB_URI if not done already');
console.log('   C. Check build/deploy logs for errors');
console.log('   D. Try manual redeploy if needed\n');

console.log('6. WAKE UP SERVICE (if sleeping):');
console.log('   → Visit: https://sustainable-living-platform.onrender.com/health');
console.log('   → Wait 30-60 seconds for service to start');
console.log('   → Refresh and check if it responds\n');

console.log('📋 CHECKLIST:');
console.log('   □ Service status is "Live" in Render dashboard');
console.log('   □ MONGODB_URI updated with correct connection string');
console.log('   □ Build logs show successful completion');
console.log('   □ No errors in deploy logs');
console.log('   □ Health endpoint responds: https://sustainable-living-platform.onrender.com/health');

console.log('\n💡 QUICK TEST:');
console.log('   Open browser and visit:');
console.log('   https://sustainable-living-platform.onrender.com/health');
console.log('   Expected response: {"status":"OK","message":"..."}');

console.log('\n🚀 ONCE BACKEND IS WORKING:');
console.log('   We can immediately update Vercel with:');
console.log('   VITE_API_URL=https://sustainable-living-platform.onrender.com/api');
console.log('   And your authentication will work!');
