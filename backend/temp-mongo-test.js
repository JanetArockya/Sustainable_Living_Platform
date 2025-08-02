// Updated MongoDB connection test with your actual connection string
const mongoose = require('mongoose');

// Your actual connection string with database name added
const testConnectionString = 'mongodb+srv://growwithmeuser:Grow_sus25@sustainable-living-clus.z90luwx.mongodb.net/sustainable_living?retryWrites=true&w=majority&appName=sustainable-living-cluster';

console.log('🧪 Testing MongoDB Connection with REAL cluster...');
console.log('📍 Connection string:', testConnectionString.replace(/:[^:@]*@/, ':****@'));

mongoose.connect(testConnectionString, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
})
.then(() => {
  console.log('✅ SUCCESS! MongoDB connection is working!');
  console.log('🎉 Your credentials are correct!');
  mongoose.connection.close();
})
.catch((error) => {
  console.error('\n❌ Connection failed:', error.message);
  
  if (error.message.includes('getaddrinfo ENOTFOUND') || error.message.includes('xxxxx')) {
    console.error('\n🔍 ISSUE IDENTIFIED: Incorrect cluster ID');
    console.error('📋 TO FIX:');
    console.error('   1. Go to https://cloud.mongodb.com/');
    console.error('   2. Click on your "sustainable-living-cluster"');
    console.error('   3. Click "Connect" → "Connect your application"');
    console.error('   4. Copy the FULL connection string');
    console.error('   5. Replace <password> with: Grow_sus25');
    console.error('   6. Update it in Render environment variables');
    console.error('\n💡 The cluster ID should look like: cluster0.abc12.mongodb.net');
    console.error('   Instead of: sustainable-living-cluster.xxxxx.mongodb.net');
  }
  
  mongoose.connection.close();
});
