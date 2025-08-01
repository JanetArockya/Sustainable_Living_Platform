#!/usr/bin/env node

// Deployment Status Checker
const deploymentChecker = {
  async checkBackend(url) {
    try {
      console.log(`🔍 Checking backend at: ${url}`);
      const response = await fetch(`${url}/api/health`);
      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Backend is running!');
        console.log(`📊 Status: ${data.status}`);
        console.log(`⏰ Uptime: ${Math.floor(data.uptime)} seconds`);
        return true;
      } else {
        console.log('❌ Backend health check failed');
        return false;
      }
    } catch (error) {
      console.log('❌ Backend not accessible:', error.message);
      return false;
    }
  },

  async testRegistration(backendUrl) {
    try {
      console.log('\n🧪 Testing user registration...');
      const testUser = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'TestPass123'
      };

      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser)
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        console.log('✅ Registration working!');
        console.log('🔑 JWT token generated:', !!data.token);
        console.log('👤 User created:', data.user?.name);
        return true;
      } else {
        console.log('❌ Registration failed:', data.message);
        return false;
      }
    } catch (error) {
      console.log('❌ Registration test failed:', error.message);
      return false;
    }
  },

  async checkDatabase(backendUrl) {
    try {
      console.log('\n💾 Testing database connection...');
      // Try to register a user to test DB
      const dbTest = await this.testRegistration(backendUrl);
      if (dbTest) {
        console.log('✅ Database is connected and working!');
        return true;
      }
      return false;
    } catch (error) {
      console.log('❌ Database test failed:', error.message);
      return false;
    }
  },

  async runFullCheck(backendUrl) {
    console.log('🚀 Running full deployment check...\n');
    
    const backendOk = await this.checkBackend(backendUrl);
    if (!backendOk) {
      console.log('\n❌ Backend not ready. Check your Railway/Render deployment.');
      return false;
    }

    const dbOk = await this.checkDatabase(backendUrl);
    if (!dbOk) {
      console.log('\n❌ Database not working. Check MongoDB Atlas connection.');
      return false;
    }

    console.log('\n🎉 All systems working! Your backend is ready!');
    console.log('\n📋 Next steps:');
    console.log('1. Update your frontend .env file with this backend URL');
    console.log('2. Deploy your frontend to Railway/Render');
    console.log('3. Test the complete application');
    
    return true;
  }
};

// Usage instructions
console.log(`
🔧 Deployment Checker Usage:

In your browser console (after deploying backend):
deploymentChecker.runFullCheck('https://your-backend-url.railway.app');

Or check individual components:
deploymentChecker.checkBackend('https://your-backend-url.railway.app');
deploymentChecker.testRegistration('https://your-backend-url.railway.app');
`);

// Export for browser use
if (typeof window !== 'undefined') {
  window.deploymentChecker = deploymentChecker;
} else if (typeof module !== 'undefined') {
  module.exports = deploymentChecker;
}
