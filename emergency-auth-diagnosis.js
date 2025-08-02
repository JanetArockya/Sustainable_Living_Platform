// Emergency Local Test - Use this to test the system locally while backend deploys
console.log('🧪 Testing Authentication System Locally');

// Test the current API service configuration
const testApiService = () => {
  console.log('\n📋 Current API Configuration:');
  
  // Check environment variables
  const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000/api';
  console.log(`   VITE_API_URL: ${apiUrl}`);
  
  // Test data that would be sent during login
  const testLoginData = {
    email: 'test@example.com',
    password: 'password123'
  };
  
  console.log('\n🔍 Login Request would be sent to:');
  console.log(`   URL: ${apiUrl}/auth/login`);
  console.log('   Method: POST');
  console.log('   Body:', JSON.stringify(testLoginData, null, 2));
  
  console.log('\n❌ This will fail because backend is not deployed!');
  console.log('\n✅ Solution: Deploy backend to Render first');
};

// Check what environment variables are actually loaded
const checkEnvironment = () => {
  console.log('\n🌍 Environment Check:');
  
  // In browser, this would be import.meta.env
  const expectedVars = [
    'VITE_API_URL',
    'NODE_ENV'
  ];
  
  expectedVars.forEach(varName => {
    const value = process.env[varName] || 'NOT SET';
    console.log(`   ${varName}: ${value}`);
  });
};

// Main test
const runTest = () => {
  console.log('🚀 Emergency Diagnosis - Authentication Failure');
  console.log('========================================');
  
  testApiService();
  checkEnvironment();
  
  console.log('\n📝 Action Items:');
  console.log('1. Deploy backend to Render (PRIMARY ISSUE)');
  console.log('2. Update VITE_API_URL in Vercel environment variables');
  console.log('3. Test the health endpoint: https://your-backend.onrender.com/health');
  console.log('4. Retry login/registration');
};

// Run the diagnosis
runTest();
