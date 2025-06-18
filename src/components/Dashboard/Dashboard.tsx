import React from 'react';
import { TrendingUp, TrendingDown, Zap, Droplets, Leaf, Target } from 'lucide-react';
import { mockUser, mockCarbonData } from '../../data/mockData';
import { StatsCard } from './StatsCard';
import { ProgressChart } from './ProgressChart';
import { GoalCard } from './GoalCard';

export const Dashboard: React.FC = () => {
  const user = mockUser;
  const carbonData = mockCarbonData;

  const stats = [
    {
      title: 'Carbon Footprint',
      value: `${carbonData.total} tons`,
      change: -12,
      icon: Leaf,
      color: 'emerald'
    },
    {
      title: 'Energy Usage',
      value: `${(carbonData.energy.electricity + carbonData.energy.heating + carbonData.energy.cooling)} kWh`,
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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
        <p className="text-emerald-100 mb-4">
          You've made great progress this month. Keep up the sustainable lifestyle!
        </p>
        <div className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
            <span className="text-sm font-medium">Level {user.level}</span>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
            <span className="text-sm font-medium">{user.totalPoints} points</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon Footprint Breakdown</h3>
          <ProgressChart data={carbonData} />
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Energy Reduction</span>
                <span className="text-sm font-bold text-emerald-600">-18%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Water Conservation</span>
                <span className="text-sm font-bold text-blue-600">+15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Waste Reduction</span>
                <span className="text-sm font-bold text-purple-600">-22%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Goals */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>

      {/* Recent Badges */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {user.badges.slice(0, 3).map((badge) => (
            <div key={badge.id} className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{badge.name}</h4>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};