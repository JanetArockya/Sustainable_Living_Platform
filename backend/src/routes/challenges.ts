import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Private
router.get('/', protect, (req: any, res: any) => {
  res.status(200).json({ 
    success: true, 
    data: [
      {
        id: '1',
        title: '30-Day Carbon Reduction Challenge',
        description: 'Reduce your carbon footprint by 20% in 30 days',
        category: 'carbon',
        difficulty: 'medium',
        duration: 30,
        participants: 245,
        status: 'active'
      }
    ]
  });
});

// @desc    Create new challenge
// @route   POST /api/challenges
// @access  Private
router.post('/', protect, (req: any, res: any) => {
  res.status(201).json({ 
    success: true, 
    message: 'Challenge created successfully'
  });
});

export default router;