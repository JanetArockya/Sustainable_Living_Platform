import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private
router.get('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all users'
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get user ${req.params.id}`
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update user ${req.params.id}`
  });
});

export default router;
