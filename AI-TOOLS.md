# AI Tools Used in Development

This document provides transparency about the AI tools used during the development of this React Native authentication demo app, as required by the test job specifications.

## Overview

This project was developed with effective use of AI tools to speed up delivery without sacrificing quality was a key evaluation criterion. The following AI tools were strategically employed throughout the development lifecycle.

---

## AI Tools Used

### 1. Cursor AI (Primary Development Assistant)

**Selection Criteria:**

- **Code-aware context**: Deep understanding of the entire codebase, not just single files
- **Multi-file editing**: Ability to make coordinated changes across multiple files simultaneously
- **IDE integration**: Seamless integration with the development environment
- **TypeScript support**: Strong understanding of TypeScript types and React Native patterns
- **Error detection**: Real-time identification of issues before runtime

**How It Was Used:**

1. **Initial Project Setup**

   - Manually setup project using a starter template provided by Expo.

2. **Component Development**

   - Generated reusable components (Button, TextInput, CountryCodePicker) with proper TypeScript interfaces
   - Implemented validation logic with real-time error feedback
   - Created accessible components with proper ARIA labels and keyboard handling

3. **Authentication Flow**

   - Implemented secure token storage using Expo SecureStore
   - Created authentication context with session persistence
   - Generated token validation and generation logic

4. **State Management**

   - Setup Zustand store and persistance using MMKV manually then prompting Cursor to use the provided structure.

5. **Validation Logic**

   - Generated comprehensive validation functions for all form fields
   - Implemented password strength calculation
   - Created validation rules matching the requirements (email format, password complexity, phone number validation)

6. **Testing**

   - Generated unit test files with comprehensive test cases
   - Created test utilities and mocks for SecureStore
   - Implemented edge case testing for validation functions

7. **Documentation**
   - Generated comprehensive README with architecture documentation
   - Created detailed validation rules documentation
   - Documented security approach and trade-offs

## Key Prompts

**Prompt**:
Add a login screen with email/password fields and a dummy auth flow.
On login, generate a dummy token and store it in Expo SecureStore.
If token exists → go to main tabs; else → show login.
Use a clean, minimal UI with reusable button and input components.
After login, show only Home and Profile tabs.
Use Expo + React Navigation (Tabs + Stack) and keep the code modular.

**Prompt**:
Add a Sign Up screen with fields: first name, last name, email, password, phone number.
Include a country code picker using callingCode.json with a React Native modal and search.
Add form validation with proper error messages (best practices).
Create reusable validation functions in utils/.
After signup, save user data to @appStore.ts under the users array.
On login, authenticate from this users array.
Ensure the code is clean, modular, and readable.
Persist partially filled form data in the store so values are pre-filled when the app restarts.

**Prompt**:
Track the number of failed login attempts.
After 5 failed attempts to login, prompt the user for biometric authentication using the expo-local-authentication package.
On successful biometric auth, allow the user to log in.
Keep the implementation clean, modular, and readable.

**Prompt**:
Write unit tests for validation and authentication logic using @testing-library/react-native and jest.
Cover edge cases and expected behaviors.
Keep tests clean, organized, and easy to maintain.
