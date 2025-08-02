import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Get local sustainability resources
// @route   GET /api/resources
// @access  Private
router.get('/', protect, (req: any, res: any) => {
  res.status(200).json({ 
    success: true, 
    data: [
      {
        id: '1',
        title: 'Local Recycling Centers',
        description: 'Find recycling centers near you',
        category: 'waste',
        type: 'location',
        data: [
          { name: 'Green Recycling Hub', address: '123 Eco Street', distance: '2.3 km' },
          { name: 'City Waste Center', address: '456 Clean Ave', distance: '4.7 km' }
        ]
      },
      {
        id: '2',
        title: 'Public Transport Routes',
        description: 'Eco-friendly transportation options',
        category: 'transportation',
        type: 'service',
        data: [
          { name: 'Bus Route 42', type: 'bus', carbonSaving: '4.2 kg CO2/day' },
          { name: 'Metro Line 3', type: 'metro', carbonSaving: '6.8 kg CO2/day' }
        ]
      }
    ]
  });
});

// @desc    Get eco-friendly shopping recommendations
// @route   GET /api/resources/shopping
// @access  Private
router.get('/shopping', protect, (req: any, res: any) => {
  res.status(200).json({ 
    success: true, 
    data: [
      {
        category: 'Food',
        items: [
          {
            name: 'Organic Vegetables',
            ecoScore: 9.2,
            carbonFootprint: 'Low',
            alternatives: ['Local farmers market', 'Organic delivery services']
          },
          {
            name: 'Plant-based Proteins',
            ecoScore: 8.7,
            carbonFootprint: 'Very Low',
            alternatives: ['Tofu', 'Lentils', 'Quinoa']
          }
        ]
      },
      {
        category: 'Household',
        items: [
          {
            name: 'Eco-friendly Cleaning Products',
            ecoScore: 8.5,
            carbonFootprint: 'Low',
            alternatives: ['Biodegradable detergents', 'Natural cleaning solutions']
          }
        ]
      }
    ]
  });
});

// @desc    Get transportation alternatives
// @route   GET /api/resources/transportation
// @access  Private
router.get('/transportation', protect, (req: any, res: any) => {
  res.status(200).json({ 
    success: true, 
    data: {
      alternatives: [
        {
          mode: 'Public Transport',
          carbonSaving: '75%',
          costSaving: '$120/month',
          healthBenefit: 'Moderate',
          convenience: 'High'
        },
        {
          mode: 'Cycling',
          carbonSaving: '100%',
          costSaving: '$200/month',
          healthBenefit: 'High',
          convenience: 'Medium'
        },
        {
          mode: 'Electric Vehicle',
          carbonSaving: '60%',
          costSaving: '$80/month',
          healthBenefit: 'Low',
          convenience: 'High'
        }
      ],
      calculator: {
        currentMode: 'car',
        distance: '25 km/day',
        currentEmissions: '4.2 kg CO2/day',
        potentialSavings: {
          publicTransport: '3.15 kg CO2/day',
          cycling: '4.2 kg CO2/day',
          electric: '2.52 kg CO2/day'
        }
      }
    }
  });
});

export default router;
