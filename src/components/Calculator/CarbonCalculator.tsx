import React, { useState } from 'react';
import { Calculator, Zap, Car, Utensils, TrendingDown, Lightbulb } from 'lucide-react';

interface CalculatorData {
  electricity: number;
  heating: number;
  car: number;
  flights: number;
  meat: number;
  local: boolean;
}

export const CarbonCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({
    electricity: 300,
    heating: 150,
    car: 1000,
    flights: 2,
    meat: 4,
    local: false
  });

  const [showResults, setShowResults] = useState(false);

  const calculateFootprint = () => {
    // Simplified calculation (real app would use more complex formulas)
    const electricity = data.electricity * 0.0005; // tons CO2 per kWh
    const heating = data.heating * 0.002; // tons CO2 per therms
    const car = data.car * 0.000404; // tons CO2 per mile
    const flights = data.flights * 0.5; // tons CO2 per flight
    const meat = data.meat * 0.1; // tons CO2 per serving per week
    const localBonus = data.local ? -0.2 : 0; // local food bonus
    
    return electricity + heating + car + flights + meat + localBonus;
  };

  const totalFootprint = calculateFootprint();
  const averageFootprint = 4.8; // US average in tons CO2

  const recommendations = [
    {
      title: 'Switch to renewable energy',
      impact: 'High',
      savings: '2.1 tons CO₂/year',
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      title: 'Use public transportation',
      impact: 'Medium',
      savings: '1.3 tons CO₂/year',
      icon: Car,
      color: 'text-blue-600'
    },
    {
      title: 'Reduce meat consumption',
      impact: 'Medium',
      savings: '0.8 tons CO₂/year',
      icon: Utensils,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Calculator className="h-6 w-6 text-emerald-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Carbon Footprint Calculator</h2>
        </div>
        <p className="text-gray-600">
          Calculate your annual carbon footprint and get personalized recommendations to reduce your environmental impact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Information</h3>
          
          <div className="space-y-6">
            {/* Energy Section */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                Energy Usage
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly electricity usage (kWh)
                  </label>
                  <input
                    type="number"
                    value={data.electricity}
                    onChange={(e) => setData({...data, electricity: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly heating (therms)
                  </label>
                  <input
                    type="number"
                    value={data.heating}
                    onChange={(e) => setData({...data, heating: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Transportation Section */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <Car className="h-5 w-5 text-blue-500 mr-2" />
                Transportation
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly driving miles
                  </label>
                  <input
                    type="number"
                    value={data.car}
                    onChange={(e) => setData({...data, car: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Round-trip flights per year
                  </label>
                  <input
                    type="number"
                    value={data.flights}
                    onChange={(e) => setData({...data, flights: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Diet Section */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <Utensils className="h-5 w-5 text-green-500 mr-2" />
                Diet
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meat servings per week
                  </label>
                  <input
                    type="number"
                    value={data.meat}
                    onChange={(e) => setData({...data, meat: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="local"
                    checked={data.local}
                    onChange={(e) => setData({...data, local: e.target.checked})}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="local" className="ml-2 block text-sm text-gray-700">
                    I primarily buy local/organic food
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowResults(true)}
              className="w-full bg-emerald-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Calculate My Footprint
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {showResults && (
            <>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Results</h3>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">
                    {totalFootprint.toFixed(1)} tons
                  </div>
                  <p className="text-gray-600">CO₂ per year</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Your footprint</span>
                    <span className="text-sm font-medium">{totalFootprint.toFixed(1)} tons</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">US average</span>
                    <span className="text-sm font-medium">{averageFootprint} tons</span>
                  </div>
                  <div className="mt-3 flex items-center">
                    <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                    <span className={`text-sm font-medium ${
                      totalFootprint < averageFootprint ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {totalFootprint < averageFootprint 
                        ? `${(averageFootprint - totalFootprint).toFixed(1)} tons below average`
                        : `${(totalFootprint - averageFootprint).toFixed(1)} tons above average`
                      }
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Energy</span>
                      <span>{((data.electricity * 0.0005 + data.heating * 0.002) * 12).toFixed(1)} tons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transportation</span>
                      <span>{((data.car * 0.000404 * 12) + (data.flights * 0.5)).toFixed(1)} tons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diet</span>
                      <span>{((data.meat * 0.1 * 52) + (data.local ? -0.2 : 0)).toFixed(1)} tons</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
                </div>
                
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <rec.icon className={`h-5 w-5 ${rec.color} mr-3 mt-0.5`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{rec.title}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            rec.impact === 'High' ? 'bg-red-100 text-red-700' :
                            rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {rec.impact} Impact
                          </span>
                          <span className="text-sm text-emerald-600 font-medium">
                            Save {rec.savings}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};