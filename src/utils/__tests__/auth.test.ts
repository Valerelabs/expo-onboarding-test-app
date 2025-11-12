/**
 * Unit tests for authentication utilities
 */

import * as SecureStore from "expo-secure-store";
import {
  generateToken,
  validateToken,
  login,
  validateEmail,
  validatePassword,
  User,
  LoginCredentials,
} from "../auth";

// Mock expo-secure-store
jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe("Authentication Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("generateToken", () => {
    it("should generate a token with correct format", () => {
      const userId = "user123";
      const token = generateToken(userId);

      expect(token).toContain(userId);
      const parts = token.split(".");
      expect(parts.length).toBe(3);
      expect(parts[0]).toBe(userId);
    });

    it("should generate unique tokens for same user", () => {
      const userId = "user123";
      const token1 = generateToken(userId);
      const token2 = generateToken(userId);

      // Tokens should be different due to timestamp and random string
      expect(token1).not.toBe(token2);
    });

    it("should generate tokens with different user IDs", () => {
      const token1 = generateToken("user1");
      const token2 = generateToken("user2");

      expect(token1.split(".")[0]).toBe("user1");
      expect(token2.split(".")[0]).toBe("user2");
    });

    it("should include timestamp in token", () => {
      const userId = "user123";
      const beforeTime = Date.now();
      const token = generateToken(userId);
      const afterTime = Date.now();

      const parts = token.split(".");
      const timestamp = parseInt(parts[1], 10);

      expect(timestamp).toBeGreaterThanOrEqual(beforeTime);
      expect(timestamp).toBeLessThanOrEqual(afterTime);
    });
  });

  describe("validateToken", () => {
    it("should return false for empty token", async () => {
      const result = await validateToken("");
      expect(result).toBe(false);
    });

    it("should return false for null token", async () => {
      const result = await validateToken(null as any);
      expect(result).toBe(false);
    });

    it("should return false for token with incorrect format", async () => {
      const result = await validateToken("invalid-token");
      expect(result).toBe(false);
    });

    it("should return false for token with only one part", async () => {
      const result = await validateToken("user123");
      expect(result).toBe(false);
    });

    it("should return false for token with only two parts", async () => {
      const result = await validateToken("user123.timestamp");
      expect(result).toBe(false);
    });

    it("should return true for token with correct format", async () => {
      const token = generateToken("user123");
      const result = await validateToken(token);
      expect(result).toBe(true);
    });

    it("should return true for valid token format", async () => {
      const result = await validateToken("user123.1234567890.random");
      expect(result).toBe(true);
    });
  });

  describe("login", () => {
    const mockUsers: User[] = [
      {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        firstName: "Test",
        lastName: "User",
        password: "Password123!",
      },
      {
        id: "2",
        email: "another@example.com",
        name: "Another User",
        password: "SecurePass456!",
      },
    ];

    const mockGetUsers = jest.fn(() => mockUsers);

    beforeEach(() => {
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);
    });

    it("should successfully login with correct credentials", async () => {
      const credentials: LoginCredentials = {
        email: "test@example.com",
        password: "Password123!",
      };

      const loginPromise = login(credentials, mockGetUsers);

      // Fast-forward timers to skip the delay
      jest.advanceTimersByTime(1000);

      const result = await loginPromise;

      expect(result.token).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.id).toBe("1");
      expect(result.user.email).toBe("test@example.com");
      expect(result.user.password).toBeUndefined(); // Password should not be in returned user
      expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(2); // token and user
    });

    it("should throw error for invalid email", async () => {
      const credentials: LoginCredentials = {
        email: "wrong@example.com",
        password: "Password123!",
      };

      const loginPromise = login(credentials, mockGetUsers);
      jest.advanceTimersByTime(1000);

      await expect(loginPromise).rejects.toThrow("Invalid email or password");
    });

    it("should throw error for invalid password", async () => {
      const credentials: LoginCredentials = {
        email: "test@example.com",
        password: "WrongPassword",
      };

      const loginPromise = login(credentials, mockGetUsers);
      jest.advanceTimersByTime(1000);

      await expect(loginPromise).rejects.toThrow("Invalid email or password");
    });

    it("should be case-insensitive for email", async () => {
      const credentials: LoginCredentials = {
        email: "TEST@EXAMPLE.COM",
        password: "Password123!",
      };

      const loginPromise = login(credentials, mockGetUsers);
      jest.advanceTimersByTime(1000);

      const result = await loginPromise;
      expect(result.user.email).toBe("test@example.com");
    });

    it("should handle email with mixed case", async () => {
      const credentials: LoginCredentials = {
        email: "TeSt@ExAmPlE.CoM",
        password: "Password123!",
      };

      const loginPromise = login(credentials, mockGetUsers);
      jest.advanceTimersByTime(1000);

      const result = await loginPromise;
      expect(result.user.email).toBe("test@example.com");
    });

    it("should store token securely", async () => {
      const credentials: LoginCredentials = {
        email: "test@example.com",
        password: "Password123!",
      };

      const loginPromise = login(credentials, mockGetUsers);
      jest.advanceTimersByTime(1000);

      await loginPromise;

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "auth_token",
        expect.any(String)
      );
    });

    it("should store user data without password", async () => {
      const credentials: LoginCredentials = {
        email: "test@example.com",
        password: "Password123!",
      };

      const loginPromise = login(credentials, mockGetUsers);
      jest.advanceTimersByTime(1000);

      await loginPromise;

      const setItemCalls = (SecureStore.setItemAsync as jest.Mock).mock.calls;
      const userCall = setItemCalls.find((call) => call[0] === "user_data");

      expect(userCall).toBeDefined();
      const storedUser = JSON.parse(userCall[1]);
      expect(storedUser.password).toBeUndefined();
      expect(storedUser.id).toBe("1");
      expect(storedUser.email).toBe("test@example.com");
    });

    it("should handle login with user that has optional fields", async () => {
      const credentials: LoginCredentials = {
        email: "another@example.com",
        password: "SecurePass456!",
      };

      const loginPromise = login(credentials, mockGetUsers);
      jest.advanceTimersByTime(1000);

      const result = await loginPromise;
      expect(result.user.id).toBe("2");
      expect(result.user.firstName).toBeUndefined();
    });

    it("should simulate API delay", async () => {
      const credentials: LoginCredentials = {
        email: "test@example.com",
        password: "Password123!",
      };

      const loginPromise = login(credentials, mockGetUsers);

      // Should not complete before delay
      let completed = false;
      loginPromise.then(() => {
        completed = true;
      });

      jest.advanceTimersByTime(500);
      await Promise.resolve(); // Allow promises to settle
      expect(completed).toBe(false);

      jest.advanceTimersByTime(500);
      await loginPromise;
      expect(completed).toBe(true);
    });
  });

  describe("validateEmail (simple version)", () => {
    it("should return true for valid email", () => {
      expect(validateEmail("test@example.com")).toBe(true);
    });

    it("should return false for invalid email without @", () => {
      expect(validateEmail("testexample.com")).toBe(false);
    });

    it("should return false for invalid email without domain", () => {
      expect(validateEmail("test@")).toBe(false);
    });

    it("should return false for invalid email without TLD", () => {
      expect(validateEmail("test@example")).toBe(false);
    });

    it("should return true for email with subdomain", () => {
      expect(validateEmail("test@mail.example.com")).toBe(true);
    });

    it("should return true for email with plus sign", () => {
      expect(validateEmail("test+tag@example.com")).toBe(true);
    });

    it("should return false for email with spaces", () => {
      expect(validateEmail("test @example.com")).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(validateEmail("")).toBe(false);
    });
  });

  describe("validatePassword (simple version)", () => {
    it("should return true for password with 6 characters", () => {
      expect(validatePassword("Pass12")).toBe(true);
    });

    it("should return true for password with more than 6 characters", () => {
      expect(validatePassword("Password123!")).toBe(true);
    });

    it("should return false for password with less than 6 characters", () => {
      expect(validatePassword("Pass1")).toBe(false);
    });

    it("should return false for empty password", () => {
      expect(validatePassword("")).toBe(false);
    });

    it("should return true for password with exactly 6 characters", () => {
      expect(validatePassword("123456")).toBe(true);
    });

    it("should return false for password with 5 characters", () => {
      expect(validatePassword("12345")).toBe(false);
    });
  });
});
