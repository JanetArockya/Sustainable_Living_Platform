import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Zap, Droplets, Leaf, Target, Calendar, Award, Activity, BarChart3 } from 'lucide-react';
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

interface Metric {
  id: number;
  metric_type: string;
  value: number;
  unit: string;
  date: string;
}

export const ModernDashboard: React.FC = () => {
  const { user, token, logActivity, saveMetric } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [carbonData, setCarbonData] = useState<any>({});
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    if (token) {
      fetchUserData();
      logActivity('dashboard_view', { timestamp: new Date().toISOString() });
      
      // Simulate some metrics being saved
      saveMetric('energy_usage', 245.5, 'kWh');
      saveMetric('water_usage', 1245, 'gallons');
      saveMetric('carbon_footprint', 6.2, 'tons');
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const [goalsRes, badgesRes, carbonRes, metricsRes] = await Promise.all([
        fetch('http://localhost:3001/api/user/goals', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/api/user/badges', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/api/user/carbon-data', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/api/user/metrics', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (goalsRes.ok) setGoals(await goalsRes.json());
      if (badgesRes.ok) setBadges(await badgesRes.json());
      if (carbonRes.ok) setCarbonData(await carbonRes.json());
      if (metricsRes.ok) setMetrics(await metricsRes.json());
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
      color: 'emerald',
      bgGradient: 'from-emerald-500 to-green-600'
    },
    {
      title: 'Energy Usage',
      value: `${(carbonData.electricity || 0) + (carbonData.heating || 0) + (carbonData.cooling || 0) || 245} kWh`,
      change: -8,
      icon: Zap,
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Water Conservation',
      value: '1,245 gal',
      change: 15,
      icon: Droplets,
      color: 'blue',
      bgGradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Sustainability Score',
      value: '87/100',
      change: 5,
      icon: Target,
      color: 'purple',
      bgGradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
              <p className="text-emerald-100 text-lg">
                You've made great progress this month. Keep up the sustainable lifestyle!
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span className="font-semibold">Level {user?.level}</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span className="font-semibold">{user?.totalPoints.toLocaleString()} points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;
          
          return (
            <div key={index} className="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bgGradient} shadow-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                  isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-bold">{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Goals */}
      {goals.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Target className="h-6 w-6 text-emerald-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Active Goals</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.slice(0, 4).map((goal) => {
              const progress = (goal.current_value / goal.target_value) * 100;
              
              return (
                <div key={goal.id} className="border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                        <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        goal.category === 'energy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        goal.category === 'carbon' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        goal.category === 'water' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>
                        {goal.category.toUpperCase()}
                      </span>
                    </div>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      goal.completed ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {goal.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{goal.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{goal.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Progress</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {goal.current_value} / {goal.target_value} {goal.unit}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
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
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Award className="h-6 w-6 text-yellow-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Achievements</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {badges.slice(0, 3).map((badge) => (
              <div key={badge.id} className="group flex items-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{badge.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Usage Metrics Summary */}
      {metrics.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-6">Your Impact This Month</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold mb-2">156 kg</div>
              <div className="text-indigo-100 text-sm font-medium">CO₂ Saved</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold mb-2">$89</div>
              <div className="text-indigo-100 text-sm font-medium">Money Saved</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold mb-2">{metrics.length}</div>
              <div className="text-indigo-100 text-sm font-medium">Tracked Metrics</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};