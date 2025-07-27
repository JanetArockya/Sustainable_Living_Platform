import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Get local sustainability resources
// @route   GET /api/resources
// @access  Private
router.get('/', protect, (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Get local sustainability resources',
    data: []
  });
});

// @desc    Get eco-friendly shopping recommendations
// @route   GET /api/resources/shopping
// @access  Private
router.get('/shopping', protect, (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Get sustainable shopping recommendations',
    data: []
  });
});

// @desc    Get transportation alternatives
// @route   GET /api/resources/transportation
// @access  Private
router.get('/transportation', protect, (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Get transportation alternatives',
    data: []
  });
});

export default router;
