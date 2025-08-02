import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ModernAuth } from './components/Auth/ModernAuth';
import { ModernHeader } from './components/Layout/ModernHeader';
import { BottomNavigation } from './components/Layout/BottomNavigation';
import { ModernDashboard } from './components/Dashboard/ModernDashboard';
import { ModernChallenges } from './components/Challenges/ModernChallenges';
import { CommunityHub } from './components/Community/CommunityHub';
import { ModernProfile } from './components/Profile/ModernProfile';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading your sustainable journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <ModernAuth />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ModernHeader />
        
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<ModernDashboard />} />
            <Route path="/challenges" element={<ModernChallenges />} />
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/profile" element={<ModernProfile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>

        <BottomNavigation />
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;