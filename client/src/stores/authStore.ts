import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'restaurant';
}

export interface JWTPayload {
  email: string;
  role: 'customer' | 'restaurant';
  iat: number;
  exp?: number;
  userId?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string, role: 'customer' | 'restaurant') => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'customer' | 'restaurant') => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hydrate: () => void;
  
  // JWT utilities
  getTokenPayload: () => JWTPayload | null;
  isTokenExpired: () => boolean;
  getTokenInfo: () => { token: string; payload: JWTPayload; isExpired: boolean } | null;
}

// Mock authentication service with proper JWT generation
const mockAuth = {
  generateJWT: (email: string, role: 'customer' | 'restaurant', userId: string): string => {
    // Create header
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    // Create payload with expiration (7 days)
    const now = Math.floor(Date.now() / 1000);
    const payload: JWTPayload = {
      email,
      role,
      userId,
      iat: now,
      exp: now + 7 * 24 * 60 * 60, // 7 days from now
    };

    // Encode header and payload
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));

    // Create signature (mock - in production use real HMAC-SHA256)
    const signature = btoa(
      JSON.stringify({
        alg: 'HS256',
        signed_at: now,
        secret_hash: 'mock_secret_key_addis_eat',
      })
    );

    // Combine all parts
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  },

  decodeJWT: (token: string): JWTPayload | null => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (error) {
      return null;
    }
  },

  login: async (email: string, password: string, role: 'customer' | 'restaurant') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (password.length < 6) {
      throw new Error('Invalid credentials');
    }

    const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
    const token = mockAuth.generateJWT(email, role, userId);

    return {
      token,
      user: {
        id: userId,
        email,
        name: email.split('@')[0],
        role,
      },
    };
  },

  signup: async (email: string, password: string, name: string, role: 'customer' | 'restaurant') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }

    const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
    const token = mockAuth.generateJWT(email, role, userId);

    return {
      token,
      user: {
        id: userId,
        email,
        name,
        role,
      },
    };
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setToken: (token) => {
        if (token) {
          Cookies.set('auth_token', token, { expires: 7 });
        } else {
          Cookies.remove('auth_token');
        }
        set({ token });
      },

      login: async (email, password, role) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await mockAuth.login(email, password, role);
          set({ token, user, isAuthenticated: true, isLoading: false });
          Cookies.set('auth_token', token, { expires: 7 });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      signup: async (email, password, name, role) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await mockAuth.signup(email, password, name, role);
          set({ token, user, isAuthenticated: true, isLoading: false });
          Cookies.set('auth_token', token, { expires: 7 });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Signup failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      logout: () => {
        Cookies.remove('auth_token');
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),

      hydrate: () => {
        const token = Cookies.get('auth_token');
        if (token) {
          set({ token, isAuthenticated: true });
        }
      },

      // JWT Utilities
      getTokenPayload: () => {
        const token = get().token;
        if (!token) return null;
        return mockAuth.decodeJWT(token);
      },

      isTokenExpired: () => {
        const payload = get().getTokenPayload();
        if (!payload || !payload.exp) return false;
        return Math.floor(Date.now() / 1000) > payload.exp;
      },

      getTokenInfo: () => {
        const token = get().token;
        if (!token) return null;

        const payload = mockAuth.decodeJWT(token);
        if (!payload) return null;

        return {
          token,
          payload,
          isExpired: get().isTokenExpired(),
        };
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
