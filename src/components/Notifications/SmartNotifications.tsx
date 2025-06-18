import React, { useState, useEffect } from 'react';
import { Bell, X, Zap, Droplets, Thermometer, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'energy' | 'water' | 'weather' | 'bill' | 'achievement' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  action?: {
    label: string;
    callback: () => void;
  };
  icon: React.ComponentType<any>;
  color: string;
}

export const SmartNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulate real-time notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'energy',
        title: 'High Energy Usage Alert',
        message: 'Your energy consumption is 25% higher than usual today. Consider adjusting your thermostat.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        priority: 'high',
        actionable: true,
        action: {
          label: 'Adjust Thermostat',
          callback: () => console.log('Navigate to smart home controls')
        },
        icon: Zap,
        color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
      },
      {
        id: '2',
        type: 'weather',
        title: 'Perfect Weather for Energy Savings',
        message: 'It\'s 68°F outside - perfect for opening windows instead of using AC!',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        priority: 'medium',
        actionable: false,
        icon: Thermometer,
        color: 'text-blue-600 bg-blue-50 border-blue-200'
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Congratulations! 🎉',
        message: 'You\'ve reduced your carbon footprint by 15% this month!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        priority: 'low',
        actionable: false,
        icon: CheckCircle,
        color: 'text-green-600 bg-green-50 border-green-200'
      },
      {
        id: '4',
        type: 'bill',
        title: 'Electricity Bill Due Soon',
        message: 'Your electricity bill of $127.50 is due in 3 days.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        priority: 'medium',
        actionable: true,
        action: {
          label: 'View Bill',
          callback: () => console.log('Navigate to bills section')
        },
        icon: Calendar,
        color: 'text-purple-600 bg-purple-50 border-purple-200'
      },
      {
        id: '5',
        type: 'water',
        title: 'Water Usage Spike Detected',
        message: 'Unusual water usage detected. Check for leaks or running appliances.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        priority: 'high',
        actionable: true,
        action: {
          label: 'Check Usage',
          callback: () => console.log('Navigate to water monitoring')
        },
        icon: Droplets,
        color: 'text-blue-600 bg-blue-50 border-blue-200'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.length);

    // Simulate new notifications coming in
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'reminder',
        title: 'Daily Tip Reminder',
        message: 'Don\'t forget to check today\'s sustainability tip!',
        timestamp: new Date(),
        priority: 'low',
        actionable: true,
        action: {
          label: 'View Tips',
          callback: () => console.log('Navigate to tips')
        },
        icon: Bell,
        color: 'text-gray-600 bg-gray-50 border-gray-200'
      };

      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bell className="h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Smart Notifications</h2>
          </div>
          {unreadCount > 0 && (
            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
              <span className="text-sm font-medium">{unreadCount} unread</span>
            </div>
          )}
        </div>
        <p className="text-indigo-100 mb-4">
          Stay informed about your energy usage, environmental impact, and sustainability opportunities
        </p>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { type: 'energy', label: 'Energy Alerts', description: 'High usage and efficiency tips' },
            { type: 'water', label: 'Water Monitoring', description: 'Usage spikes and conservation reminders' },
            { type: 'weather', label: 'Weather-Based Tips', description: 'Energy-saving opportunities based on weather' },
            { type: 'bills', label: 'Bill Reminders', description: 'Due dates and usage summaries' },
            { type: 'achievements', label: 'Achievements', description: 'Milestones and goal completions' },
            { type: 'tips', label: 'Daily Tips', description: 'Sustainability recommendations' }
          ].map((setting) => (
            <div key={setting.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900">{setting.label}</div>
                <div className="text-sm text-gray-600">{setting.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
        
        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No notifications</h4>
            <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              
              return (
                <div 
                  key={notification.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${getPriorityColor(notification.priority)} ${notification.color}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 rounded-lg">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                        
                        {notification.actionable && notification.action && (
                          <button
                            onClick={notification.action.callback}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                          >
                            {notification.action.label} →
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => dismissNotification(notification.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex flex-col items-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-colors">
            <Zap className="h-6 w-6 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-yellow-700">Energy Monitor</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
            <Droplets className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-700">Water Usage</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
            <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-700">View Goals</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
            <Calendar className="h-6 w-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-700">Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
};