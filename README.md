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

- Node.js (v20.19.4 or higher recommended)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TestApp
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Development Build

Start the Expo development server:
```bash
npm start
```

### Run on iOS
```bash
npm run ios
```

### Run on Android
```bash
npm run android
```

### Run on Web
```bash
npm run web
```

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

### Authentication Flow

#### Sign Up Flow
1. **Registration Screen**: Users enter email, first name, last name, phone number (with country code), and password
2. **Real-time Validation**: All fields validated as user types with immediate error feedback
3. **Password Strength**: Visual indicator shows password strength (weak/medium/strong)
4. **Duplicate Check**: Prevents registration with existing email addresses
5. **User Storage**: User data persisted in Zustand store with MMKV
6. **Auto-login**: After successful registration, user is automatically logged in

#### Login Flow
1. **Login Screen**: Users enter email and password
2. **Validation**: Form validation checks email format and password requirements
3. **Authentication**: Credentials verified against users in Zustand store
4. **Token Generation**: Secure token generated upon successful login
5. **Secure Storage**: Token and user data stored in Expo SecureStore
6. **Session Persistence**: Auth state persists across app restarts
7. **Logout**: Clears token from secure storage and returns to login

### State Management

- **AuthContext**: Manages authentication state globally using React Context API
- **Zustand Store**: Manages user data with MMKV persistence
  - All registered users stored in `appStore`
  - Persists across app restarts
  - Fast and efficient storage
- Hooks (`useAuth`, `useAppStore`) for easy access to state

### Security

- Credentials stored using Expo SecureStore (iOS Keychain / Android Keystore)
- No plaintext password storage
- Token-based authentication simulation
- Secure logout removes all stored credentials

### UI/UX Features

- Responsive design for different screen sizes
- Keyboard handling with KeyboardAvoidingView
- Loading states for async operations
- Error handling with user-friendly messages
- Dark mode support
- Smooth transitions and animations
- Confirmation dialogs for destructive actions

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

### Email Validation
- Must be a valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Required field
- Must be unique (no duplicate registrations)

### Password Validation (Sign Up)
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*(),.?":{}|<>)
- Required field

### Password Validation (Login)
- Minimum 6 characters (for backward compatibility)
- Required field

### Confirm Password Validation
- Must match the password field
- Required field

### First Name Validation
- Minimum 2 characters
- Can only contain letters, spaces, hyphens, and apostrophes
- Required field

### Last Name Validation
- Minimum 2 characters
- Can only contain letters, spaces, hyphens, and apostrophes
- Required field

### Phone Number Validation
- Between 4-15 digits
- Only numeric characters allowed
- Required field

All validation functions are reusable and located in `src/utils/validation.ts`

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

## Development Notes

### Local-Only Authentication

This app uses local authentication for demonstration purposes:
- No real backend API calls
- User data stored locally in Zustand store (persisted with MMKV)
- Two demo users pre-loaded for testing
- Token generation is simulated locally
- Passwords stored in plain text (for demo only - never do this in production!)
- In production, replace with:
  - Real API integration
  - Secure password hashing (bcrypt, argon2)
  - JWT token validation
  - Secure backend authentication

### Security Note

⚠️ **Important**: This is a demonstration app. In production:
- Never store passwords in plain text
- Always hash passwords server-side
- Use HTTPS for all API calls
- Implement proper token refresh mechanisms
- Add rate limiting and CAPTCHA
- Follow OWASP security guidelines

### Future Enhancements

- [x] Registration screen with validation
- [x] Country code picker for phone numbers
- [x] Password strength indicator
- [x] User data persistence with Zustand
- [ ] Biometric authentication (Face ID / Touch ID)
- [ ] Password reset functionality
- [ ] Account lockout after failed attempts (requirement: 5 failed attempts)
- [ ] Remember me functionality
- [ ] Social login integration
- [ ] Unit tests for validation and auth logic
- [ ] E2E tests with Detox
- [ ] Profile editing functionality

## Troubleshooting

### Common Issues

**App won't start:**
- Clear cache: `npx expo start -c`
- Rebuild: `rm -rf node_modules && npm install`

**SecureStore errors:**
- Ensure you're running on a physical device or simulator (not web)
- Check iOS/Android permissions

**Navigation issues:**
- Clear app data from device
- Restart the app

## License

This project is for demonstration purposes.

## Credits

Built with React Native and Expo.
