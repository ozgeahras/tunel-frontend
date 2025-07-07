'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type UserType = 'individual' | 'company';

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

export type AuthUser = User | Company;

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app, this would come from API
    const mockUser: AuthUser = type === 'individual' 
      ? {
          id: '1',
          email,
          name: 'Demo User',
          type: 'individual',
          profile: {
            firstName: 'Demo',
            lastName: 'User',
            location: 'Istanbul, Turkey',
            bio: 'Software Developer looking for opportunities in Europe',
            linkedIn: 'linkedin.com/in/demouser',
            github: 'github.com/demouser'
          }
        }
      : {
          id: '1',
          email,
          name: 'Demo Company',
          type: 'company',
          profile: {
            description: 'Leading tech company in Europe',
            website: 'https://democompany.com',
            industry: 'Technology',
            size: '100-500',
            location: 'Amsterdam, Netherlands',
            culture: ['Remote Work', 'Work-Life Balance', 'Innovation'],
            techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
            benefits: ['Visa Sponsorship', 'Health Insurance', 'Stock Options']
          }
        };

    setUser(mockUser);
    localStorage.setItem('tunel_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const register = async (email: string, password: string, name: string, type: UserType) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user creation
    const newUser: AuthUser = type === 'individual'
      ? {
          id: crypto.randomUUID(),
          email,
          name,
          type: 'individual',
          profile: {
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1] || '',
            location: '',
            bio: ''
          }
        }
      : {
          id: crypto.randomUUID(),
          email,
          name,
          type: 'company',
          profile: {
            description: '',
            website: '',
            industry: '',
            size: '',
            location: ''
          }
        };

    setUser(newUser);
    localStorage.setItem('tunel_user', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
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