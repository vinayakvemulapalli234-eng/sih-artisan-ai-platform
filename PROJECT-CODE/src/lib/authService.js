/**
 * SIH Artisan Project — Mock Authentication Service
 * 
 * TODO: integrate with backend
 * Person 3 (Backend/API) will replace these mock service methods
 * with real Axios/fetch calls to `/api/v1/auth/*` endpoints.
 * 
 * This service provides mock authentication, session persistence in localStorage,
 * and pre-seeded demo credentials for SIH evaluations.
 */

import { ROLES } from './constants';

const SESSION_STORAGE_KEY = 'kalakriti_mock_session';

// Pre-seeded demo accounts for quick testing & SIH evaluation
export const DEMO_ACCOUNTS = {
  [ROLES.CUSTOMER]: {
    id: 'usr-customer-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98450 12345',
    role: ROLES.CUSTOMER,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
    title: 'Heritage Craft Collector',
  },
  [ROLES.ARTISAN]: {
    id: 'artisan-1',
    name: 'Govindappa V.',
    email: 'govindappa.v@kalakriti.in',
    phone: '+91 94401 23456',
    role: ROLES.ARTISAN,
    specialty: 'Kalamkari Hand Painting',
    region: 'Srikalahasti, Andhra Pradesh',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    studioName: 'Govindappa Kalamkari Heritage Studio',
  },
  [ROLES.ADMIN]: {
    id: 'usr-admin-1',
    name: 'Admin Officer',
    email: 'admin@kalakriti.in',
    role: ROLES.ADMIN,
    staffId: 'GOV-IND-8940',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    department: 'National Craft Board Oversight',
  },
};

// Simulated asynchronous network latency
const simulateNetwork = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

class AuthService {
  /**
   * Get the currently logged-in user from session storage
   * @returns {Object|null}
   */
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  /**
   * Check if a user is currently authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return Boolean(this.getCurrentUser());
  }

  /**
   * Login user with credentials and role
   * TODO: integrate with backend -> POST /api/v1/auth/login
   */
  async login({ identifier, password, role = ROLES.CUSTOMER, securityCode }) {
    await simulateNetwork();

    if (!identifier || !password) {
      throw new Error('Please provide both your identifier and password.');
    }

    // Role-specific credential validation
    const demoUser = DEMO_ACCOUNTS[role];
    const isIdentifierMatch =
      identifier.toLowerCase() === demoUser.email.toLowerCase() ||
      (demoUser.phone && identifier === demoUser.phone) ||
      identifier.toLowerCase().includes('demo') ||
      identifier.toLowerCase().includes('test');

    // For demo purposes, allow demo passwords or any password >= 6 characters
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    if (role === ROLES.ADMIN && securityCode && securityCode !== 'ADMIN2026' && securityCode !== 'SIH2026') {
      throw new Error('Invalid Administrative Security Token.');
    }

    // Return authenticated user profile with simulated token
    const authenticatedUser = {
      ...(demoUser || {
        id: `usr-${Date.now()}`,
        name: identifier.split('@')[0],
        email: identifier,
        role,
      }),
      token: `mock_jwt_token_${Date.now()}`,
      loginAt: new Date().toISOString(),
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authenticatedUser));
    return authenticatedUser;
  }

  /**
   * Register a new Customer or Artisan
   * TODO: integrate with backend -> POST /api/v1/auth/register
   */
  async register(userData) {
    await simulateNetwork(600);

    const { name, email, phone, role = ROLES.CUSTOMER, password } = userData;

    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role,
      ...userData,
      token: `mock_jwt_token_${Date.now()}`,
      loginAt: new Date().toISOString(),
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  }

  /**
   * Terminate active session
   * TODO: integrate with backend -> POST /api/v1/auth/logout
   */
  async logout() {
    await simulateNetwork(200);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return true;
  }

  /**
   * Request password reset link / OTP
   * TODO: integrate with backend -> POST /api/v1/auth/forgot-password
   */
  async forgotPassword(email) {
    await simulateNetwork(500);
    if (!email || !email.includes('@')) {
      throw new Error('Please provide a valid registered email address.');
    }
    return {
      success: true,
      message: `Password reset instructions have been sent to ${email}.`,
    };
  }

  /**
   * Set new password with confirmation token
   * TODO: integrate with backend -> POST /api/v1/auth/reset-password
   */
  async resetPassword({ newPassword, confirmPassword }) {
    await simulateNetwork(500);
    if (!newPassword || newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }
    return {
      success: true,
      message: 'Your password has been reset successfully.',
    };
  }
}

export const authService = new AuthService();
