# TestApp - React Native Authentication Demo

A React Native application with authentication flow, secure token storage, and a beautiful minimal UI.

## Features

- ✨ Beautiful, minimal, and intuitive UI
- 🔐 Secure authentication with token stored in Expo SecureStore
- 📝 Complete registration flow with comprehensive validation
- 🌍 Country code picker with search functionality
- 📱 Tab navigation with Home and Profile screens
- 🎨 Dark mode support
- 🔄 Session persistence across app restarts
- 🚪 Logout functionality with confirmation
- ✅ Form validation with real-time error messages
- 💪 Password strength indicator
- 📦 Persistent user storage with Zustand

## Prerequisites

- **Node.js**: v20.19.4 or higher (recommended)
- **Package Manager**: npm or yarn
- **Expo CLI**: Installed globally (`npm install -g expo-cli`) or use npx
- **Development Environment**:
  - iOS: Xcode (for iOS Simulator) or physical iOS device
  - Android: Android Studio with Android SDK (for Android Emulator) or physical Android device
  - Web: Any modern browser

## Setup Instructions

### Prequisite

Setup the development environment by following the step from expo documentation:
https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local

### 1. Clone the Repository

```bash
git clone https://github.com/Valerelabs/expo-onboarding-test-app.git
cd TestApp
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- React Native and Expo SDK
- React Navigation
- Zustand for state management
- MMKV for fast storage
- Expo SecureStore for secure credential storage
- Testing libraries (Jest, React Native Testing Library)

### 3. EXPO Prebuild

Run the prebuild command after npm install

```bash
npx expo prebuild --clean
```

### 4. Android Setup

For Android development, ensure you have:

- Android Studio installed
- Android SDK configured
- Android emulator set up or physical device connected with USB debugging enabled

## Running the App

### Development Server

Start the Expo development server:

```bash
npm start
```

This will:

- Start the Metro bundler
- Open Expo DevTools in your browser
- Display a QR code for Expo Go app (if using)
- Provide options to open on iOS/Android/Web

### Run on iOS Simulator

```bash
npm run ios
```

**Note**: Requires macOS with Xcode installed. The command will:

- Build the iOS app
- Launch iOS Simulator
- Install and run the app

### Run on Android Emulator

```bash
npm run android
```

**Prerequisites**:

- Android Studio installed
- Android emulator running or physical device connected
- The command will build and install the app on the connected device/emulator

### Run on Web

```bash
npm run web
```

Opens the app in your default web browser. Note: Some features like SecureStore and biometric authentication are not available on web.

### Testing

Run unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate test coverage report:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory.

## Demo Credentials

You can either **create a new account** using the Sign Up screen or use these pre-existing demo accounts:

**User 1:**

- Email: `demo@example.com`
- Password: `Demo@123`

**User 2:**

- Email: `test@example.com`
- Password: `Test@123`

## Project Structure

```
src/
├── components/               # Reusable UI components
│   ├── Button.tsx           # Custom button component
│   ├── TextInput.tsx        # Custom text input with validation
│   ├── ProfileIcon.tsx      # Profile icon for tab bar
│   ├── CountryCodePicker.tsx # Country code picker with search
│   └── index.ts             # Component exports
├── context/                 # React Context providers
│   └── AuthContext.tsx      # Authentication state management
├── navigation/              # Navigation configuration
│   ├── RootNavigator.tsx    # Main navigation setup
│   ├── screens/             # Screen components
│   │   ├── Login.tsx        # Login screen
│   │   ├── SignUp.tsx       # Registration screen
│   │   ├── Home.tsx         # Home screen
│   │   ├── Profile.tsx      # Profile screen with user details
│   │   └── NotFound.tsx     # 404 screen
│   └── index.tsx            # Navigation exports
├── stores/                  # State management stores
│   └── appStore.ts          # Zustand store for users
├── utils/                   # Utility functions
│   ├── auth.ts              # Authentication utilities
│   ├── validation.ts        # Reusable validation functions
│   ├── callingCodes.json    # Country calling codes data
│   └── zustandStorage.ts    # MMKV storage adapter
├── assets/                  # Images and static assets
└── App.tsx                 # Root component
```

## Architecture

### High-Level Overview

The app follows a **component-based architecture** with clear separation of concerns:

- **Presentation Layer**: React Native components and screens
- **State Management**: React Context API (AuthContext) + Zustand (user data)
- **Storage Layer**: Expo SecureStore (credentials) + MMKV (user data persistence)
- **Business Logic**: Utility functions for validation and authentication
- **Navigation**: React Navigation with stack and tab navigators

### Authentication Flow

#### Sign Up Flow

1. **Registration Screen**: Users enter email, first name, last name, phone number (with country code), and password
2. **Real-time Validation**: All fields validated as user types with immediate error feedback using `validateEmail`, `validatePassword`, `validateFirstName`, `validateLastName`, `validatePhoneNumber`
3. **Password Strength Indicator**: Visual feedback shows password strength (weak/medium/strong) using `getPasswordStrength` utility
4. **Duplicate Email Check**: Prevents registration with existing email addresses by checking against Zustand store
5. **User Storage**: User data persisted in Zustand store with MMKV backend
   - User object includes: id, email, name, firstName, lastName, phoneNumber, countryCode, password (plain text - demo only)
6. **Auto-login**: After successful registration, user is automatically logged in and token is generated

#### Login Flow

1. **Login Screen**: Users enter email and password
2. **Form Validation**: Email format and password length (min 6 chars) validated
3. **Biometric Check**: App checks for available biometric authentication (Face ID/Touch ID/Fingerprint)
4. **Authentication**: Credentials verified against users in Zustand store
   - Email comparison is case-insensitive
   - Password comparison is exact match (plain text - demo only)
5. **Token Generation**: JWT-like token generated with format: `userId.timestamp.randomString`
6. **Secure Storage**: Token and user data (without password) stored in Expo SecureStore
7. **Session Persistence**: Auth state checked on app startup via `AuthContext.checkAuthStatus()`
8. **Logout**: Clears token and user data from SecureStore, resets AuthContext state

### State Management Architecture

#### AuthContext (React Context API)

- **Purpose**: Manages authentication state globally
- **State**: `user`, `isLoading`, `isAuthenticated`
- **Methods**: `login()`, `logout()`, `checkAuthStatus()`
- **Persistence**: Reads from SecureStore on app startup
- **Location**: `src/context/AuthContext.tsx`

#### Zustand Store (MMKV Backend)

- **Purpose**: Manages user data persistence
- **Storage Backend**: MMKV (fast, synchronous key-value storage)
- **Persistence**: Automatically persists to device storage
- **Default Users**: Two demo users pre-loaded
- **Operations**: `addUser()`, `getUser()`, `getUsers()`, `updateUser()`, `removeUser()`, `clearUsers()`
- **Location**: `src/stores/appStore.ts`
- **Storage Adapter**: `src/utils/zustandStorage.ts`

#### Data Flow

```
User Action → Component → AuthContext/Store → Storage Layer
                ↓
         UI Update (React State)
