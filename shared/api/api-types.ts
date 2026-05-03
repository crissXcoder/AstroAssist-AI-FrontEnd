/**
 * Estructura estándar de respuesta del servidor.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

/**
 * Estructura estándar de error del servidor.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  error: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  timestamp: string;
  path: string;
}

/**
 * Tipos de Auth
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  isEmailVerified: boolean;
  avatarUrl?: string;
}

export interface Session {
  id: string;
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface LoginResponse {
  user: AuthUser;
  // Tokens se manejan via cookies httpOnly, pero el backend podría retornar info básica
}

export interface RegisterPayload {
  email: string;
  password?: string; // Opcional si es OAuth, pero aquí asumimos local
  name: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}
