import { User, Session, AuthError } from '@supabase/supabase-js'

export type AuthUser = User

export type AuthSession = Session

export interface AuthState {
  user: AuthUser | null
  session: AuthSession | null
  loading: boolean
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, options?: { data?: object }) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}