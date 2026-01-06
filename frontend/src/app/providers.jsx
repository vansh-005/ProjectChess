import React, { createContext, useContext, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

// Auth Context
const AuthContext = createContext(null);

// Mock user for demonstration
const mockUser = {
  id: '1',
  username: 'ChessMaster2024',
  email: 'chessmaster@example.com',
  rating: 2450,
  title: 'GM',
  country: 'US',
  avatar: null,
  subscriptions: []
};

export const AuthProvider = ({ children }) => {
  // Mock authentication - stored in localStorage
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (mock)
    const storedUser = localStorage.getItem('chess_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    // TODO: Replace with actual API call
    // const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
    //   method: 'POST',
    //   body: JSON.stringify(credentials)
    // });
    
    // Mock login
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('chess_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    // TODO: Replace with actual API call
    localStorage.removeItem('chess_user');
    setUser(null);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('chess_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
};
