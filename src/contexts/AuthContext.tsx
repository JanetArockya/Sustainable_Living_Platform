import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  joinDate: string;
  totalPoints: number;
  level: number;
  preferences: {
    notifications: boolean;
    sustainabilityTips: boolean;
    weeklyReports: boolean;
    challengeUpdates: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  logActivity: (activityType: string, activityData: any) => Promise<void>;
  saveMetric: (metricType: string, value: number, unit: string) => Promise<void>;
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
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setSupabaseUser(null);
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
          joinDate: data.created_at,
          totalPoints: 2840, // Default values for demo
          level: 7,
          preferences: {
            notifications: true,
            sustainabilityTips: true,
            weeklyReports: true,
            challengeUpdates: true,
          },
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // User profile will be created automatically via trigger
        await fetchUserProfile(data.user.id);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setSupabaseUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  const logActivity = async (activityType: string, activityData: any) => {
    // For now, just log to console. In a real app, you'd save to Supabase
    console.log('Activity logged:', { activityType, activityData });
  };

  const saveMetric = async (metricType: string, value: number, unit: string) => {
    // For now, just log to console. In a real app, you'd save to Supabase
    console.log('Metric saved:', { metricType, value, unit });
  };

  const value = {
    user,
    supabaseUser,
    signUp,
    signIn,
    signOut,
    isLoading,
    logActivity,
    saveMetric,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Legacy exports for compatibility
export const login = (email: string, password: string) => {
  throw new Error('Use signIn instead of login');
};

export const register = (email: string, password: string, name: string) => {
  throw new Error('Use signUp instead of register');
};

export const logout = () => {
  throw new Error('Use signOut instead of logout');
};