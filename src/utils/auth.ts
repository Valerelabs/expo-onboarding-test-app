import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

// Dummy user database (in real app, this would be on backend)
const DUMMY_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
  },
  {
    id: "2",
    email: "test@example.com",
    password: "test123",
    name: "Test User",
  },
];

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Generate a dummy JWT-like token
const generateToken = (userId: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  return `${userId}.${timestamp}.${randomString}`;
};

// Store token securely
export const storeToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error storing token:", error);
    throw error;
  }
};

// Get stored token
export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// Remove token
export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
    throw error;
  }
};

// Store user data
export const storeUser = async (user: User): Promise<void> => {
  try {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error storing user:", error);
    throw error;
  }
};

// Get stored user
export const getUser = async (): Promise<User | null> => {
  try {
    const userData = await SecureStore.getItemAsync(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

// Login function (dummy authentication)
export const login = async (
  credentials: LoginCredentials
): Promise<{ token: string; user: User }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = DUMMY_USERS.find(
    (u) =>
      u.email.toLowerCase() === credentials.email.toLowerCase() &&
      u.password === credentials.password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);
  const userData: User = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  await storeToken(token);
  await storeUser(userData);

  return { token, user: userData };
};

// Validate token (dummy validation)
export const validateToken = async (token: string): Promise<boolean> => {
  // In a real app, this would validate with the backend
  // For now, we just check if token exists and has correct format
  if (!token) return false;
  const parts = token.split(".");
  return parts.length === 3;
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};
