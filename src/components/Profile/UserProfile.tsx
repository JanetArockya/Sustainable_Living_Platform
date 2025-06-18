import React, { useState } from 'react';
import { User, Settings, Target, Award, Bell, Edit3, Camera, Save } from 'lucide-react';
import { mockUser } from '../../data/mockData';

export const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(mockUser);

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  const badgeCategories = {
    energy: { name: 'Energy', color: 'bg-yellow-100 text-yellow-800', icon: '⚡' },
    carbon: { name: 'Carbon', color: 'bg-green-100 text-green-800', icon: '🌱' },
    water: { name: 'Water', color: 'bg-blue-100 text-blue-800', icon: '💧' },
    waste: { name: 'Waste', color: 'bg-purple-100 text-purple-800', icon: '♻️' }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <User className="h-6 w-6 text-emerald-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
        </div>
        <p className="text-gray-600">
          Manage your account settings, track your progress, and customize your sustainability journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
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
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  {editedUser.avatar ? (
                    <img 
                      src={editedUser.avatar} 
                      alt={editedUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-full h-full p-6 text-gray-500" />
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900">{editedUser.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900">{editedUser.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-emerald-600">{editedUser.level}</div>
                    <div className="text-xs text-gray-600">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{editedUser.totalPoints.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{editedUser.badges.length}</div>
                    <div className="text-xs text-gray-600">Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600">{editedUser.goals.length}</div>
                    <div className="text-xs text-gray-600">Goals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Goals Management */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sustainability Goals</h3>
              <button className="text-emerald-600 font-medium hover:text-emerald-700">
                + Add Goal
              </button>
            </div>

            <div className="space-y-4">
              {editedUser.goals.map((goal) => (
                <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      goal.category === 'energy' ? 'bg-yellow-100 text-yellow-700' :
                      goal.category === 'carbon' ? 'bg-green-100 text-green-700' :
                      goal.category === 'water' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {goal.category.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {goal.currentValue} / {goal.targetValue} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      Due: {new Date(goal.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Bell className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            </div>

            <div className="space-y-4">
              {Object.entries(editedUser.preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {key === 'notifications' && 'Receive push notifications'}
                      {key === 'sustainabilityTips' && 'Daily sustainability tips and recommendations'}
                      {key === 'weeklyReports' && 'Weekly progress reports and insights'}
                      {key === 'challengeUpdates' && 'Updates about community challenges'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setEditedUser({
                        ...editedUser,
                        preferences: {...editedUser.preferences, [key]: e.target.checked}
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievement Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {editedUser.badges.slice(0, 3).map((badge) => (
                <div key={badge.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{badge.name}</div>
                    <div className="text-xs text-gray-600">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge Collection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Badge Collection</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(badgeCategories).map(([key, category]) => {
                const categoryBadges = editedUser.badges.filter(badge => badge.category === key);
                return (
                  <div key={key} className={`p-3 rounded-lg ${category.color}`}>
                    <div className="text-center">
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="font-bold text-lg">{categoryBadges.length}</div>
                      <div className="text-xs">{category.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Account Settings</span>
              </button>
              <button className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                <Target className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Privacy Settings</span>
              </button>
              <button className="w-full flex items-center p-3 text-left rounded-lg hover:bg-red-50 transition-colors text-red-600">
                <User className="h-5 w-5 mr-3" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};