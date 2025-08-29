// Validation schemas for authentication forms
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateLoginForm = (data: LoginFormData): string[] => {
  const errors: string[] = [];
  
  if (!data.email.trim()) {
    errors.push("Email is required");
  } else if (!validateEmail(data.email)) {
    errors.push("Please enter a valid email address");
  }
  
  if (!data.password.trim()) {
    errors.push("Password is required");
  }
  
  return errors;
};

export const validateRegisterForm = (data: RegisterFormData): string[] => {
  const errors: string[] = [];
  
  if (!data.name.trim()) {
    errors.push("Full name is required");
  }
  
  if (!data.email.trim()) {
    errors.push("Email is required");
  } else if (!validateEmail(data.email)) {
    errors.push("Please enter a valid email address");
  }
  
  if (!data.password.trim()) {
    errors.push("Password is required");
  } else if (!validatePassword(data.password)) {
    errors.push("Password must be at least 8 characters with uppercase, lowercase, and number");
  }
  
  if (data.password !== data.confirmPassword) {
    errors.push("Passwords do not match");
  }
  
  return errors;
};