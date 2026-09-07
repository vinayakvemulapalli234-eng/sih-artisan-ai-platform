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
const REGISTERED_USERS_KEY = 'kalakriti_registered_users';

export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRegisteredUser(user) {
  try {
    const existing = getRegisteredUsers();
    const filtered = existing.filter(
      (u) => u.email?.toLowerCase() !== user.email?.toLowerCase() && u.id !== user.id
    );
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([user, ...filtered]));
  } catch (err) {
    console.error('Failed to persist user in registry', err);
  }
}

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
const simulateNetwork = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

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
   * Strictly resolves real registered user profile or demo account
   */
  async login({ identifier, password, role = ROLES.CUSTOMER, securityCode }) {
    await simulateNetwork();

    if (!identifier || !password) {
      throw new Error('Please provide both your identifier and password.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    if (role === ROLES.ADMIN && securityCode && securityCode !== 'ADMIN2026' && securityCode !== 'SIH2026') {
      throw new Error('Invalid Administrative Security Token.');
    }

    const cleanId = identifier.trim().toLowerCase();
    const demoUser = DEMO_ACCOUNTS[role];

    // 1. Check if user exists in the persistent registered user registry
    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find(
      (u) =>
        (u.email?.toLowerCase() === cleanId || u.phone === identifier.trim()) &&
        (u.role === role || !u.role)
    );

    let authenticatedUser = null;

    if (foundUser) {
      // Use real registered profile data
      authenticatedUser = {
        ...foundUser,
        role: foundUser.role || role,
        token: `jwt_token_${Date.now()}`,
        loginAt: new Date().toISOString(),
      };
    } else {
      // 2. Check if explicitly logging in as the demo account
      const isDemoExplicit =
        cleanId === demoUser?.email?.toLowerCase() ||
        identifier.trim() === demoUser?.phone ||
        cleanId.includes('demo') ||
        cleanId.includes('test');

      if (isDemoExplicit && demoUser) {
        authenticatedUser = {
          ...demoUser,
          token: `demo_jwt_token_${Date.now()}`,
          loginAt: new Date().toISOString(),
        };
      } else {
        // 3. New non-demo user logging in directly — derive their real name from identifier
        const formattedName = identifier.includes('@')
          ? identifier
              .split('@')[0]
              .replace(/[._-]/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase())
          : identifier;

        authenticatedUser = {
          id: `usr-${Date.now()}`,
          name: formattedName,
          email: identifier.includes('@') ? identifier.trim() : `${identifier.trim()}@kalakriti.in`,
          phone: identifier.startsWith('+') || /^\d+$/.test(identifier) ? identifier.trim() : '',
          role,
          token: `jwt_token_${Date.now()}`,
          loginAt: new Date().toISOString(),
        };

        // Persist to registry so future logins recall this exact profile
        saveRegisteredUser(authenticatedUser);
      }
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authenticatedUser));
    return authenticatedUser;
  }

  /**
   * Register a new Customer or Artisan
   * Persists to persistent user registry so name & details flow end-to-end
   */
  async register(userData) {
    await simulateNetwork(500);

    const { name, email, phone, role = ROLES.CUSTOMER, password } = userData;

    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      role,
      ...userData,
      token: `jwt_token_${Date.now()}`,
      loginAt: new Date().toISOString(),
    };

    // Save to user registry AND active session
    saveRegisteredUser(newUser);
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

  /**
   * Update active user profile and persist changes to registry & session
   */
  updateUserProfile(updatedData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const merged = {
      ...currentUser,
      ...updatedData,
    };

    saveRegisteredUser(merged);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }
}

export const authService = new AuthService();
