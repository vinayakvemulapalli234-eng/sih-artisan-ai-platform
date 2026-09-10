import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_BASE = 'http://127.0.0.1:8080';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kalakriti_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem('kalakriti_role') || 'artisan';
  });
  const [currentStep, setCurrentStep] = useState(() => {
    return localStorage.getItem('kalakriti_step') || 'splash';
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

  const buildIdentifierPayload = (identifier) => {
    const isEmail = identifier.includes('@');
    return isEmail ? { email: identifier } : { phone: identifier };
  };

  const registerUser = async (name, identifier, pin) => {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        ...buildIdentifierPayload(identifier),
        password: pin
      })
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Registration failed' };
    }
    return { success: true, name };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};

  const loginUser = async (identifier, pin) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...buildIdentifierPayload(identifier),
        password: pin
      })
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Login failed' };
    }

    localStorage.setItem('kalakriti_token', data.access_token);

    const newUser = {
      identifier: identifier,
      name: data.name || identifier,
      phone: data.phone,
      email: data.email,
      role: role
    };
    setUser(newUser);
    setCurrentStep('home');
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kalakriti_token');
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
        registerUser,
        loginUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);