import React from 'react';
import { 
  Home, 
  Calculator, 
  Lightbulb, 
  MapPin, 
  Trophy, 
  BookOpen, 
  User,
  X,
  Zap,
  Bot,
  BarChart3,
  ShoppingCart,
  Car,
  Bell
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'calculator', name: 'Carbon Calculator', icon: Calculator },
  { id: 'tips', name: 'Daily Tips', icon: Lightbulb },
  { id: 'resources', name: 'Local Resources', icon: MapPin },
  { id: 'challenges', name: 'Challenges', icon: Trophy },
  { id: 'education', name: 'Learn', icon: BookOpen },
  { id: 'smart-home', name: 'Smart Home', icon: Zap },
  { id: 'ai-assistant', name: 'AI Assistant', icon: Bot },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'shopping', name: 'Shopping Assistant', icon: ShoppingCart },
  { id: 'transportation', name: 'Transportation', icon: Car },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'profile', name: 'Profile', icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeSection, 
  onSectionChange 
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        md:relative md:translate-x-0 md:shadow-none md:border-r md:border-gray-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center px-3 py-3 text-left rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-102'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">7</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Level 7</p>
                  <p className="text-xs text-emerald-600">Eco Champion</p>
                </div>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full w-3/4 transition-all duration-500"></div>
              </div>
              <p className="text-xs text-emerald-700">2,840 / 3,500 points to Level 8</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};