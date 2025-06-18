export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  totalPoints: number;
  level: number;
  badges: Badge[];
  goals: Goal[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  sustainabilityTips: boolean;
  weeklyReports: boolean;
  challengeUpdates: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  category: 'energy' | 'water' | 'carbon' | 'waste';
  completed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: string;
}

export interface CarbonFootprintData {
  energy: {
    electricity: number;
    heating: number;
    cooling: number;
  };
  transportation: {
    car: number;
    public: number;
    flights: number;
  };
  diet: {
    meat: number;
    dairy: number;
    local: boolean;
  };
  total: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  participants: number;
  duration: string;
  progress?: number;
  completed?: boolean;
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  impact: 'low' | 'medium' | 'high';
  estimatedSavings?: string;
}

export interface LocalResource {
  id: string;
  name: string;
  type: 'recycling' | 'garden' | 'business' | 'event';
  address: string;
  distance: number;
  rating: number;
  hours?: string;
  description?: string;
  phone?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  publishDate: string;
  image?: string;
  featured: boolean;
}