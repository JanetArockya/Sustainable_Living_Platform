const mongoose = require('mongoose');

const testConnection = async () => {
  const mongoURI = 'mongodb+srv://sustainableuser:yourpassword@sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living';
  
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connection successful!');
    await mongoose.connection.close();
    console.log('✅ Connection closed gracefully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

testConnection();
