// API Connection Test Script
// Run this in browser console to test cloud backend connection

const testApiConnection = async () => {
  const API_URL = 'https://your-backend-url-here.com'; // Replace with your deployed backend URL
  
  console.log('🧪 Testing API Connection...');
  
  try {
    // Test health endpoint
    const healthResponse = await fetch(`${API_URL}/api/health`);
    console.log('✅ Health Check:', healthResponse.status === 200 ? 'PASSED' : 'FAILED');
    
    // Test registration
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });
    
    if (registerResponse.ok) {
      const data = await registerResponse.json();
      console.log('✅ Registration Test: PASSED');
      console.log('📝 Response:', data);
      
      // Test login with the same credentials
      const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Login Test: PASSED');
        console.log('🔑 JWT Token received:', !!loginData.data?.token);
      } else {
        console.log('❌ Login Test: FAILED');
      }
      
    } else {
      console.log('❌ Registration Test: FAILED');
      console.log('Error:', await registerResponse.text());
    }
    
  } catch (error) {
    console.error('❌ API Connection Failed:', error);
    console.log('💡 Make sure your backend is deployed and the URL is correct');
  }
};

// Run the test
testApiConnection();