```

### Storage Architecture

#### Expo SecureStore

- **Purpose**: Secure credential storage
- **Platform**:
  - iOS: Uses Keychain Services
  - Android: Uses EncryptedSharedPreferences with Android Keystore
- **Stored Data**:
  - `auth_token`: JWT-like authentication token
  - `user_data`: User object (without password)
- **Security**: Hardware-backed encryption on supported devices
- **Location**: `src/utils/auth.ts`

#### MMKV (via Zustand)

- **Purpose**: Fast, persistent user data storage
- **Stored Data**: All registered users array
- **Performance**: Synchronous operations, faster than AsyncStorage
- **Persistence**: Survives app restarts
- **Location**: `src/utils/zustandStorage.ts`

### Navigation Architecture

```
RootNavigator (RootNavigator.tsx)
│
├── AuthStack (unauthenticated)
│   ├── Login Screen
│   └── SignUp Screen
│
└── MainStack (authenticated)
    ├── TabNavigator
    │   ├── Home Tab
    │   └── Profile Tab
    └── NotFound Screen (catch-all)
```

- **Conditional Rendering**: Based on `isAuthenticated` from AuthContext
- **Navigation Type**: Native Stack Navigator for auth flow, Bottom Tabs for main app
- **Deep Linking**: Configured via Expo Linking (scheme: `testapp`)

### Component Architecture

#### Reusable Components

- **Button**: Customizable button with variants (primary, secondary, outline)
- **TextInput**: Form input with validation, error messages, password visibility toggle
- **CountryCodePicker**: Modal-based picker with search functionality
- **ProfileIcon**: Custom tab bar icon component

#### Screen Components

- **Login**: Authentication form with biometric support
- **SignUp**: Registration form with comprehensive validation
- **Home**: Main screen after login
- **Profile**: User profile display screen

### UI/UX Features

- **Responsive Design**: Adapts to different screen sizes
- **Keyboard Handling**: KeyboardAvoidingView prevents keyboard overlap
- **Loading States**: Visual feedback during async operations
- **Error Handling**: User-friendly error messages with validation feedback
- **Dark Mode**: Automatic support via `useColorScheme` hook
- **Animations**: Smooth transitions between screens
- **Confirmation Dialogs**: Alert dialogs for destructive actions (logout)
- **Password Visibility Toggle**: Eye icon to show/hide password
- **Real-time Validation**: Immediate feedback as user types

## Reusable Components

### Button Component

A customizable button component with variants:

- `primary`: Default blue button
- `secondary`: Purple button
- `outline`: Transparent with border

Features:

- Loading state with spinner
- Disabled state
- Custom styling support
- Accessible

### TextInput Component

A form input component with:

- Label and error message support
- Secure text entry for passwords
- Password visibility toggle
- Focus state indicators
- Dark mode support
- Email and text input types

### CountryCodePicker Component

A comprehensive country code picker with:

- Modal-based selection UI
- Search functionality (by country name, code, or calling code)
- Flag emojis for visual identification
- All 240+ countries supported
- Dark mode support
- Optimized performance with FlatList

## Validation Rules

All validation functions are located in `src/utils/validation.ts` and return an object with `{ isValid: boolean, error: string }` format. Validation is performed in real-time as users type, providing immediate feedback.

### Email Validation (`validateEmail`)

**Rules:**

- ✅ **Required**: Field cannot be empty or whitespace-only
- ✅ **Format**: Must match regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Must contain `@` symbol
  - Must have domain name
  - Must have top-level domain (TLD)
  - No spaces allowed
- ✅ **Uniqueness**: Email must be unique (checked against existing users in store)
- ✅ **Case Handling**: Email comparison is case-insensitive

**Valid Examples:**

- `user@example.com`
- `test+tag@example.com`
- `user123@mail.example.com`

**Invalid Examples:**

- Empty string
- `user@` (no domain)
- `user@example` (no TLD)
- `user @example.com` (contains space)

### Password Validation

#### Sign Up (`validatePassword`)

**Rules:**

- ✅ **Required**: Field cannot be empty
- ✅ **Minimum Length**: At least 8 characters
- ✅ **Uppercase**: At least one uppercase letter (A-Z)
- ✅ **Lowercase**: At least one lowercase letter (a-z)
- ✅ **Number**: At least one digit (0-9)
- ✅ **Special Character**: At least one special character from: `!@#$%^&*(),.?":{}|<>`

