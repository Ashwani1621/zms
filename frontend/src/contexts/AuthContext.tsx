"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
// Make sure your api file has functions to SET the token and user
import { 
    getAuthToken, 
    getUser, 
    setAuthToken, // Assumed to exist in your lib/api.ts
    setUser as apiSetUser, // Assumed to exist in your lib/api.ts
    logout as apiLogout 
} from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getAuthToken();
    const storedUser = getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    
    setIsLoading(false);
  }, []);

  
  const login = (newToken: string, newUser: User) => {
    
    setToken(newToken);
    setUser(newUser);
    
    
    setAuthToken(newToken); 
    apiSetUser(newUser);
  };

  const logout = () => {
    apiLogout();
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
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