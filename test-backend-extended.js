// Extended Backend URL Tester - More comprehensive testing
const additionalUrls = [
  'https://sustainable-living-backend.onrender.com',
  'https://sustainable-living-platform-backend.onrender.com',
  'https://sustainablelivingplatform-backend.onrender.com',
  'https://sustainable-living.onrender.com',
  'https://sustainablelivingbackend.onrender.com',
  'https://backend-sustainable-living.onrender.com',
  'https://mern-sustainable-living.onrender.com',
  'https://sustainable-backend.onrender.com'
];

async function testBackendUrlExtended(url) {
  console.log(`\n🔍 Testing: ${url}`);
  
  try {
    console.log('   ⏳ Attempting connection...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    // Test health endpoint
    const healthResponse = await fetch(`${url}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'SustainableLivingPlatform/1.0'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    console.log(`   📊 Response Status: ${healthResponse.status}`);
    console.log(`   📋 Response Headers: ${JSON.stringify(Object.fromEntries(healthResponse.headers.entries()))}`);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.text();
      console.log(`   ✅ SUCCESS! Backend found at: ${url}`);
      console.log(`   📄 Response: ${healthData}`);
      
      // Try to parse as JSON
      try {
        const jsonData = JSON.parse(healthData);
        console.log(`   🎯 Parsed JSON:`, jsonData);
      } catch (e) {
        console.log(`   📝 Plain text response: ${healthData}`);
      }
      
      return url;
    } else {
      console.log(`   ❌ HTTP Error: ${healthResponse.status} ${healthResponse.statusText}`);
      
      // Try to get error response
      try {
        const errorText = await healthResponse.text();
        console.log(`   🔍 Error details: ${errorText}`);
      } catch (e) {
        console.log(`   🔍 Could not read error response`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Connection Error: ${error.message}`);
    
    if (error.name === 'AbortError') {
      console.log(`   ⏰ Request timed out (30s) - service might be starting up`);
    }
  }
  
  return null;
}

async function findWorkingBackendExtended() {
  console.log('🔍 COMPREHENSIVE Backend URL Test');
  console.log('==================================\n');
  
  console.log('ℹ️  If your backend is starting up, this may take a few minutes...\n');
  
  for (const url of additionalUrls) {
    const workingUrl = await testBackendUrlExtended(url);
    if (workingUrl) {
      console.log(`\n🎉 FOUND WORKING BACKEND!`);
      console.log(`🔗 Backend URL: ${workingUrl}`);
      console.log(`🔗 API URL: ${workingUrl}/api`);
      console.log(`\n📝 Next Steps:`);
      console.log(`1. Update your Vercel environment variables:`);
      console.log(`   VITE_API_URL=${workingUrl}/api`);
      console.log(`2. Redeploy your frontend`);
      console.log(`3. Test login/registration`);
      return workingUrl;
    }
    
    // Wait a bit between requests to be nice to Render
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n❌ No working backend found yet.');
  console.log('\n🔧 Troubleshooting Steps:');
  console.log('1. Check your Render dashboard for the exact service URL');
  console.log('2. Look at Render logs for deployment errors');
  console.log('3. Verify the build completed successfully');
  console.log('4. Check if the service is still starting (can take 5-10 minutes)');
  console.log('5. Try visiting the URL in a browser to wake up the service');
  
  return null;
}

// Run the extended test
findWorkingBackendExtended().catch(console.error);
