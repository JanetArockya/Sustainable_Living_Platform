import React, { useState } from 'react';
import { Users, MessageCircle, Heart, Share2, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: number;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  category: string;
}

export const CommunityHub: React.FC = () => {
  const { user, logActivity } = useAuth();
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard' | 'tips'>('feed');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const mockPosts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        level: 8
      },
      content: 'Just completed my first month of zero waste living! Here are my top 5 tips for beginners...',
      image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 42,
      comments: 12,
      timestamp: '2 hours ago',
      category: 'waste'
    },
    {
      id: '2',
      author: {
        name: 'Mike Johnson',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        level: 6
      },
      content: 'Installed solar panels last week and already seeing a 40% reduction in my electricity bill! The future is bright ☀️',
      likes: 38,
      comments: 8,
      timestamp: '4 hours ago',
      category: 'energy'
    },
    {
      id: '3',
      author: {
        name: 'Emma Davis',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        level: 9
      },
      content: 'Started a community garden in my neighborhood! We now have 20 families growing their own organic vegetables 🌱',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 67,
      comments: 15,
      timestamp: '1 day ago',
      category: 'garden'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 3420, badge: '🏆', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { rank: 2, name: 'Mike Johnson', points: 3180, badge: '🥈', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { rank: 3, name: 'Emma Davis', points: 2950, badge: '🥉', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { rank: 4, name: 'You', points: user?.totalPoints || 2840, badge: '🌟', avatar: user?.avatar },
    { rank: 5, name: 'Alex Brown', points: 2720, badge: '⭐', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' }
  ];

  const handleLike = async (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
    await logActivity('post_liked', { postId, action: newLiked.has(postId) ? 'like' : 'unlike', timestamp: new Date().toISOString() });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      waste: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      energy: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      garden: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Community Hub</h2>
          </div>
          <p className="text-blue-100">
            Connect with fellow eco-warriors, share tips, and inspire each other on the sustainability journey.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
          {[
            { id: 'feed', name: 'Community Feed', icon: MessageCircle },
            { id: 'leaderboard', name: 'Leaderboard', icon: TrendingUp },
            { id: 'tips', name: 'Shared Tips', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
          {mockPosts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{post.author.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{post.timestamp}</span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Level {post.author.level}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                  {post.category.toUpperCase()}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-gray-900 dark:text-white mb-4">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post content"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      likedPosts.has(post.id) 
                        ? 'text-red-500' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Community Leaderboard</h3>
          
          <div className="space-y-4">
            {leaderboard.map((user) => (
              <div 
                key={user.rank} 
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  user.name === 'You' 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' 
                    : 'bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{user.badge}</span>
                  <div className="flex items-center space-x-3">
                    {user.avatar && (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className={`font-medium ${
                        user.name === 'You' ? 'text-emerald-900 dark:text-emerald-100' : 'text-gray-900 dark:text-white'
                      }`}>
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">#{user.rank}</div>
                    </div>
                  </div>
                </div>
                <div className={`font-bold text-lg ${
                  user.name === 'You' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {user.points.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Community Tips</h3>
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Coming Soon</h4>
            <p className="text-gray-600 dark:text-gray-400">Community-shared sustainability tips and tricks will appear here.</p>
          </div>
        </div>
      )}
    </div>
  );
};