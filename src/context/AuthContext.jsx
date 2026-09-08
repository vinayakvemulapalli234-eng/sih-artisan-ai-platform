import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kalakriti_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('kalakriti_role') || 'artisan';
  });

  const [currentStep, setCurrentStep] = useState(() => {
    return localStorage.getItem('kalakriti_step') || 'splash'; // splash -> language -> role -> auth -> home
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kalakriti_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kalakriti_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('kalakriti_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('kalakriti_step', currentStep);
  }, [currentStep]);

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const loginWithPin = (phoneOrEmail, pin) => {
    const newUser = {
      id: 'user-' + Date.now(),
      identifier: phoneOrEmail,
      role: role,
      name: role === 'artisan' ? 'Govindappa V.' : (role === 'admin' ? 'Admin Coordinator' : 'Samyuktha R.'),
      state: 'Andhra Pradesh'
    };
    setUser(newUser);
    setCurrentStep('home');
    return true;
  };

  const logout = () => {
    setUser(null);
    setCurrentStep('role');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        currentStep,
        setCurrentStep,
        selectRole,
        loginWithPin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
