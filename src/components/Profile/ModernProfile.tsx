import React, { useState, useEffect } from 'react';
import { User, Settings, Target, Award, Bell, Edit3, Camera, Save, Calendar, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ActivityItem {
  id: number;
  activity_type: string;
  activity_data: string;
  timestamp: string;
}

export const ModernProfile: React.FC = () => {
  const { user, token, logActivity } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (token) {
      fetchActivities();
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
      default: return '📝';
    }
  };

  const badgeCategories = {
    energy: { name: 'Energy', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', icon: '⚡' },
    carbon: { name: 'Carbon', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: '🌱' },
    water: { name: 'Water', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', icon: '💧' },
    waste: { name: 'Waste', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', icon: '♻️' }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">User Profile</h2>
          </div>
          <p className="text-indigo-100">
            Manage your account settings, track your progress, and review your sustainability journey.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      </div>

      {/* Profile Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </button>
        </div>

        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors">
                <Camera className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{user?.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <p className="text-gray-900 dark:text-white">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{user?.level}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Level</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{user?.totalPoints.toLocaleString()}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Points</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">12</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Badges</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">5</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Goals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity History */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity History</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-lg">{getActivityIcon(activity.activity_type)}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatActivityType(activity.activity_type)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                  {activity.activity_data && activity.activity_data !== '{}' && (
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {JSON.stringify(JSON.parse(activity.activity_data), null, 2).slice(0, 100)}...
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No activities found for this date.</p>
            </div>
          )}
        </div>
      </div>

      {/* Badge Collection */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Badge Collection</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(badgeCategories).map(([key, category]) => (
            <div key={key} className={`p-4 rounded-xl ${category.color}`}>
              <div className="text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-bold text-xl">3</div>
                <div className="text-sm">{category.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};