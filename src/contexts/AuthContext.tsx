import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  level: number;
  totalPoints: number;
  carbonFootprint: number;
  sustainabilityScore: number;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  logActivity: (type: string, data?: any) => void;
  saveMetric: (type: string, value: number, unit: string) => Promise<{ success: boolean; data?: any }>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Demo user data
  const demoUser: User = {
    id: 'demo-user-123',
    name: 'EcoWarrior',
    email: 'demo@sustainableplatform.com',
    username: 'EcoWarrior',
    level: 12,
    totalPoints: 2847,
    carbonFootprint: 6.2,
    sustainabilityScore: 87,
    role: 'user'
  };

  useEffect(() => {
    // Initialize demo mode
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setLoading(true);
    try {
      // Set demo token and user
      const demoToken = 'demo-jwt-token-abc123';
      apiService.setToken(demoToken);
      
      // Store token in localStorage for persistence
      localStorage.setItem('auth_token', demoToken);
      localStorage.setItem('demo_mode', 'true');
      
      // Set demo user
      setUser(demoUser);
      
      console.log('🎯 Demo mode initialized successfully');
    } catch (error) {
      console.error('Failed to initialize demo mode:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      // In demo mode, accept any credentials
      console.log('🔐 Demo mode: Signing in with credentials for:', email);
      
      // Set demo token
      const demoToken = 'demo-jwt-token-abc123';
      apiService.setToken(demoToken);
      localStorage.setItem('auth_token', demoToken);
      localStorage.setItem('demo_mode', 'true');
      
      // Set demo user with provided email
      const loginUser = { ...demoUser, email };
      setUser(loginUser);
      
      return { success: true };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message || 'Sign in failed' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      // In demo mode, accept any registration
      console.log('📝 Demo mode: Creating account for:', email, 'with password length:', password.length);
      
      // Set demo token
      const demoToken = 'demo-jwt-token-abc123';
      apiService.setToken(demoToken);
      localStorage.setItem('auth_token', demoToken);
      localStorage.setItem('demo_mode', 'true');
      
      // Set demo user with provided name and email
      const newUser = { ...demoUser, name, email };
      setUser(newUser);
      
      return { success: true };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message || 'Sign up failed' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    apiService.setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('demo_mode');
    console.log('👋 Signed out successfully');
  };

  const logActivity = (type: string, data?: any) => {
    console.log('📊 Activity logged:', { type, data, timestamp: new Date().toISOString() });
    // In demo mode, just log the activity locally
  };

  const saveMetric = async (type: string, value: number, unit: string): Promise<{ success: boolean; data?: any }> => {
    try {
      console.log('💾 Saving metric:', { type, value, unit });
      
      // Use the API service which has demo mode support
      const result = await apiService.saveMetric(type, value, unit);
      
      return {
        success: true,
        data: result.data
      };
    } catch (error) {
      console.error('Error saving metric:', error);
      return {
        success: false,
        data: null
      };
    }
  };

  // Legacy login method for backward compatibility
  const login = async (email: string, password: string): Promise<void> => {
    const result = await signIn(email, password);
    if (!result.success) {
      throw new Error(result.error || 'Login failed');
    }
  };

  // Legacy register method for backward compatibility
  const register = async (email: string, password: string, name: string): Promise<void> => {
    const result = await signUp(email, password, name);
    if (!result.success) {
      throw new Error(result.error || 'Registration failed');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    logActivity,
    saveMetric,
    login,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
