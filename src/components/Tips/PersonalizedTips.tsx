import React, { useState } from 'react';
import { Lightbulb, Clock, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { mockTips } from '../../data/mockData';
import { Tip } from '../../types';

export const PersonalizedTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedTips, setCompletedTips] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: 'All Tips' },
    { id: 'energy', name: 'Energy' },
    { id: 'water', name: 'Water' },
    { id: 'waste', name: 'Waste' },
    { id: 'transport', name: 'Transport' }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? mockTips 
    : mockTips.filter(tip => tip.category === selectedCategory);

  const handleTipComplete = (tipId: string) => {
    const newCompleted = new Set(completedTips);
    if (newCompleted.has(tipId)) {
      newCompleted.delete(tipId);
    } else {
      newCompleted.add(tipId);
    }
    setCompletedTips(newCompleted);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'text-gray-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Daily Sustainability Tips</h2>
        </div>
        <p className="text-gray-600">
          Get personalized tips to reduce your environmental impact and live more sustainably.
        </p>
      </div>

      {/* Today's Featured Tip */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center mb-3">
          <Star className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium text-emerald-100">Today's Featured Tip</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{mockTips[0].title}</h3>
        <p className="text-emerald-100 mb-4">{mockTips[0].description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="bg-white bg-opacity-20 rounded-lg px-3 py-1 text-sm">
              {mockTips[0].difficulty} difficulty
            </span>
            <span className="bg-white bg-opacity-20 rounded-lg px-3 py-1 text-sm">
              {mockTips[0].impact} impact
            </span>
          </div>
          {mockTips[0].estimatedSavings && (
            <span className="text-emerald-100 font-medium">
              Save {mockTips[0].estimatedSavings}
            </span>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Browse by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => {
          const isCompleted = completedTips.has(tip.id);
          
          return (
            <div 
              key={tip.id} 
              className={`bg-white rounded-xl p-6 shadow-sm border transition-all hover:shadow-md ${
                isCompleted ? 'border-emerald-200 bg-emerald-50' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  isCompleted ? 'bg-emerald-100' : 'bg-gray-100'
                }`}>
                  <Lightbulb className={`h-5 w-5 ${
                    isCompleted ? 'text-emerald-600' : 'text-gray-600'
                  }`} />
                </div>
                <button
                  onClick={() => handleTipComplete(tip.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    isCompleted 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isCompleted ? 'Completed' : 'Mark Done'}
                </button>
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{tip.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                    {tip.difficulty}
                  </span>
                  <div className="flex items-center">
                    <TrendingUp className={`h-3 w-3 mr-1 ${getImpactColor(tip.impact)}`} />
                    <span className={`text-xs font-medium ${getImpactColor(tip.impact)}`}>
                      {tip.impact} impact
                    </span>
                  </div>
                </div>
              </div>
              
              {tip.estimatedSavings && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Potential savings</span>
                  <span className="text-sm font-medium text-emerald-600">{tip.estimatedSavings}</span>
                </div>
              )}
              
              <div className="mt-4">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors">
                  <span className="text-sm font-medium mr-2">Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Your Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {completedTips.size}
            </div>
            <div className="text-sm text-emerald-700">Tips Completed</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {Math.round(completedTips.size * 12.5)}
            </div>
            <div className="text-sm text-blue-700">Points Earned</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {completedTips.size * 2}
            </div>
            <div className="text-sm text-purple-700">Days Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};