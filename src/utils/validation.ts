/**
 * Reusable validation utilities for form inputs
 */

// Email validation
export const validateEmail = (email: string): { isValid: boolean; error: string } => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true, error: '' };
};

// Password validation - Best practices: min 8 chars, uppercase, lowercase, number, special char
export const validatePassword = (password: string): { isValid: boolean; error: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }

  return { isValid: true, error: '' };
};

// Confirm password validation
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): { isValid: boolean; error: string } => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true, error: '' };
};

// First name validation
export const validateFirstName = (firstName: string): { isValid: boolean; error: string } => {
  if (!firstName.trim()) {
    return { isValid: false, error: 'First name is required' };
  }

  if (firstName.trim().length < 2) {
    return { isValid: false, error: 'First name must be at least 2 characters' };
  }

  if (!/^[a-zA-Z\s-']+$/.test(firstName)) {
    return { isValid: false, error: 'First name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { isValid: true, error: '' };
};

// Last name validation
export const validateLastName = (lastName: string): { isValid: boolean; error: string } => {
  if (!lastName.trim()) {
    return { isValid: false, error: 'Last name is required' };
  }

  if (lastName.trim().length < 2) {
    return { isValid: false, error: 'Last name must be at least 2 characters' };
  }

  if (!/^[a-zA-Z\s-']+$/.test(lastName)) {
    return { isValid: false, error: 'Last name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { isValid: true, error: '' };
};

// Phone number validation (E.164 format without country code, 4-15 digits)
export const validatePhoneNumber = (phoneNumber: string): { isValid: boolean; error: string } => {
  if (!phoneNumber.trim()) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  if (digitsOnly.length < 4) {
    return { isValid: false, error: 'Phone number is too short' };
  }

  if (digitsOnly.length > 15) {
    return { isValid: false, error: 'Phone number is too long' };
  }

  return { isValid: true, error: '' };
};

// Get password strength indicator
export const getPasswordStrength = (password: string): {
  strength: 'weak' | 'medium' | 'strong';
  score: number;
} => {
  let score = 0;

  if (!password) return { strength: 'weak', score: 0 };

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  if (score <= 2) return { strength: 'weak', score };
  if (score <= 4) return { strength: 'medium', score };
  return { strength: 'strong', score };
};

