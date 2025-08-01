// MongoDB Connection Tester
// Run this script to verify your MongoDB Atlas connection

const mongoose = require('mongoose');

const testMongoConnection = async (connectionString) => {
  try {
    console.log('🔗 Testing MongoDB Atlas connection...');
    console.log('📍 Connection string:', connectionString.replace(/:[^:@]*@/, ':****@'));
    
    await mongoose.connect(connectionString);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test creating a sample document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const doc = new TestModel({ test: 'Connection successful!' });
    await doc.save();
    console.log('✅ Successfully created test document!');
    
    // Clean up
    await TestModel.deleteMany({});
    await mongoose.connection.close();
    console.log('✅ Connection test completed successfully!');
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return false;
  }
};

// Instructions for use
console.log(`
📋 MongoDB Connection Test Instructions:

1. Replace YOUR_CONNECTION_STRING below with your actual MongoDB Atlas connection string
2. Run: node mongodb-test.js

Example connection string format:
mongodb+srv://sustainableuser:yourpassword@sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living?retryWrites=true&w=majority
`);

// Uncomment and replace with your actual connection string to test:
// testMongoConnection('YOUR_CONNECTION_STRING_HERE');

module.exports = { testMongoConnection };
