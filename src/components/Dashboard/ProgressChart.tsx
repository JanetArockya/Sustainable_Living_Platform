import React from 'react';
import { CarbonFootprintData } from '../../types';

interface ProgressChartProps {
  data: CarbonFootprintData;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const categories = [
    { name: 'Transportation', value: data.transportation.car + data.transportation.public + data.transportation.flights, color: 'bg-red-500' },
    { name: 'Energy', value: data.energy.electricity + data.energy.heating + data.energy.cooling, color: 'bg-yellow-500' },
    { name: 'Diet', value: data.diet.meat + data.diet.dairy, color: 'bg-green-500' },
  ];

  const total = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className="space-y-4">
      {categories.map((category, index) => {
        const percentage = (category.value / total) * 100;
        
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">{category.name}</span>
              <span className="text-gray-600">{category.value.toLocaleString()} kg CO₂</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${category.color} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 text-right">
              {percentage.toFixed(1)}% of total
            </div>
          </div>
        );
      })}
    </div>
  );
};