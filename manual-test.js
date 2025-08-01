// Manual API Registration Test
// This demonstrates exactly what you need to do for API auth registration

const testRegistration = async () => {
  const API_URL = 'http://localhost:5000'; // Your backend URL
  
  // Registration Data
  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'TestPassword123'
  };

  try {
    console.log('🧪 Testing Registration API...');
    
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration Successful!');
      console.log('📋 Response:', data);
      console.log('🔑 JWT Token:', data.token);
      console.log('👤 User Data:', data.user);
      
      // Store token for future requests
      localStorage.setItem('authToken', data.token);
      
    } else {
      console.log('❌ Registration Failed');
      console.log('Error:', data);
    }
    
  } catch (error) {
    console.error('🚨 Network Error:', error);
  }
};

// Test Login
const testLogin = async () => {
  const API_URL = 'http://localhost:5000';
  
  const loginData = {
    email: 'test@example.com',
    password: 'TestPassword123'
  };

  try {
    console.log('🔐 Testing Login API...');
    
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login Successful!');
      console.log('🔑 JWT Token:', data.token);
      console.log('👤 User:', data.user);
    } else {
      console.log('❌ Login Failed:', data.message);
    }
    
  } catch (error) {
    console.error('🚨 Network Error:', error);
  }
};

// Export functions for use
if (typeof module !== 'undefined') {
  module.exports = { testRegistration, testLogin };
} else {
  // Browser environment - make functions global
  window.testRegistration = testRegistration;
  window.testLogin = testLogin;
}

console.log(`
📋 API Registration Guide:

1. **Start your backend server:**
   cd backend && npm run dev

2. **Test registration in browser console:**
   testRegistration()

3. **Test login in browser console:**
   testLogin()

4. **What the registration API does:**
   - Validates input (name, email, password)
   - Checks if user already exists
   - Hashes password with bcrypt
   - Creates user in MongoDB
   - Returns JWT token for authentication

5. **Required fields for registration:**
   - name: string (2-50 characters)
   - email: valid email format
   - password: minimum 6 characters with uppercase, lowercase, and number

6. **Success response format:**
   {
     success: true,
     token: "jwt-token-here",
     user: {
       id: "user-id",
       name: "User Name",
       email: "user@example.com",
       role: "user",
       sustainabilityScore: 0
     }
   }
`);
