import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, DEMO_ACCOUNTS } from '../lib/authService';
import { ROLES } from '../lib/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  // Sync state if user changes in another tab or storage
  useEffect(() => {
    const handleStorage = () => {
      setUser(authService.getCurrentUser());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = useCallback(async ({ identifier, password, role, securityCode }) => {
    setIsLoading(true);
    try {
      const authUser = await authService.login({ identifier, password, role, securityCode });
      setUser(authUser);
      return authUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email) => {
    return await authService.forgotPassword(email);
  }, []);

  const resetPassword = useCallback(async (payload) => {
    return await authService.resetPassword(payload);
  }, []);

  const value = {
    user,
    role: user?.role || ROLES.CUSTOMER,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    demoAccounts: DEMO_ACCOUNTS,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
