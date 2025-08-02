// Backend URL Tester
// This script tests different possible backend URLs

const testUrls = [
  'https://sustainable-living-backend.onrender.com',
  'https://sustainable-living-platform-backend.onrender.com',
  'https://sustainablelivingplatform-backend.onrender.com',
  'https://sustainable-living.onrender.com',
];

async function testBackendUrl(url) {
  console.log(`\n🔍 Testing: ${url}`);
  
  try {
    // Test health endpoint
    const healthResponse = await fetch(`${url}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log(`✅ Health endpoint working: ${url}/health`);
      console.log(`   Status: ${healthData.status}`);
      console.log(`   Message: ${healthData.message}`);
      return url;
    } else {
      console.log(`❌ Health endpoint failed: ${healthResponse.status}`);
    }
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
  }
  
  return null;
}

async function findWorkingBackend() {
  console.log('🚀 Testing possible backend URLs...\n');
  
  for (const url of testUrls) {
    const workingUrl = await testBackendUrl(url);
    if (workingUrl) {
      console.log(`\n🎉 FOUND WORKING BACKEND: ${workingUrl}`);
      console.log(`\n📝 Update your .env file with:`);
      console.log(`VITE_API_URL=${workingUrl}/api`);
      return workingUrl;
    }
  }
  
  console.log('\n❌ No working backend found. You may need to:');
  console.log('1. Deploy your backend to Render');
  console.log('2. Check if your backend service is sleeping (visit the URL in browser to wake it)');
  console.log('3. Verify your Render service name and configuration');
  
  return null;
}

// Run the test
findWorkingBackend().catch(console.error);
