import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Target, Award, Zap, Droplets, Leaf } from 'lucide-react';

interface AnalyticsData {
  period: string;
  carbonFootprint: number;
  energyUsage: number;
  waterUsage: number;
  wasteReduction: number;
}

export const AdvancedAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  const analyticsData: AnalyticsData[] = [
    { period: 'Jan', carbonFootprint: 8.2, energyUsage: 850, waterUsage: 3200, wasteReduction: 15 },
    { period: 'Feb', carbonFootprint: 7.8, energyUsage: 820, waterUsage: 3100, wasteReduction: 18 },
    { period: 'Mar', carbonFootprint: 7.1, energyUsage: 780, waterUsage: 2950, wasteReduction: 22 },
    { period: 'Apr', carbonFootprint: 6.9, energyUsage: 750, waterUsage: 2800, wasteReduction: 25 },
    { period: 'May', carbonFootprint: 6.5, energyUsage: 720, waterUsage: 2700, wasteReduction: 28 },
    { period: 'Jun', carbonFootprint: 6.2, energyUsage: 690, waterUsage: 2600, wasteReduction: 30 }
  ];

  const currentMonth = analyticsData[analyticsData.length - 1];
  const previousMonth = analyticsData[analyticsData.length - 2];
  
  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous * 100);
  };

  const predictions = {
    nextMonth: {
      carbonFootprint: 5.8,
      energyUsage: 650,
      waterUsage: 2500,
      wasteReduction: 35
    },
    yearEnd: {
      carbonFootprint: 5.2,
      energyUsage: 580,
      waterUsage: 2200,
      wasteReduction: 45
    }
  };

  const insights = [
    {
      title: "Energy Efficiency Improving",
      description: "Your energy usage has decreased by 23% over the last 6 months",
      impact: "high",
      icon: Zap,
      color: "text-yellow-600 bg-yellow-50"
    },
    {
      title: "Water Conservation Success",
      description: "You're saving 600 gallons per month compared to your baseline",
      impact: "medium",
      icon: Droplets,
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "Carbon Footprint Reduction",
      description: "On track to reduce carbon footprint by 35% this year",
      impact: "high",
      icon: Leaf,
      color: "text-green-600 bg-green-50"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-6 w-6 mr-3" />
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
        </div>
        <p className="text-purple-100">
          Deep insights into your sustainability journey with predictive analytics and personalized recommendations
        </p>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Time Period</h3>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md font-medium transition-colors capitalize ${
                  selectedPeriod === period
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Leaf className="h-8 w-8 text-green-500" />
            <span className={`text-sm font-medium ${
              calculateChange(currentMonth.carbonFootprint, previousMonth.carbonFootprint) < 0 
                ? 'text-green-600' : 'text-red-600'
            }`}>
              {calculateChange(currentMonth.carbonFootprint, previousMonth.carbonFootprint).toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {currentMonth.carbonFootprint} tons
          </div>
          <div className="text-sm text-gray-600">Carbon Footprint</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Zap className="h-8 w-8 text-yellow-500" />
            <span className={`text-sm font-medium ${
              calculateChange(currentMonth.energyUsage, previousMonth.energyUsage) < 0 
                ? 'text-green-600' : 'text-red-600'
            }`}>
              {calculateChange(currentMonth.energyUsage, previousMonth.energyUsage).toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {currentMonth.energyUsage} kWh
          </div>
          <div className="text-sm text-gray-600">Energy Usage</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Droplets className="h-8 w-8 text-blue-500" />
            <span className={`text-sm font-medium ${
              calculateChange(currentMonth.waterUsage, previousMonth.waterUsage) < 0 
                ? 'text-green-600' : 'text-red-600'
            }`}>
              {calculateChange(currentMonth.waterUsage, previousMonth.waterUsage).toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {currentMonth.waterUsage} gal
          </div>
          <div className="text-sm text-gray-600">Water Usage</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-8 w-8 text-purple-500" />
            <span className="text-sm font-medium text-green-600">
              +{(currentMonth.wasteReduction - previousMonth.wasteReduction).toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {currentMonth.wasteReduction}%
          </div>
          <div className="text-sm text-gray-600">Waste Reduction</div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sustainability Trends</h3>
        
        <div className="space-y-6">
          {/* Carbon Footprint Trend */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Carbon Footprint (tons CO₂)</span>
              <span className="text-sm text-green-600 font-medium">-24% this year</span>
            </div>
            <div className="flex items-end space-x-2 h-20">
              {analyticsData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-green-500 rounded-t-sm transition-all duration-500"
                    style={{ height: `${(data.carbonFootprint / 10) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-1">{data.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Energy Usage Trend */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Energy Usage (kWh)</span>
              <span className="text-sm text-green-600 font-medium">-19% this year</span>
            </div>
            <div className="flex items-end space-x-2 h-20">
              {analyticsData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-yellow-500 rounded-t-sm transition-all duration-500"
                    style={{ height: `${(data.energyUsage / 1000) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-1">{data.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Predictions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Predictive Analytics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-3">Next Month Prediction</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Carbon Footprint</span>
                <span className="text-sm font-medium text-blue-900">{predictions.nextMonth.carbonFootprint} tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Energy Usage</span>
                <span className="text-sm font-medium text-blue-900">{predictions.nextMonth.energyUsage} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Water Usage</span>
                <span className="text-sm font-medium text-blue-900">{predictions.nextMonth.waterUsage} gal</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4">
            <h4 className="font-medium text-green-900 mb-3">Year-End Projection</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Carbon Footprint</span>
                <span className="text-sm font-medium text-green-900">{predictions.yearEnd.carbonFootprint} tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Energy Usage</span>
                <span className="text-sm font-medium text-green-900">{predictions.yearEnd.energyUsage} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Waste Reduction</span>
                <span className="text-sm font-medium text-green-900">{predictions.yearEnd.wasteReduction}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Insights</h3>
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-xl ${insight.color}`}>
              <div className="flex items-start space-x-3">
                <insight.icon className="h-6 w-6 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{insight.title}</h4>
                  <p className="text-sm opacity-80">{insight.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                  insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {insight.impact} impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};