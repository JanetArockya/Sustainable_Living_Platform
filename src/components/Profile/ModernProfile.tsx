import React, { useState, useEffect } from 'react';
import { User, Settings, Target, Award, Bell, Edit3, Camera, Save, Calendar, Activity, TrendingUp, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ActivityItem {
  id: number;
  activity_type: string;
  activity_data: string;
  timestamp: string;
}

interface Metric {
  id: number;
  metric_type: string;
  value: number;
  unit: string;
  date: string;
  timestamp: string;
}

export const ModernProfile: React.FC = () => {
  const { user, token, logActivity } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'metrics'>('overview');

  useEffect(() => {
    if (token) {
      fetchActivities();
      fetchMetrics();
      logActivity('profile_view', { timestamp: new Date().toISOString() });
    }
  }, [token, selectedDate]);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/activities?date=${selectedDate}&limit=20`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/metrics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  const formatActivityType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return '🔐';
      case 'logout': return '🚪';
      case 'dashboard_view': return '📊';
      case 'profile_view': return '👤';
      case 'challenge_joined': return '🏆';
      case 'navigation': return '🧭';
      case 'dark_mode_toggle': return '🌙';
      case 'post_liked': return '❤️';
      case 'carbon_data_update': return '🌱';
      case 'goal_created': return '🎯';
      case 'profile_update': return '✏️';
      default: return '📝';
    }
  };

  const badgeCategories = {
    energy: { name: 'Energy', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', icon: '⚡' },
    carbon: { name: 'Carbon', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: '🌱' },
    water: { name: 'Water', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', icon: '💧' },
    waste: { name: 'Waste', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', icon: '♻️' }
  };

  const getMetricsByType = () => {
    const grouped = metrics.reduce((acc, metric) => {
      if (!acc[metric.metric_type]) {
        acc[metric.metric_type] = [];
      }
      acc[metric.metric_type].push(metric);
      return acc;
    }, {} as Record<string, Metric[]>);
    
    return Object.entries(grouped).map(([type, values]) => ({
      type,
      latest: values[0],
      count: values.length,
      trend: values.length > 1 ? 
        ((values[0].value - values[1].value) / values[1].value * 100).toFixed(1) : 
        '0'
    }));
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">User Profile</h2>
              <p className="text-indigo-100 text-lg">
                Manage your account settings, track your progress, and review your sustainability journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
          {[
            { id: 'overview', name: 'Overview', icon: User },
            { id: 'activities', name: 'Activity History', icon: Activity },
            { id: 'metrics', name: 'Usage Metrics', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-600/50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Profile Info */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isEditing ? (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 className="h-5 w-5 mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="flex items-start space-x-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 shadow-xl">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-4xl font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition-colors shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Email</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{user?.level}</div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Level</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{user?.totalPoints.toLocaleString()}</div>
                    <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">Points</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">12</div>
                    <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">Badges</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">5</div>
                    <div className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">Goals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badge Collection */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Badge Collection</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(badgeCategories).map(([key, category]) => (
                <div key={key} className={`p-6 rounded-2xl ${category.color} text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}>
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <div className="font-bold text-2xl mb-1">3</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'activities' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Activity History</h3>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl hover:shadow-md transition-all duration-300">
                  <span className="text-2xl">{getActivityIcon(activity.activity_type)}</span>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 dark:text-white text-lg">
                      {formatActivityType(activity.activity_type)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </div>
                    {activity.activity_data && activity.activity_data !== '{}' && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <pre className="whitespace-pre-wrap">{JSON.stringify(JSON.parse(activity.activity_data), null, 2).slice(0, 200)}...</pre>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">No activities found for this date.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-8">
            <BarChart3 className="h-6 w-6 text-purple-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Usage Metrics</h3>
          </div>

          {metrics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getMetricsByType().map((metricGroup) => (
                <div key={metricGroup.type} className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white capitalize">
                      {metricGroup.type.replace('_', ' ')}
                    </h4>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${
                      parseFloat(metricGroup.trend) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <TrendingUp className="h-3 w-3" />
                      <span>{metricGroup.trend}%</span>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {metricGroup.latest.value} {metricGroup.latest.unit}
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div>Latest: {new Date(metricGroup.latest.date).toLocaleDateString()}</div>
                    <div>Total records: {metricGroup.count}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No usage metrics recorded yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};