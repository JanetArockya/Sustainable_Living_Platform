import React from 'react';
import { Goal } from '../../types';
import { Target, Calendar } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const progress = (goal.currentValue / goal.targetValue) * 100;
  const isOverTarget = goal.currentValue > goal.targetValue;
  
  const categoryColors = {
    energy: 'text-yellow-600 bg-yellow-50',
    water: 'text-blue-600 bg-blue-50',
    carbon: 'text-green-600 bg-green-50',
    waste: 'text-purple-600 bg-purple-50',
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-gray-400" />
          <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[goal.category]}`}>
            {goal.category.toUpperCase()}
          </span>
        </div>
        <span className={`text-sm font-medium ${
          goal.completed ? 'text-green-600' : 'text-gray-600'
        }`}>
          {goal.completed ? 'Completed' : 'In Progress'}
        </span>
      </div>
      
      <h4 className="font-semibold text-gray-900 mb-2">{goal.title}</h4>
      <p className="text-sm text-gray-600 mb-4">{goal.description}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Progress</span>
          <span className={`font-medium ${
            isOverTarget ? 'text-red-600' : 'text-emerald-600'
          }`}>
            {goal.currentValue} / {goal.targetValue} {goal.unit}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              isOverTarget ? 'bg-red-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};