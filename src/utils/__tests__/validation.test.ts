/**
 * Unit tests for validation utilities
 */

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  getPasswordStrength,
} from "../validation";

describe("Validation Utilities", () => {
  describe("validateEmail", () => {
    it("should return valid for a correct email address", () => {
      const result = validateEmail("test@example.com");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return invalid for empty email", () => {
      const result = validateEmail("");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Email is required");
    });

    it("should return invalid for email with only whitespace", () => {
      const result = validateEmail("   ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Email is required");
    });

    it("should return invalid for email without @ symbol", () => {
      const result = validateEmail("testexample.com");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Please enter a valid email address");
    });

    it("should return invalid for email without domain", () => {
      const result = validateEmail("test@");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Please enter a valid email address");
    });

    it("should return invalid for email without TLD", () => {
      const result = validateEmail("test@example");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Please enter a valid email address");
    });

    it("should return invalid for email with spaces", () => {
      const result = validateEmail("test @example.com");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Please enter a valid email address");
    });

    it("should return valid for email with subdomain", () => {
      const result = validateEmail("test@mail.example.com");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for email with plus sign", () => {
      const result = validateEmail("test+tag@example.com");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for email with numbers", () => {
      const result = validateEmail("test123@example.com");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });
  });

  describe("validatePassword", () => {
    it("should return invalid for empty password", () => {
      const result = validatePassword("");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Password is required");
    });

    it("should return invalid for password shorter than 8 characters", () => {
      const result = validatePassword("Pass1!");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Password must be at least 8 characters");
    });

    it("should return invalid for password without lowercase letter", () => {
      const result = validatePassword("PASSWORD123!");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "Password must contain at least one lowercase letter"
      );
    });

    it("should return invalid for password without uppercase letter", () => {
      const result = validatePassword("password123!");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "Password must contain at least one uppercase letter"
      );
    });

    it("should return invalid for password without number", () => {
      const result = validatePassword("Password!");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Password must contain at least one number");
    });

    it("should return invalid for password without special character", () => {
      const result = validatePassword("Password123");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "Password must contain at least one special character"
      );
    });

    it("should return valid for password meeting all requirements", () => {
      const result = validatePassword("Password123!");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for password with different special characters", () => {
      const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        ",",
        ".",
        "?",
        '"',
        ":",
        "{",
        "}",
        "|",
        "<",
        ">",
      ];
      specialChars.forEach((char) => {
        const result = validatePassword(`Password123${char}`);
        expect(result.isValid).toBe(true);
        expect(result.error).toBe("");
      });
    });

    it("should return valid for longer password meeting all requirements", () => {
      const result = validatePassword("MySecurePassword123!@#");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });
  });

  describe("validateConfirmPassword", () => {
    it("should return invalid for empty confirm password", () => {
      const result = validateConfirmPassword("Password123!", "");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Please confirm your password");
    });

    it("should return invalid when passwords do not match", () => {
      const result = validateConfirmPassword("Password123!", "Password456!");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Passwords do not match");
    });

    it("should return valid when passwords match", () => {
      const result = validateConfirmPassword("Password123!", "Password123!");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return invalid for case-sensitive mismatch", () => {
      const result = validateConfirmPassword("Password123!", "password123!");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Passwords do not match");
    });

    it("should return invalid for whitespace mismatch", () => {
      const result = validateConfirmPassword("Password123!", "Password123! ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Passwords do not match");
    });
  });

  describe("validateFirstName", () => {
    it("should return invalid for empty first name", () => {
      const result = validateFirstName("");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("First name is required");
    });

    it("should return invalid for first name with only whitespace", () => {
      const result = validateFirstName("   ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("First name is required");
    });

    it("should return invalid for first name shorter than 2 characters", () => {
      const result = validateFirstName("A");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("First name must be at least 2 characters");
    });

    it("should return invalid for first name with numbers", () => {
      const result = validateFirstName("John123");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "First name can only contain letters, spaces, hyphens, and apostrophes"
      );
    });

    it("should return invalid for first name with special characters", () => {
      const result = validateFirstName("John@Doe");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "First name can only contain letters, spaces, hyphens, and apostrophes"
      );
    });

    it("should return valid for simple first name", () => {
      const result = validateFirstName("John");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for first name with space", () => {
      const result = validateFirstName("Mary Jane");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for first name with hyphen", () => {
      const result = validateFirstName("Mary-Jane");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for first name with apostrophe", () => {
      const result = validateFirstName("O'Brien");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for first name with multiple words", () => {
      const result = validateFirstName("Mary Jane Watson");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should trim whitespace before validation", () => {
      const result = validateFirstName("  John  ");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });
  });

  describe("validateLastName", () => {
    it("should return invalid for empty last name", () => {
      const result = validateLastName("");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Last name is required");
    });

    it("should return invalid for last name with only whitespace", () => {
      const result = validateLastName("   ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Last name is required");
    });

    it("should return invalid for last name shorter than 2 characters", () => {
      const result = validateLastName("D");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Last name must be at least 2 characters");
    });

    it("should return invalid for last name with numbers", () => {
      const result = validateLastName("Doe123");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "Last name can only contain letters, spaces, hyphens, and apostrophes"
      );
    });

    it("should return invalid for last name with special characters", () => {
      const result = validateLastName("Doe@Smith");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "Last name can only contain letters, spaces, hyphens, and apostrophes"
      );
    });

    it("should return valid for simple last name", () => {
      const result = validateLastName("Doe");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for last name with space", () => {
      const result = validateLastName("Van Der Berg");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for last name with hyphen", () => {
      const result = validateLastName("Smith-Jones");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for last name with apostrophe", () => {
      const result = validateLastName("O'Connor");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should trim whitespace before validation", () => {
      const result = validateLastName("  Doe  ");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });
  });

  describe("validatePhoneNumber", () => {
    it("should return invalid for empty phone number", () => {
      const result = validatePhoneNumber("");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Phone number is required");
    });

    it("should return invalid for phone number with only whitespace", () => {
      const result = validatePhoneNumber("   ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Phone number is required");
    });

    it("should return invalid for phone number shorter than 4 digits", () => {
      const result = validatePhoneNumber("123");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Phone number is too short");
    });

    it("should return invalid for phone number longer than 15 digits", () => {
      const result = validatePhoneNumber("1234567890123456");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Phone number is too long");
    });

    it("should return valid for phone number with exactly 4 digits", () => {
      const result = validatePhoneNumber("1234");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for phone number with exactly 15 digits", () => {
      const result = validatePhoneNumber("123456789012345");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should return valid for phone number with 10 digits", () => {
      const result = validatePhoneNumber("1234567890");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should strip non-digit characters before validation", () => {
      const result = validatePhoneNumber("(123) 456-7890");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should strip spaces and dashes before validation", () => {
      const result = validatePhoneNumber("123-456-7890");
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });

    it("should handle phone number with country code format", () => {
      const result = validatePhoneNumber("+1-234-567-8901");
      // After stripping non-digits, this becomes 12345678901 (11 digits)
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });
  });

  describe("getPasswordStrength", () => {
    it("should return weak for empty password", () => {
      const result = getPasswordStrength("");
      expect(result.strength).toBe("weak");
      expect(result.score).toBe(0);
    });

    it("should return weak for very short password", () => {
      const result = getPasswordStrength("pass1");
      expect(result.strength).toBe("weak");
      expect(result.score).toBeLessThanOrEqual(2);
    });

    it("should return weak for password with only lowercase", () => {
      const result = getPasswordStrength("password");
      expect(result.strength).toBe("weak");
      expect(result.score).toBeLessThanOrEqual(2);
    });

    it("should return medium for password with length >= 8 and some variety", () => {
      const result = getPasswordStrength("Password1");
      expect(result.strength).toBe("medium");
      expect(result.score).toBeGreaterThan(2);
      expect(result.score).toBeLessThanOrEqual(4);
    });

    it("should return strong for password with all requirements", () => {
      const result = getPasswordStrength("Password123!");
      expect(result.strength).toBe("strong");
      expect(result.score).toBeGreaterThan(4);
    });

    it("should return strong for long password with all requirements", () => {
      const result = getPasswordStrength("MySecurePassword123!@#");
      expect(result.strength).toBe("strong");
      expect(result.score).toBeGreaterThan(4);
    });

    it("should increase score for longer passwords", () => {
      const shortResult = getPasswordStrength("Pass123!");
      const longResult = getPasswordStrength("VeryLongPassword123!");

      expect(longResult.score).toBeGreaterThan(shortResult.score);
    });

    it("should calculate score based on character variety", () => {
      const result = getPasswordStrength("Password123!");
      // Should have: length >= 8 (1), length >= 12 (0), lowercase (1), uppercase (1), number (1), special (1) = 5
      expect(result.score).toBeGreaterThanOrEqual(5);
    });

    it("should return medium for password with 4 criteria met", () => {
      const result = getPasswordStrength("Password12");
      // Has: length >= 8 (1), lowercase (1), uppercase (1), number (1) = 4
      expect(result.strength).toBe("medium");
      expect(result.score).toBe(4);
    });

    it("should return strong for password with 5+ criteria met", () => {
      const result = getPasswordStrength("Password123!");
      // Has: length >= 8 (1), lowercase (1), uppercase (1), number (1), special (1) = 5
      expect(result.strength).toBe("strong");
      expect(result.score).toBeGreaterThanOrEqual(5);
    });
  });
});
