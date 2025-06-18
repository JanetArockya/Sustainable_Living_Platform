import { User, Goal, Badge, Challenge, Tip, LocalResource, Article, CarbonFootprintData } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  joinDate: '2024-01-15',
  totalPoints: 2840,
  level: 7,
  badges: [
    {
      id: '1',
      name: 'Energy Saver',
      description: 'Reduced energy consumption by 20%',
      icon: 'zap',
      earnedDate: '2024-02-01',
      category: 'energy'
    },
    {
      id: '2',
      name: 'Carbon Crusher',
      description: 'Achieved carbon neutral for a month',
      icon: 'leaf',
      earnedDate: '2024-02-15',
      category: 'carbon'
    },
    {
      id: '3',
      name: 'Water Warrior',
      description: 'Saved 500 gallons of water',
      icon: 'droplets',
      earnedDate: '2024-03-01',
      category: 'water'
    }
  ],
  goals: [
    {
      id: '1',
      title: 'Reduce Energy Usage',
      description: 'Cut household energy consumption by 25%',
      targetValue: 25,
      currentValue: 18,
      unit: '%',
      deadline: '2024-12-31',
      category: 'energy',
      completed: false
    },
    {
      id: '2',
      title: 'Carbon Neutral',
      description: 'Achieve net-zero carbon footprint',
      targetValue: 0,
      currentValue: 2.1,
      unit: 'tons CO2',
      deadline: '2024-06-30',
      category: 'carbon',
      completed: false
    }
  ],
  preferences: {
    notifications: true,
    sustainabilityTips: true,
    weeklyReports: true,
    challengeUpdates: true
  }
};

export const mockCarbonData: CarbonFootprintData = {
  energy: {
    electricity: 1200,
    heating: 800,
    cooling: 400
  },
  transportation: {
    car: 2400,
    public: 300,
    flights: 1800
  },
  diet: {
    meat: 1500,
    dairy: 600,
    local: true
  },
  total: 8.1
};

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Zero Waste Week',
    description: 'Eliminate single-use items for 7 days',
    category: 'waste',
    difficulty: 'medium',
    points: 150,
    participants: 324,
    duration: '7 days',
    progress: 65,
    completed: false
  },
  {
    id: '2',
    title: 'Meatless March',
    description: 'Go vegetarian for the entire month',
    category: 'diet',
    difficulty: 'hard',
    points: 300,
    participants: 156,
    duration: '30 days',
    progress: 12,
    completed: false
  },
  {
    id: '3',
    title: 'Bike to Work',
    description: 'Use bike or public transport for commuting',
    category: 'transport',
    difficulty: 'easy',
    points: 100,
    participants: 892,
    duration: '14 days',
    progress: 100,
    completed: true
  }
];

export const mockTips: Tip[] = [
  {
    id: '1',
    title: 'Switch to LED Bulbs',
    description: 'Replace incandescent bulbs with LED alternatives to reduce energy consumption by up to 80%.',
    category: 'energy',
    difficulty: 'easy',
    impact: 'medium',
    estimatedSavings: '$75/year'
  },
  {
    id: '2',
    title: 'Start Composting',
    description: 'Turn kitchen scraps into nutrient-rich soil amendment while reducing methane emissions.',
    category: 'waste',
    difficulty: 'medium',
    impact: 'high',
    estimatedSavings: '$200/year'
  },
  {
    id: '3',
    title: 'Unplug Electronics',
    description: 'Eliminate phantom power draw by unplugging devices when not in use.',
    category: 'energy',
    difficulty: 'easy',
    impact: 'low',
    estimatedSavings: '$30/year'
  }
];

export const mockResources: LocalResource[] = [
  {
    id: '1',
    name: 'GreenCycle Recycling Center',
    type: 'recycling',
    address: '123 Eco Street, Green City',
    distance: 0.8,
    rating: 4.8,
    hours: 'Mon-Sat 8AM-6PM',
    description: 'Full-service recycling facility accepting electronics, batteries, and hazardous materials.',
    phone: '(555) 123-4567'
  },
  {
    id: '2',
    name: 'Community Garden Project',
    type: 'garden',
    address: '456 Garden Ave, Green City',
    distance: 1.2,
    rating: 4.9,
    hours: 'Daily sunrise-sunset',
    description: 'Organic community garden with volunteer opportunities and educational workshops.',
    phone: '(555) 234-5678'
  },
  {
    id: '3',
    name: 'EcoMart Sustainable Goods',
    type: 'business',
    address: '789 Sustainable Blvd, Green City',
    distance: 2.1,
    rating: 4.6,
    hours: 'Mon-Sun 9AM-8PM',
    description: 'Zero-waste store offering package-free goods, refills, and eco-friendly products.',
    phone: '(555) 345-6789'
  }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Renewable Energy',
    excerpt: 'Exploring breakthrough technologies in solar, wind, and battery storage that are reshaping our energy landscape.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'energy',
    readTime: 8,
    publishDate: '2024-03-15',
    image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: '2',
    title: '10 Ways to Reduce Your Carbon Footprint',
    excerpt: 'Simple, actionable steps you can take today to minimize your environmental impact.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'lifestyle',
    readTime: 5,
    publishDate: '2024-03-12',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  },
  {
    id: '3',
    title: 'Urban Farming Revolution',
    excerpt: 'How vertical farms and hydroponic systems are transforming food production in cities.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'agriculture',
    readTime: 12,
    publishDate: '2024-03-10',
    image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  }
];