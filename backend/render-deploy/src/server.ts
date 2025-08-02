import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import connectDB from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Route imports
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import carbonRoutes from './routes/carbon';
import challengeRoutes from './routes/challenges';
import communityRoutes from './routes/community';
import analyticsRoutes from './routes/analytics';
import resourceRoutes from './routes/resources';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW!) || 15) * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS!) || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Sustainable Living Platform API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carbon', carbonRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/resources', resourceRoutes);

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('join_challenge', (challengeId) => {
    socket.join(`challenge_${challengeId}`);
  });
  
  socket.on('challenge_update', (data) => {
    socket.to(`challenge_${data.challengeId}`).emit('challenge_progress', data);
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📡 Socket.io server running on port ${PORT}`);
});

export default app;
