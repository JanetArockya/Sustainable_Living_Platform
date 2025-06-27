import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Zap, Droplets, Leaf, Target, Calendar, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Goal {
  id: number;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  unit: string;
  deadline: string;
  category: string;
  completed: boolean;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned_date: string;
  category: string;
}

export const ModernDashboard: React.FC = () => {
  const { user, token, logActivity } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [carbonData, setCarbonData] = useState<any>({});

  useEffect(() => {
    if (token) {
      fetchUserData();
      logActivity('dashboard_view', { timestamp: new Date().toISOString() });
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const [goalsRes, badgesRes, carbonRes] = await Promise.all([
        fetch('http://localhost:3001/api/user/goals', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/api/user/badges', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/api/user/carbon-data', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (goalsRes.ok) setGoals(await goalsRes.json());
      if (badgesRes.ok) setBadges(await badgesRes.json());
      if (carbonRes.ok) setCarbonData(await carbonRes.json());
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const stats = [
    {
      title: 'Carbon Footprint',
      value: `${carbonData.total || 6.2} tons`,
      change: -12,
      icon: Leaf,
      color: 'emerald'
    },
    {
      title: 'Energy Usage',
      value: `${(carbonData.electricity || 0) + (carbonData.heating || 0) + (carbonData.cooling || 0)} kWh`,
      change: -8,
      icon: Zap,
      color: 'blue'
    },
    {
      title: 'Water Conservation',
      value: '1,245 gal',
      change: 15,
      icon: Droplets,
      color: 'cyan'
    },
    {
      title: 'Sustainability Score',
      value: '87/100',
      change: 5,
      icon: Target,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-emerald-100 mb-4">
            You've made great progress this month. Keep up the sustainable lifestyle!
          </p>
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-sm font-medium">Level {user?.level}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-sm font-medium">{user?.totalPoints} points</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;
          
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className={`flex items-center space-x-1 ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Goals */}
      {goals.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.slice(0, 4).map((goal) => {
              const progress = (goal.current_value / goal.target_value) * 100;
              
              return (
                <div key={goal.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-gray-400" />
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        goal.category === 'energy' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        goal.category === 'carbon' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        goal.category === 'water' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>
                        {goal.category.toUpperCase()}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      goal.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {goal.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{goal.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{goal.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {goal.current_value} / {goal.target_value} {goal.unit}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Badges */}
      {badges.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {badges.slice(0, 3).map((badge) => (
              <div key={badge.id} className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{badge.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};