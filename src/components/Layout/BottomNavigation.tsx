import React from 'react';
import { Home, Trophy, Users, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const { logActivity } = useAuth();

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'challenges', name: 'Challenges', icon: Trophy },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  const handleTabClick = async (tabId: string) => {
    onTabChange(tabId);
    await logActivity('navigation', { tab: tabId, timestamp: new Date().toISOString() });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-100 text-emerald-600 scale-105'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${isActive ? 'text-emerald-600' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-emerald-600' : ''}`}>
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Mobile Bolt Badge */}
      <div className="flex justify-center pb-2">
        <a 
          href="https://bolt.new" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-2 py-1 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 md:hidden"
        >
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs">b</span>
          </div>
          <span className="text-xs font-medium">Powered by Bolt</span>
        </a>
      </div>
    </div>
  );
};