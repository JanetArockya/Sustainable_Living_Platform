// Deployment Verification Script
// Replace YOUR_BACKEND_URL with your actual backend URL

const BACKEND_URL = 'https://your-backend-name.onrender.com';
const FRONTEND_URL = 'https://your-frontend-name.vercel.app';

console.log('🚀 SUSTAINABLE LIVING PLATFORM - DEPLOYMENT VERIFICATION');
console.log('='.repeat(60));

// Test Backend Health
const testBackendHealth = async () => {
  console.log('\n1. 🔍 Testing Backend Health...');
  console.log(`   URL: ${BACKEND_URL}/health`);
  
  try {
    const response = await fetch(`${BACKEND_URL}/health`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('   ✅ Backend is healthy!');
      console.log('   📊 Status:', data.status);
      console.log('   🕐 Timestamp:', data.timestamp);
      console.log('   🌍 Environment:', data.environment);
      return true;
    } else {
      console.log('   ❌ Backend health check failed');
      return false;
    }
  } catch (error) {
    console.log('   ❌ Could not reach backend:', error.message);
    return false;
  }
};

// Test Backend API Endpoints
const testBackendAPI = async () => {
  console.log('\n2. 🔗 Testing Backend API Endpoints...');
  
  const endpoints = [
    { path: '/api/auth/register', method: 'OPTIONS', description: 'Auth Registration' },
    { path: '/api/auth/login', method: 'OPTIONS', description: 'Auth Login' },
    { path: '/api/users', method: 'OPTIONS', description: 'User Management' },
    { path: '/api/carbon', method: 'OPTIONS', description: 'Carbon Tracking' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${BACKEND_URL}${endpoint.path}`, {
        method: endpoint.method
      });
      
      if (response.status === 200 || response.status === 204) {
        console.log(`   ✅ ${endpoint.description}: Available`);
      } else {
        console.log(`   ⚠️  ${endpoint.description}: Status ${response.status}`);
      }
    } catch (error) {
      console.log(`   ❌ ${endpoint.description}: Failed`);
    }
  }
};

// Test CORS Configuration
const testCORS = async () => {
  console.log('\n3. 🌐 Testing CORS Configuration...');
  
  try {
    const response = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: {
        'Origin': FRONTEND_URL
      }
    });
    
    const corsHeaders = response.headers.get('Access-Control-Allow-Origin');
    if (corsHeaders) {
      console.log('   ✅ CORS is properly configured');
      console.log('   🔗 Allowed Origin:', corsHeaders);
    } else {
      console.log('   ⚠️  CORS headers not found');
    }
  } catch (error) {
    console.log('   ❌ CORS test failed:', error.message);
  }
};

// Main verification function
const verifyDeployment = async () => {
  console.log('🏁 Starting deployment verification...\n');
  
  const healthCheck = await testBackendHealth();
  
  if (healthCheck) {
    await testBackendAPI();
    await testCORS();
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 VERIFICATION COMPLETE');
  console.log('\n📖 Next Steps:');
  console.log('   1. Update frontend environment variables with backend URL');
  console.log('   2. Test user registration and login');
  console.log('   3. Verify MongoDB connection in backend logs');
  console.log('   4. Test all major features');
  
  console.log('\n🔗 Your URLs:');
  console.log(`   Backend:  ${BACKEND_URL}`);
  console.log(`   Frontend: ${FRONTEND_URL}`);
};

// Run verification if in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  // For Node.js
  const fetch = require('node-fetch');
  verifyDeployment();
} else {
  // For browser
  verifyDeployment();
}
