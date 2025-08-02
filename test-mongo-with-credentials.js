// Quick MongoDB Connection Test with your credentials
const mongoose = require('mongoose');

const testMongoConnection = async (connectionString) => {
  try {
    console.log('🔗 Testing MongoDB Atlas connection...');
    console.log('📍 Connection string:', connectionString.replace(/:[^:@]*@/, ':****@'));
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout after 30 seconds')), 30000)
    );
    
    const connectPromise = mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    
    await Promise.race([connectPromise, timeoutPromise]);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test creating a sample document
    const testSchema = new mongoose.Schema({ test: String, timestamp: Date });
    const TestModel = mongoose.model('ConnectionTest', testSchema);
    
    const doc = new TestModel({ 
      test: 'Sustainable Living Platform Connection Test', 
      timestamp: new Date() 
    });
    await doc.save();
    console.log('✅ Successfully created and saved test document!');
    
    // Clean up
    await TestModel.deleteMany({});
    await mongoose.connection.close();
    console.log('✅ Connection test completed successfully!');
    
    console.log('\n🎉 Your MongoDB connection is working perfectly!');
    console.log('📝 You can now use this connection string in Render');
    
    return true;
  } catch (error) {
    console.error('\n❌ MongoDB connection failed:');
    console.error('   Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n🔐 Authentication Issue:');
      console.error('   - Check your username: sustainableuser');
      console.error('   - Check your password: Grow_sus25');
      console.error('   - Verify the user exists in MongoDB Atlas');
    } else if (error.message.includes('getaddrinfo ENOTFOUND') || error.message.includes('xxxxx')) {
      console.error('\n🌐 Cluster ID Issue:');
      console.error('   - The "xxxxx" needs to be replaced with your actual cluster ID');
      console.error('   - Go to MongoDB Atlas → Connect → Get connection string');
      console.error('   - Look for something like: cluster0.abc12.mongodb.net');
    } else if (error.message.includes('timeout')) {
      console.error('\n⏰ Timeout Issue:');
      console.error('   - Your IP might not be whitelisted');
      console.error('   - Add 0.0.0.0/0 to Network Access in MongoDB Atlas');
    }
    
    console.error('\n📋 Troubleshooting Steps:');
    console.error('   1. Get correct connection string from MongoDB Atlas');
    console.error('   2. Ensure IP 0.0.0.0/0 is whitelisted for Render');
    console.error('   3. Verify username/password are correct');
    console.error('   4. Check if cluster is running');
    
    return false;
  }
};

console.log('🧪 Testing MongoDB Connection with your credentials...\n');

// Test with the corrected connection string (space removed)
// Note: This will fail until you get the correct cluster ID
const testConnectionString = 'mongodb+srv://sustainableuser:Grow_sus25@sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living?retryWrites=true&w=majority';

testMongoConnection(testConnectionString);
