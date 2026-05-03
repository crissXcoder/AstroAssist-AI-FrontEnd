'use client';

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback 
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthUser, LoginPayload, RegisterPayload } from '@/shared/api/api-types';
import { AuthService } from '../services/auth.service';
import { setupInterceptors } from '@/shared/api/interceptors';
import { apiClient } from '@/shared/api/api-client';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Rutas que requieren autenticación.
 */
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings', '/checkout'];

/**
 * Proveedor global de autenticación.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      // Redirigir solo si estamos en una ruta protegida
      const isProtected = PROTECTED_ROUTES.some(route => pathname.includes(route));
      if (isProtected) {
        router.push('/');
      }
    }
  }, [pathname, router]);

  const refreshUser = useCallback(async () => {
    try {
      const response = await AuthService.getMe();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (payload: LoginPayload) => {
    const response = await AuthService.login(payload);
    setUser(response.data);
    router.push('/');
  };

  const register = async (payload: RegisterPayload) => {
    const response = await AuthService.register(payload);
    setUser(response.data);
    router.push('/');
  };

  // Inicializar interceptores y cargar usuario inicial
  useEffect(() => {
    setupInterceptors(apiClient, logout);
    refreshUser();
  }, [logout, refreshUser]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook para acceder al contexto de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
