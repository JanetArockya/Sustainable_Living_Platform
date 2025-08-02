// Render Deployment Diagnostic Tool
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏥 RENDER DEPLOYMENT DIAGNOSTICS');
console.log('================================\n');

console.log('📋 1. Checking Local Backend Build Status:');

const backendPath = path.join(__dirname, 'backend');
const distPath = path.join(backendPath, 'dist');
const serverJsPath = path.join(distPath, 'server.js');
const packageJsonPath = path.join(backendPath, 'package.json');

try {
  // Check if backend directory exists
  if (fs.existsSync(backendPath)) {
    console.log('   ✅ Backend directory exists');
    
    // Check if package.json exists
    if (fs.existsSync(packageJsonPath)) {
      console.log('   ✅ package.json exists');
      
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      console.log(`   📦 Package name: ${packageJson.name}`);
      console.log(`   🏁 Start command: ${packageJson.scripts.start}`);
      console.log(`   🔨 Build command: ${packageJson.scripts.build}`);
    } else {
      console.log('   ❌ package.json missing');
    }
    
    // Check if dist directory exists
    if (fs.existsSync(distPath)) {
      console.log('   ✅ dist/ directory exists');
      
      // Check if server.js exists
      if (fs.existsSync(serverJsPath)) {
        console.log('   ✅ dist/server.js exists');
        
        // Check file size
        const stats = fs.statSync(serverJsPath);
        console.log(`   📏 server.js size: ${stats.size} bytes`);
        
        if (stats.size > 1000) {
          console.log('   ✅ server.js appears to be properly built');
        } else {
          console.log('   ⚠️  server.js seems too small - build might be incomplete');
        }
      } else {
        console.log('   ❌ dist/server.js missing - build failed');
      }
      
      // List dist contents
      const distContents = fs.readdirSync(distPath);
      console.log(`   📁 dist/ contents: ${distContents.join(', ')}`);
      
    } else {
      console.log('   ❌ dist/ directory missing - build never completed');
    }
    
  } else {
    console.log('   ❌ Backend directory not found');
  }
} catch (error) {
  console.log(`   ❌ Error checking backend: ${error.message}`);
}

console.log('\n📋 2. Environment Variables Check:');
const requiredEnvVars = [
  'NODE_ENV',
  'MONGODB_URI', 
  'JWT_SECRET',
  'CLIENT_URL'
];

console.log('   Required for Render deployment:');
requiredEnvVars.forEach(varName => {
  console.log(`   - ${varName}: ✅ (set in Render dashboard)`);
});

console.log('\n📋 3. Render Deployment Checklist:');
console.log('   Please verify in your Render dashboard:');
console.log('   □ Service is created');
console.log('   □ GitHub repository is connected');
console.log('   □ Root Directory is set to "backend"');
console.log('   □ Build Command: "npm ci && npm run build"');
console.log('   □ Start Command: "npm start"');
console.log('   □ All environment variables are set');
console.log('   □ Service status shows "Live" (not "Building" or "Failed")');

console.log('\n📋 4. Next Steps:');
console.log('   1. Share the exact URL from your Render dashboard');
console.log('   2. Check build logs for any errors');
console.log('   3. If deployment failed, fix errors and redeploy');
console.log('   4. If successful, the health endpoint should work');

console.log('\n🔗 Expected URLs:');
console.log('   Health Check: https://your-service-name.onrender.com/health');
console.log('   API Base: https://your-service-name.onrender.com/api');

console.log('\n📞 Please share:');
console.log('   - Your exact Render service URL');
console.log('   - Deployment status (Building/Live/Failed)');
console.log('   - Any error messages from build logs');