**Valid Examples:**

- `Password123!`
- `MySecurePass456@`
- `Complex#Pass2024`

**Invalid Examples:**

- `pass1!` (too short, no uppercase)
- `PASSWORD123!` (no lowercase)
- `Password!` (no number)
- `Password123` (no special character)

#### Login (`validatePassword` - simple version)

**Rules:**

- ✅ **Required**: Field cannot be empty
- ✅ **Minimum Length**: At least 6 characters (for backward compatibility with existing demo users)

**Note**: Login uses a simpler validation (6+ chars) to maintain compatibility with existing demo accounts that may not meet signup requirements.

### Confirm Password Validation (`validateConfirmPassword`)

**Rules:**

- ✅ **Required**: Field cannot be empty
- ✅ **Match**: Must exactly match the password field (case-sensitive, whitespace-sensitive)

**Validation Logic:**

- Compares `confirmPassword` with original `password` field
- Exact string match required (no trimming or case-insensitivity)

### First Name Validation (`validateFirstName`)

**Rules:**

- ✅ **Required**: Field cannot be empty or whitespace-only
- ✅ **Minimum Length**: At least 2 characters (after trimming)
- ✅ **Character Set**: Only allows:
  - Letters (a-z, A-Z)
  - Spaces
  - Hyphens (-)
  - Apostrophes (')
- ✅ **Whitespace Handling**: Leading/trailing whitespace is trimmed before validation

**Valid Examples:**

- `John`
- `Mary Jane`
- `Mary-Jane`
- `O'Brien`
- `Jean-Pierre`

**Invalid Examples:**

- Empty string
- `A` (too short)
- `John123` (contains numbers)
- `John@Doe` (contains special characters)

### Last Name Validation (`validateLastName`)

**Rules:**

- ✅ **Required**: Field cannot be empty or whitespace-only
- ✅ **Minimum Length**: At least 2 characters (after trimming)
- ✅ **Character Set**: Only allows:
  - Letters (a-z, A-Z)
  - Spaces
  - Hyphens (-)
  - Apostrophes (')
- ✅ **Whitespace Handling**: Leading/trailing whitespace is trimmed before validation

**Valid Examples:**

- `Doe`
- `Van Der Berg`
- `Smith-Jones`
- `O'Connor`

**Invalid Examples:**

- Empty string
- `D` (too short)
- `Doe123` (contains numbers)
- `Doe@Smith` (contains special characters)

### Phone Number Validation (`validatePhoneNumber`)

**Rules:**

- ✅ **Required**: Field cannot be empty or whitespace-only
- ✅ **Length**: Between 4-15 digits (after removing non-digit characters)
- ✅ **Format**: Only numeric characters allowed (non-digits are stripped before validation)
- ✅ **E.164 Compatibility**: Supports E.164 format (country code + number)

**Validation Logic:**

- Strips all non-digit characters before validation
- Validates digit count only (4-15 digits)

**Valid Examples:**

- `1234567890` (10 digits)
- `(123) 456-7890` (stripped to 10 digits)
- `123-456-7890` (stripped to 10 digits)
- `+1-234-567-8901` (stripped to 11 digits)

**Invalid Examples:**

- Empty string
- `123` (too short, < 4 digits)
- `1234567890123456` (too long, > 15 digits)

### Password Strength Indicator (`getPasswordStrength`)

**Purpose**: Provides visual feedback on password strength during signup

**Scoring System:**

- **Length ≥ 8**: +1 point
- **Length ≥ 12**: +1 point
- **Contains lowercase**: +1 point
- **Contains uppercase**: +1 point
- **Contains number**: +1 point
- **Contains special character**: +1 point

**Strength Levels:**

- **Weak**: Score ≤ 2
- **Medium**: Score 3-4
- **Strong**: Score ≥ 5

**Returns**: `{ strength: 'weak' | 'medium' | 'strong', score: number }`

## Navigation Structure

```
RootNavigator
├── Auth Stack (if not authenticated)
│   ├── Login
│   └── SignUp
└── Main Stack (if authenticated)
    ├── Tab Navigator
    │   ├── Home Tab
    │   └── Profile Tab
    └── NotFound
```

## Technologies Used

- React Native 0.81.4
- Expo SDK 54
- React Navigation 7.x
- TypeScript
- Expo SecureStore (Keychain/Keystore)
- Zustand (State Management)
- MMKV (Fast Storage)
- React Hooks

## Security Approach

### Secure Storage Implementation

#### Expo SecureStore

- **Platform Security**:
  - **iOS**: Uses Keychain Services with hardware-backed encryption (Secure Enclave on supported devices)
  - **Android**: Uses EncryptedSharedPreferences with Android Keystore (hardware-backed on supported devices)
- **Stored Data**:
  - Authentication tokens (JWT-like format)
  - User data (without passwords)
- **Access Control**: Data is encrypted at rest and protected by device-level security
- **Implementation**: `src/utils/auth.ts` - `storeToken()`, `storeUser()`, `getToken()`, `getUser()`

#### MMKV Storage (User Data)

- **Purpose**: Fast, persistent storage for user registry
- **Security Note**: ⚠️ Passwords stored in plain text (demo only - see Trade-offs)
- **Performance**: Synchronous operations, faster than AsyncStorage
- **Persistence**: Survives app restarts and updates

### Authentication Security

#### Token-Based Authentication

- **Token Format**: `userId.timestamp.randomString`
- **Generation**: Cryptographically random component for uniqueness
- **Storage**: Tokens stored in SecureStore (hardware-backed encryption)
- **Validation**: Format validation on app startup (3-part structure)
- **Limitation**: ⚠️ Simulated tokens, not real JWT with signature validation (see Trade-offs)

#### Credential Verification

- **Email**: Case-insensitive comparison
- **Password**: Exact match comparison (plain text - demo only)
- **Error Messages**: Generic "Invalid email or password" to prevent user enumeration
- **Simulated Delay**: 1-second delay to simulate API call

#### Session Management

- **Persistence**: Session persists across app restarts via SecureStore
- **Validation**: Token format validated on app startup
- **Logout**: Complete credential removal from SecureStore
- **State Management**: AuthContext manages session state globally

### Biometric Authentication

#### Implementation

- **Library**: `expo-local-authentication`
- **Platform Support**:
  - iOS: Face ID, Touch ID
  - Android: Fingerprint, Face Recognition
- **Availability Check**: Hardware and enrollment status verified on mount
- **Current Functionality**:
  - Detects available biometric type
  - Resets failed login attempts after successful biometric auth
  - ⚠️ Does not automatically log in user (see Trade-offs)

#### Configuration

- **iOS**: Face ID permission configured in `app.json`
- **Fallback**: Device passcode fallback enabled
- **User Experience**: Prompts user with appropriate biometric type name

### Input Validation & Sanitization

#### Client-Side Validation

- **Real-time Validation**: Immediate feedback prevents invalid data entry
- **Comprehensive Rules**: See Validation Rules section
- **Error Messages**: User-friendly, specific error messages
- **Whitespace Handling**: Automatic trimming where appropriate

#### Security Considerations

- **Email Validation**: Regex-based format validation
- **Password Requirements**: Strong password policy (8+ chars, mixed case, numbers, special chars)
- **Phone Number**: Non-digit characters stripped before validation
- **Name Fields**: Restricted character set prevents injection attempts

### Data Protection

#### In Transit

- **Current State**: ⚠️ No network requests (local-only app)
- **Production Recommendation**: Use HTTPS/TLS for all API communications

#### At Rest

- **Credentials**: Stored in SecureStore (hardware-backed encryption)
- **User Data**: Stored in MMKV (fast but not encrypted - see Trade-offs)
- **Passwords**: ⚠️ Stored in plain text in MMKV (demo only - see Trade-offs)

### Security Best Practices Implemented

- Secure credential storage (SecureStore)
- Token-based authentication
- Session persistence
- Real-time input validation
- Strong password requirements
- Biometric authentication detection
- Generic error messages (prevents user enumeration)
- Password visibility toggle (UX security)

### Summary

This demo app prioritizes **simplicity and demonstration** over **production security**. The trade-offs made allow for:

- ✅ Easy setup and running (no backend required)
- ✅ Clear demonstration of authentication flows
- ✅ Fast development and iteration
- ✅ Educational value

However, these trade-offs mean the app is **NOT suitable for production** without significant modifications:

- ❌ No backend infrastructure
- ❌ Limited scalability
- ❌ Missing production security features

## License

This project is for demonstration purposes.

## Credits

Built with React Native and Expo.
