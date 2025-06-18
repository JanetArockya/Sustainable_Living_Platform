import React, { useState, useEffect } from 'react';
import { Car, Bus, Bike, MapPin, Clock, Zap, DollarSign, Leaf } from 'lucide-react';

interface TransportOption {
  id: string;
  type: 'car' | 'public' | 'bike' | 'walk' | 'electric';
  name: string;
  duration: number;
  cost: number;
  carbonFootprint: number;
  calories?: number;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

interface ChargingStation {
  id: string;
  name: string;
  address: string;
  distance: number;
  available: number;
  total: number;
  fastCharging: boolean;
  price: number;
}

export const TransportationOptimization: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showChargingStations, setShowChargingStations] = useState(false);

  const chargingStations: ChargingStation[] = [
    {
      id: '1',
      name: 'Tesla Supercharger',
      address: '123 Main St, Downtown',
      distance: 0.5,
      available: 6,
      total: 8,
      fastCharging: true,
      price: 0.28
    },
    {
      id: '2',
      name: 'ChargePoint Station',
      address: '456 Oak Ave, Midtown',
      distance: 1.2,
      available: 3,
      total: 4,
      fastCharging: false,
      price: 0.22
    },
    {
      id: '3',
      name: 'EVgo Fast Charging',
      address: '789 Pine Rd, Uptown',
      distance: 2.1,
      available: 2,
      total: 6,
      fastCharging: true,
      price: 0.35
    }
  ];

  const mockTransportOptions: TransportOption[] = [
    {
      id: '1',
      type: 'car',
      name: 'Personal Car',
      duration: 25,
      cost: 8.50,
      carbonFootprint: 4.2,
      icon: Car,
      color: 'text-red-600 bg-red-50',
      description: 'Drive your own vehicle'
    },
    {
      id: '2',
      type: 'public',
      name: 'Public Transit',
      duration: 35,
      cost: 2.75,
      carbonFootprint: 1.1,
      icon: Bus,
      color: 'text-blue-600 bg-blue-50',
      description: 'Bus + Metro combination'
    },
    {
      id: '3',
      type: 'bike',
      name: 'Bike Share',
      duration: 45,
      cost: 3.00,
      carbonFootprint: 0,
      calories: 320,
      icon: Bike,
      color: 'text-green-600 bg-green-50',
      description: 'City bike sharing program'
    },
    {
      id: '4',
      type: 'electric',
      name: 'Electric Car Share',
      duration: 28,
      cost: 12.00,
      carbonFootprint: 0.8,
      icon: Zap,
      color: 'text-purple-600 bg-purple-50',
      description: 'Shared electric vehicle'
    }
  ];

  useEffect(() => {
    if (origin && destination) {
      setTransportOptions(mockTransportOptions);
    }
  }, [origin, destination]);

  const handleSearch = () => {
    if (origin && destination) {
      setTransportOptions(mockTransportOptions);
    }
  };

  const calculateSavings = (option: TransportOption) => {
    const carOption = mockTransportOptions.find(opt => opt.type === 'car');
    if (!carOption || option.type === 'car') return null;
    
    return {
      cost: carOption.cost - option.cost,
      carbon: carOption.carbonFootprint - option.carbonFootprint,
      time: option.duration - carOption.duration
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center mb-4">
          <Car className="h-6 w-6 mr-3" />
          <h2 className="text-2xl font-bold">Transportation Optimizer</h2>
        </div>
        <p className="text-blue-100">
          Find the most sustainable and efficient routes for your daily commute
        </p>
      </div>

      {/* Route Planner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Your Route</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Enter starting location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSearch}
            disabled={!origin || !destination}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Find Best Routes
          </button>
        </div>
      </div>

      {/* Transport Options */}
      {transportOptions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Transportation Options</h3>
            <button
              onClick={() => setShowChargingStations(!showChargingStations)}
              className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Zap className="h-4 w-4 mr-2" />
              EV Charging Stations
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transportOptions.map((option) => {
              const savings = calculateSavings(option);
              const IconComponent = option.icon;
              
              return (
                <div 
                  key={option.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all cursor-pointer hover:shadow-md ${
                    selectedOption === option.id ? 'border-blue-500' : 'border-gray-100'
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${option.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{option.name}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    
                    {option.type === 'bike' && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Zero Emissions
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      </div>
                      <div className="font-bold text-gray-900">{option.duration} min</div>
                      <div className="text-xs text-gray-600">Duration</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      </div>
                      <div className="font-bold text-gray-900">${option.cost.toFixed(2)}</div>
                      <div className="text-xs text-gray-600">Cost</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Leaf className="h-4 w-4 text-gray-400 mr-1" />
                      </div>
                      <div className="font-bold text-gray-900">{option.carbonFootprint} kg</div>
                      <div className="text-xs text-gray-600">CO₂</div>
                    </div>
                  </div>
                  
                  {option.calories && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">Health Benefit</span>
                        <span className="text-sm font-bold text-green-900">{option.calories} calories burned</span>
                      </div>
                    </div>
                  )}
                  
                  {savings && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-blue-800 mb-2">Savings vs. Driving</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Cost:</span>
                          <span className="font-medium text-blue-900">
                            {savings.cost > 0 ? `+$${savings.cost.toFixed(2)}` : `-$${Math.abs(savings.cost).toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">CO₂:</span>
                          <span className="font-medium text-blue-900">-{savings.carbon.toFixed(1)} kg</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Charging Stations */}
      {showChargingStations && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby EV Charging Stations</h3>
          
          <div className="space-y-4">
            {chargingStations.map((station) => (
              <div key={station.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{station.name}</h4>
                    <p className="text-sm text-gray-600">{station.address}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">{station.distance} miles away</span>
                      {station.fastCharging && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Fast Charging
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${station.price}/kWh</div>
                    <div className={`text-sm font-medium ${
                      station.available > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {station.available}/{station.total} available
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          station.available > station.total * 0.5 ? 'bg-green-500' :
                          station.available > 0 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(station.available / station.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">Availability</span>
                  </div>
                  
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    Navigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Carbon Offset Calculator */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Monthly Transportation Impact</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">156 kg</div>
            <div className="text-green-100 text-sm">CO₂ Saved</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">$89</div>
            <div className="text-green-100 text-sm">Money Saved</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">2,340</div>
            <div className="text-green-100 text-sm">Calories Burned</div>
          </div>
        </div>
      </div>
    </div>
  );
};