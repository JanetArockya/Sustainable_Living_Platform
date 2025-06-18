import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { CarbonCalculator } from './components/Calculator/CarbonCalculator';
import { PersonalizedTips } from './components/Tips/PersonalizedTips';
import { LocalResources } from './components/Resources/LocalResources';
import { CommunityChallenge } from './components/Challenges/CommunityChallenge';
import { EducationalContent } from './components/Education/EducationalContent';
import { UserProfile } from './components/Profile/UserProfile';
import { SmartHomeIntegration } from './components/SmartHome/SmartHomeIntegration';
import { SustainabilityAssistant } from './components/AI/SustainabilityAssistant';
import { AdvancedAnalytics } from './components/Analytics/AdvancedAnalytics';
import { SustainableShoppingAssistant } from './components/Shopping/SustainableShoppingAssistant';
import { TransportationOptimization } from './components/Transportation/TransportationOptimization';
import { SmartNotifications } from './components/Notifications/SmartNotifications';
import { mockUser } from './data/mockData';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'calculator':
        return <CarbonCalculator />;
      case 'tips':
        return <PersonalizedTips />;
      case 'resources':
        return <LocalResources />;
      case 'challenges':
        return <CommunityChallenge />;
      case 'education':
        return <EducationalContent />;
      case 'profile':
        return <UserProfile />;
      case 'smart-home':
        return <SmartHomeIntegration />;
      case 'ai-assistant':
        return <SustainabilityAssistant />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'shopping':
        return <SustainableShoppingAssistant />;
      case 'transportation':
        return <TransportationOptimization />;
      case 'notifications':
        return <SmartNotifications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        userName={mockUser.name}
        userAvatar={mockUser.avatar}
      />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 md:ml-64">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;