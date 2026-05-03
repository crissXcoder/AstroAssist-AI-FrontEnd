'use client';

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback,
  useMemo
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthUser, LoginPayload, RegisterPayload } from '@/shared/api/api-types';
import { AuthService } from '../services/auth.service';
import { setupInterceptors } from '@/shared/api/interceptors';
import { apiClient } from '@/shared/api/api-client';

export type AuthStatus = 'idle' | 'checking' | 'authenticated' | 'guest';

interface AuthContextType {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: (options?: { localOnly?: boolean }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_CHANNEL_NAME = 'astroassist_auth_channel';
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings', '/checkout', '/admin'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('idle');
  const router = useRouter();
  const pathname = usePathname();

  // ── Sincronización Cross-Tab ──────────────────────────────────────────
  const authChannel = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new BroadcastChannel(AUTH_CHANNEL_NAME);
  }, []);

  const logout = useCallback(async (options?: { localOnly?: boolean }) => {
    if (status === 'guest') return;

    try {
      if (!options?.localOnly) {
        await AuthService.logout();
        authChannel?.postMessage({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setStatus('guest');
      
      const isProtected = PROTECTED_ROUTES.some(route => pathname.includes(route));
      if (isProtected) {
        router.push('/');
      }
    }
  }, [authChannel, pathname, router, status]);

  const refreshUser = useCallback(async () => {
    setStatus('checking');
    try {
      const response = await AuthService.getMe();
      setUser(response.data);
      setStatus('authenticated');
    } catch (error) {
      setUser(null);
      setStatus('guest');
    }
  }, []);

  const login = async (payload: LoginPayload) => {
    const response = await AuthService.login(payload);
    setUser(response.data);
    setStatus('authenticated');
    authChannel?.postMessage({ type: 'LOGIN' });
    router.push('/');
  };

  const register = async (payload: RegisterPayload) => {
    const response = await AuthService.register(payload);
    setUser(response.data);
    setStatus('authenticated');
    authChannel?.postMessage({ type: 'LOGIN' });
    router.push('/');
  };

  // ── SSE: Eventos de Seguridad ─────────────────────────────────────────
  useEffect(() => {
    if (status !== 'authenticated' || !user) return;

    const streamUrl = `${apiClient.defaults.baseURL}/sessions/stream`;
    const eventSource = new EventSource(streamUrl, { withCredentials: true });

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'FORCE_LOGOUT' || data.type === 'SESSION_REVOKED') {
          console.warn(`⚠️ [Auth] Sesión invalidada por el servidor: ${data.type}`);
          logout({ localOnly: true });
        }
      } catch (err) {
        console.error('Error parsing SSE message:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [status, user, logout]);

  // ── Inicialización ──────────────────────────────────────────────────
  useEffect(() => {
    setupInterceptors(apiClient, logout);
    refreshUser();

    if (authChannel) {
      authChannel.onmessage = (event) => {
        if (event.data.type === 'LOGOUT') {
          logout({ localOnly: true });
        } else if (event.data.type === 'LOGIN') {
          refreshUser();
        }
      };
    }

    return () => {
      authChannel?.close();
    };
  }, [logout, refreshUser, authChannel]);

  const value = useMemo(() => ({
    user,
    status,
    isAuthenticated: status === 'authenticated',
    isAdmin: user?.role === 'ADMIN',
    isCustomer: user?.role === 'USER',
    login,
    register,
    logout,
    refreshUser,
  }), [user, status, logout, refreshUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
