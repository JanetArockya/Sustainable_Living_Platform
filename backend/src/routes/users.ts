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

// @desc    Get user goals
// @route   GET /api/users/goals
// @access  Private
router.get('/goals', protect, (req: any, res: any) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: 1,
        title: 'Reduce Carbon Footprint',
        description: 'Lower your monthly carbon emissions by using public transport',
        target_value: 50,
        current_value: 32,
        unit: 'kg CO2',
        deadline: '2024-12-31',
        category: 'carbon',
        completed: false
      },
      {
        id: 2,
        title: 'Save Energy',
        description: 'Reduce home energy consumption by 20%',
        target_value: 300,
        current_value: 245,
        unit: 'kWh',
        deadline: '2024-11-30',
        category: 'energy',
        completed: false
      },
      {
        id: 3,
        title: 'Water Conservation',
        description: 'Reduce daily water usage',
        target_value: 100,
        current_value: 78,
        unit: 'gallons',
        deadline: '2024-10-31',
        category: 'water',
        completed: false
      }
    ]
  });
});

// @desc    Get user badges
// @route   GET /api/users/badges
// @access  Private
router.get('/badges', protect, (req: any, res: any) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: 1,
        name: 'Carbon Warrior',
        description: 'Reduced carbon footprint by 50kg',
        icon: 'leaf',
        earned_date: '2024-07-15',
        category: 'carbon'
      },
      {
        id: 2,
        name: 'Energy Saver',
        description: 'Saved 500kWh of energy',
        icon: 'zap',
        earned_date: '2024-07-20',
        category: 'energy'
      },
      {
        id: 3,
        name: 'Eco Champion',
        description: 'Completed 30 sustainability challenges',
        icon: 'award',
        earned_date: '2024-07-25',
        category: 'general'
      }
    ]
  });
});

// @desc    Get user metrics
// @route   GET /api/users/metrics
// @access  Private
router.get('/metrics', protect, (req: any, res: any) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: 1,
        metric_type: 'energy_usage',
        value: 245.5,
        unit: 'kWh',
        date: '2024-07-29'
      },
      {
        id: 2,
        metric_type: 'water_usage',
        value: 1245,
        unit: 'gallons',
        date: '2024-07-29'
      },
      {
        id: 3,
        metric_type: 'carbon_footprint',
        value: 6.2,
        unit: 'tons',
        date: '2024-07-29'
      }
    ]
  });
});

// @desc    Get user carbon data
// @route   GET /api/users/carbon-data
// @access  Private
router.get('/carbon-data', protect, (req: any, res: any) => {
  res.status(200).json({
    success: true,
    data: {
      total: 6.2,
      monthly: [
        { month: 'Jan', value: 5.8 },
        { month: 'Feb', value: 6.1 },
        { month: 'Mar', value: 5.9 },
        { month: 'Apr', value: 6.3 },
        { month: 'May', value: 6.0 },
        { month: 'Jun', value: 5.7 },
        { month: 'Jul', value: 6.2 }
      ],
      electricity: 125,
      heating: 80,
      cooling: 40,
      transportation: 95
    }
  });
});

// @desc    Get user activities
// @route   GET /api/users/activities
// @access  Private
router.get('/activities', protect, (req: any, res: any) => {
  const { date, limit = 10 } = req.query;
  
  res.status(200).json({
    success: true,
    data: [
      {
        id: 1,
        type: 'energy_save',
        description: 'Turned off lights for 2 hours',
        points: 10,
        date: '2024-07-29T10:30:00Z'
      },
      {
        id: 2,
        type: 'transport',
        description: 'Used public transport instead of car',
        points: 25,
        date: '2024-07-29T08:15:00Z'
      },
      {
        id: 3,
        type: 'recycling',
        description: 'Recycled 5kg of materials',
        points: 15,
        date: '2024-07-28T16:45:00Z'
      }
    ]
  });
});

export default router;
