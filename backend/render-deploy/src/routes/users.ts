import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private
router.get('/', protect, (req: any, res: any) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        sustainabilityScore: 85,
        carbonFootprint: 12.5,
        achievements: ['Carbon Warrior', 'Green Champion']
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        sustainabilityScore: 92,
        carbonFootprint: 8.3,
        achievements: ['Eco Pioneer', 'Waste Warrior']
      }
    ]
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', protect, (req: any, res: any) => {
  const { id } = req.params;
  
  res.status(200).json({
    success: true,
    data: {
      id,
      name: 'John Doe',
      email: 'john@example.com',
      sustainabilityScore: 85,
      carbonFootprint: 12.5,
      achievements: ['Carbon Warrior', 'Green Champion'],
      goals: [
        {
          type: 'carbon_reduction',
          target: 10,
          current: 7.5,
          deadline: '2025-12-31'
        }
      ]
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', protect, (req: any, res: any) => {
  const { id } = req.params;
  const { name, preferences } = req.body;
  
  res.status(200).json({
    success: true,
    message: 'User profile updated successfully',
    data: {
      id,
      name,
      preferences,
      updatedAt: new Date()
    }
  });
});

export default router;
