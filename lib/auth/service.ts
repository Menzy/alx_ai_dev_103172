// Authentication service functions
import { LoginFormData, RegisterFormData } from "@/lib/validations/auth";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

// Mock authentication service - replace with actual API calls
export const authService = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - replace with actual authentication
    if (data.email === "demo@example.com" && data.password === "password123") {
      return {
        success: true,
        user: {
          id: "1",
          email: data.email,
          name: "Demo User",
          createdAt: new Date(),
        },
        token: "mock-jwt-token",
      };
    }
    
    return {
      success: false,
      message: "Invalid email or password",
    };
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration - replace with actual API call
    return {
      success: true,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
        createdAt: new Date(),
      },
      token: "mock-jwt-token",
    };
  },

  async logout(): Promise<void> {
    // Clear local storage, cookies, etc.
    localStorage.removeItem("auth-token");
  },

  async getCurrentUser(): Promise<User | null> {
    // Check for valid token and return user data
    const token = localStorage.getItem("auth-token");
    if (!token) return null;
    
    // Mock user data - replace with actual API call
    return {
      id: "1",
      email: "demo@example.com",
      name: "Demo User",
      createdAt: new Date(),
    };
  },
};