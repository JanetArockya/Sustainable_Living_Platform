import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Get community posts
// @route   GET /api/community
// @access  Private
router.get('/', protect, (req: any, res: any) => {
  res.status(200).json({ 
    success: true, 
    data: [
      {
        id: '1',
        title: 'My Solar Panel Installation Journey',
        content: 'Just installed solar panels and reduced my energy consumption by 40%!',
        author: 'John Doe',
        likes: 23,
        comments: 5,
        category: 'energy',
        createdAt: new Date('2025-07-25')
      },
      {
        id: '2',
        title: 'Zero Waste Kitchen Tips',
        content: 'Here are my top 10 tips for maintaining a zero-waste kitchen...',
        author: 'Jane Smith',
        likes: 45,
        comments: 12,
        category: 'waste',
        createdAt: new Date('2025-07-24')
      }
    ]
  });
});

// @desc    Create community post
// @route   POST /api/community
// @access  Private
router.post('/', protect, (req: any, res: any) => {
  const { title, content, category } = req.body;
  
  res.status(201).json({ 
    success: true, 
    message: 'Community post created successfully',
    data: {
      id: Date.now().toString(),
      title,
      content,
      category,
      author: 'Current User',
      likes: 0,
      comments: 0,
      createdAt: new Date()
    }
  });
});

// @desc    Get community leaderboard
// @route   GET /api/community/leaderboard
// @access  Private
router.get('/leaderboard', protect, (req: any, res: any) => {
  res.status(200).json({ 
    success: true, 
    data: [
      {
        rank: 1,
        name: 'EcoWarrior23',
        score: 2845,
        carbonReduction: 45.2,
        achievements: 12
      },
      {
        rank: 2,
        name: 'GreenQueen',
        score: 2567,
        carbonReduction: 38.7,
        achievements: 10
      },
      {
        rank: 3,
        name: 'SustainableSam',
        score: 2234,
        carbonReduction: 33.1,
        achievements: 8
      }
    ]
  });
});

export default router;
