// Test the actual backend URL
const testBackendUrl = async (url) => {
  console.log(`🔍 Testing Backend: ${url}`);
  
  try {
    console.log('   ⏳ Testing health endpoint...');
    
    const healthResponse = await fetch(`${url}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log(`   📊 Status: ${healthResponse.status}`);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log(`   ✅ SUCCESS! Backend is working!`);
      console.log(`   📄 Response:`, healthData);
      
      console.log(`\n🎉 BACKEND IS LIVE!`);
      console.log(`🔗 Health URL: ${url}/health`);
      console.log(`🔗 API Base URL: ${url}/api`);
      
      return true;
    } else {
      console.log(`   ❌ Health check failed: ${healthResponse.status}`);
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Connection failed: ${error.message}`);
    return false;
  }
};

console.log('🚀 Testing Your Actual Backend...\n');
testBackendUrl('https://sustainable-living-platform.onrender.com');
