import React, { useState } from 'react';
import { Trophy, Users, Calendar, Target, Star, TrendingUp } from 'lucide-react';
import { mockChallenges } from '../../data/mockData';
import { Challenge } from '../../types';

export const CommunityChallenge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'available'>('active');
  const [joinedChallenges, setJoinedChallenges] = useState<Set<string>>(new Set(['1', '2']));

  const activeChallenges = mockChallenges.filter(c => joinedChallenges.has(c.id) && !c.completed);
  const completedChallenges = mockChallenges.filter(c => joinedChallenges.has(c.id) && c.completed);
  const availableChallenges = mockChallenges.filter(c => !joinedChallenges.has(c.id));

  const handleJoinChallenge = (challengeId: string) => {
    setJoinedChallenges(prev => new Set([...prev, challengeId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      waste: '🗑️',
      diet: '🥗',
      transport: '🚲',
      energy: '⚡',
      water: '💧'
    };
    return icons[category as keyof typeof icons] || '🌱';
  };

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 3420, badge: '🏆' },
    { rank: 2, name: 'Mike Johnson', points: 3180, badge: '🥈' },
    { rank: 3, name: 'Emma Davis', points: 2950, badge: '🥉' },
    { rank: 4, name: 'You', points: 2840, badge: '🌟' },
    { rank: 5, name: 'Alex Brown', points: 2720, badge: '⭐' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Trophy className="h-6 w-6 text-yellow-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Community Challenges</h2>
        </div>
        <p className="text-gray-600">
          Join sustainability challenges, compete with the community, and earn badges for your achievements.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">{activeChallenges.length}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{completedChallenges.length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">2,840</div>
          <div className="text-sm text-gray-600">Points</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">4th</div>
          <div className="text-sm text-gray-600">Rank</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenges */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {[
                { id: 'active', name: 'Active', count: activeChallenges.length },
                { id: 'available', name: 'Available', count: availableChallenges.length },
                { id: 'completed', name: 'Completed', count: completedChallenges.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.name}
                  <span className="ml-2 bg-gray-200 text-gray-600 text-xs rounded-full px-2 py-1">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Challenge Cards */}
          <div className="space-y-4">
            {(activeTab === 'active' ? activeChallenges :
              activeTab === 'completed' ? completedChallenges :
              availableChallenges).map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getCategoryIcon(challenge.category)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    {challenge.completed && (
                      <span className="text-green-600 text-sm font-medium">✓ Completed</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600">{challenge.points}</div>
                    <div className="text-xs text-gray-600">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{challenge.participants}</div>
                    <div className="text-xs text-gray-600">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{challenge.duration}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">{challenge.category}</div>
                    <div className="text-xs text-gray-600">Category</div>
                  </div>
                </div>

                {challenge.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-emerald-600">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{challenge.participants} joined</span>
                  </div>
                  
                  {activeTab === 'available' && (
                    <button
                      onClick={() => handleJoinChallenge(challenge.id)}
                      className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Join Challenge
                    </button>
                  )}
                  
                  {activeTab === 'active' && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">5 days left</span>
                    </div>
                  )}
                  
                  {activeTab === 'completed' && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Star className="h-4 w-4" />
                      <span className="text-sm font-medium">+{challenge.points} points earned</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
            </div>
            
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    user.name === 'You' ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{user.badge}</span>
                    <div>
                      <div className={`font-medium ${
                        user.name === 'You' ? 'text-emerald-900' : 'text-gray-900'
                      }`}>
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-600">#{user.rank}</div>
                    </div>
                  </div>
                  <div className={`font-bold ${
                    user.name === 'You' ? 'text-emerald-600' : 'text-gray-700'
                  }`}>
                    {user.points.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Challenge */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
            <div className="flex items-center mb-3">
              <Star className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium text-purple-100">Weekly Challenge</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Plastic-Free Week</h3>
            <p className="text-purple-100 mb-4 text-sm">
              Eliminate single-use plastics from your daily routine for 7 days.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1 text-sm">
                  200 points
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1 text-sm">
                  3 days left
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};