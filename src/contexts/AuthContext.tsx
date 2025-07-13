'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type UserType = 'individual' | 'company' | 'recruiter';

export interface User {
  id: string;
  email: string;
  name: string;
  type: UserType;
  profile?: {
    firstName?: string;
    lastName?: string;
    location?: string;
    bio?: string;
    avatar?: string;
    linkedIn?: string;
    github?: string;
  };
}

export interface Company {
  id: string;
  email: string;
  name: string;
  type: 'company';
  profile?: {
    description?: string;
    website?: string;
    industry?: string;
    size?: string;
    location?: string;
    logo?: string;
    culture?: string[];
    techStack?: string[];
    benefits?: string[];
  };
}

export interface Recruiter {
  id: string;
  email: string;
  name: string;
  type: 'recruiter';
  profile?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    location?: string;
    bio?: string;
    avatar?: string;
    linkedIn?: string;
    specialties?: string[]; // e.g., ['Frontend', 'Backend', 'DevOps']
    yearsOfExperience?: number;
    languages?: string[]; // Languages they can recruit in
  };
}

export type AuthUser = User | Company | Recruiter;

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  register: (email: string, password: string, name: string, type: UserType) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('tunel_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, type: UserType) => {
    setLoading(true);
    
    try {
      const { authAPI } = await import('@/lib/api');
      const response = await authAPI.login({ email, password, type });
      
      if (response.success && response.data) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('tunel_user', JSON.stringify(userData));
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, type: UserType) => {
    setLoading(true);
    
    try {
      const { authAPI } = await import('@/lib/api');
      const response = await authAPI.register({ email, password, name, type });
      
      if (response.success && response.data) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('tunel_user', JSON.stringify(userData));
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const { authAPI } = await import('@/lib/api');
    await authAPI.logout();
    setUser(null);
    localStorage.removeItem('tunel_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}