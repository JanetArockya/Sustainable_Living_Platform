import React, { useState } from 'react';
import { Trophy, Users, Calendar, Target, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Challenge {
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

export const ModernChallenges: React.FC = () => {
  const { logActivity } = useAuth();
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'available'>('active');
  const [joinedChallenges, setJoinedChallenges] = useState<Set<string>>(new Set(['1', '2']));

  const mockChallenges: Challenge[] = [
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

  const activeChallenges = mockChallenges.filter(c => joinedChallenges.has(c.id) && !c.completed);
  const completedChallenges = mockChallenges.filter(c => joinedChallenges.has(c.id) && c.completed);
  const availableChallenges = mockChallenges.filter(c => !joinedChallenges.has(c.id));

  const handleJoinChallenge = async (challengeId: string) => {
    setJoinedChallenges(prev => new Set([...prev, challengeId]));
    await logActivity('challenge_joined', { challengeId, timestamp: new Date().toISOString() });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800';
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

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl p-6 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <Trophy className="h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Community Challenges</h2>
          </div>
          <p className="text-purple-100">
            Join sustainability challenges, compete with the community, and earn badges for your achievements.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{activeChallenges.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{completedChallenges.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">2,840</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">4th</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Rank</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
          {[
            { id: 'active', name: 'Active', count: activeChallenges.length },
            { id: 'available', name: 'Available', count: availableChallenges.length },
            { id: 'completed', name: 'Completed', count: completedChallenges.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.name}
              <span className="ml-2 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full px-2 py-1">
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
          <div key={challenge.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(challenge.category)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                {challenge.completed && (
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium">✓ Completed</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{challenge.points}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Points</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{challenge.participants}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Participants</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{challenge.duration}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{challenge.category}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Category</div>
              </div>
            </div>

            {challenge.progress !== undefined && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{challenge.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 mr-1" />
                <span>{challenge.participants} joined</span>
              </div>
              
              {activeTab === 'available' && (
                <button
                  onClick={() => handleJoinChallenge(challenge.id)}
                  className="bg-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-emerald-600 transition-colors font-medium"
                >
                  Join Challenge
                </button>
              )}
              
              {activeTab === 'active' && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">5 days left</span>
                </div>
              )}
              
              {activeTab === 'completed' && (
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">+{challenge.points} points earned</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};