import React, { useState, useEffect } from 'react';
import { Home, Zap, Thermometer, Lightbulb, Wifi, WifiOff, Settings, TrendingDown, TrendingUp } from 'lucide-react';

interface SmartDevice {
  id: string;
  name: string;
  type: 'thermostat' | 'light' | 'outlet' | 'monitor';
  status: 'online' | 'offline';
  currentUsage: number;
  isOn: boolean;
  temperature?: number;
  targetTemp?: number;
}

export const SmartHomeIntegration: React.FC = () => {
  const [devices, setDevices] = useState<SmartDevice[]>([
    {
      id: '1',
      name: 'Living Room Thermostat',
      type: 'thermostat',
      status: 'online',
      currentUsage: 2.4,
      isOn: true,
      temperature: 72,
      targetTemp: 70
    },
    {
      id: '2',
      name: 'Kitchen Lights',
      type: 'light',
      status: 'online',
      currentUsage: 0.8,
      isOn: true
    },
    {
      id: '3',
      name: 'Home Office Monitor',
      type: 'monitor',
      status: 'online',
      currentUsage: 15.2,
      isOn: true
    },
    {
      id: '4',
      name: 'Bedroom Outlet',
      type: 'outlet',
      status: 'offline',
      currentUsage: 0,
      isOn: false
    }
  ]);

  const [totalUsage, setTotalUsage] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(127);

  useEffect(() => {
    const total = devices.reduce((sum, device) => sum + device.currentUsage, 0);
    setTotalUsage(total);
  }, [devices]);

  const toggleDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, isOn: !device.isOn, currentUsage: device.isOn ? 0 : device.currentUsage }
        : device
    ));
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'thermostat': return Thermometer;
      case 'light': return Lightbulb;
      case 'outlet': return Zap;
      case 'monitor': return Home;
      default: return Zap;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center mb-4">
          <Home className="h-6 w-6 mr-3" />
          <h2 className="text-2xl font-bold">Smart Home Control</h2>
        </div>
        <p className="text-blue-100 mb-6">
          Monitor and control your connected devices to optimize energy usage
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">{totalUsage.toFixed(1)} kW</div>
            <div className="text-blue-100 text-sm">Current Usage</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">${monthlySavings}</div>
            <div className="text-blue-100 text-sm">Monthly Savings</div>
          </div>
        </div>
      </div>

      {/* Device Controls */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Connected Devices</h3>
        
        {devices.map((device) => {
          const DeviceIcon = getDeviceIcon(device.type);
          
          return (
            <div key={device.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${
                    device.status === 'online' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <DeviceIcon className={`h-6 w-6 ${
                      device.status === 'online' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{device.name}</h4>
                    <div className="flex items-center space-x-2">
                      {device.status === 'online' ? (
                        <Wifi className="h-4 w-4 text-green-500" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={`text-sm ${
                        device.status === 'online' ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{device.currentUsage} kW</div>
                    {device.temperature && (
                      <div className="text-sm text-gray-600">{device.temperature}°F</div>
                    )}
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={device.isOn}
                      onChange={() => toggleDevice(device.id)}
                      disabled={device.status === 'offline'}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                  </label>
                </div>
              </div>
              
              {device.type === 'thermostat' && device.temperature && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Temperature Control</span>
                    <span className="text-sm text-gray-600">Target: {device.targetTemp}°F</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="80"
                    value={device.targetTemp}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Energy Optimization Suggestions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Suggestions</h3>
        
        <div className="space-y-3">
          <div className="flex items-start p-4 bg-green-50 rounded-xl border border-green-200">
            <TrendingDown className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900">Lower Thermostat</h4>
              <p className="text-sm text-green-700">Reduce by 2°F to save $23/month</p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-blue-50 rounded-xl border border-blue-200">
            <Lightbulb className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Schedule Lighting</h4>
              <p className="text-sm text-blue-700">Auto-dim lights after 10 PM to save energy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};