import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sustainable_living';
    
    // For development/demo mode without MongoDB installation
    if (process.env.NODE_ENV === 'development' && !process.env.MONGODB_URI) {
      console.log('🔧 Running in demo mode without MongoDB connection');
      console.log('📊 Using mock data for demonstration purposes');
      return;
    }
    
    const conn = await mongoose.connect(mongoURI, {
      // Remove deprecated options - mongoose 6+ handles these automatically
    });

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🛑 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Continuing in demo mode with mock data...');
      return;
    }
    process.exit(1);
  }
};

export default connectDB;
