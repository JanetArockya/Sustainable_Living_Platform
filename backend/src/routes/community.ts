import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Get community posts
// @route   GET /api/community
// @access  Private
router.get('/', protect, (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Get community posts',
    data: []
  });
});

// @desc    Create community post
// @route   POST /api/community
// @access  Private
router.post('/', protect, (req, res) => {
  res.status(201).json({ 
    success: true, 
    message: 'Community post created' 
  });
});

// @desc    Get community leaderboard
// @route   GET /api/community/leaderboard
// @access  Private
router.get('/leaderboard', protect, (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Get sustainability leaderboard',
    data: []
  });
});

export default router;
