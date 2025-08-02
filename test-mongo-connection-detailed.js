const mongoose = require('mongoose');

const testConnection = async () => {
  console.log('🔍 Testing MongoDB Atlas Connection...');
  console.log('');
  
  // You need to replace this with your actual connection string
  const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://sustainableuser:yourpassword@sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living';
  
  console.log('📡 Connection String (masked):', mongoURI.replace(/:([^@]+)@/, ':****@'));
  console.log('');
  
  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Connected to database:', mongoose.connection.db.databaseName);
    console.log('🌐 Connected to host:', mongoose.connection.host);
    
    await mongoose.connection.close();
    console.log('✅ Connection closed gracefully');
    console.log('');
    console.log('🎉 Your MongoDB Atlas connection is working!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error('');
    
    if (error.message.includes('IP')) {
      console.error('🚫 IP Whitelist Issue:');
      console.error('   Your IP address is not whitelisted in MongoDB Atlas');
      console.error('   👉 Go to: https://cloud.mongodb.com/');
      console.error('   👉 Navigate to Network Access');
      console.error('   👉 Add your current IP address or allow 0.0.0.0/0');
    } else if (error.message.includes('authentication')) {
      console.error('🔐 Authentication Issue:');
      console.error('   Check your username and password in the connection string');
    } else {
      console.error('🔍 Error Details:', error.message);
    }
    
    console.error('');
    console.error('📖 Full troubleshooting guide: ./backend/MONGODB_IP_WHITELIST_FIX.md');
  }
};

// Run the test
testConnection();
