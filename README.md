# TestApp - React Native Authentication Demo

A React Native application with authentication flow, secure token storage, and a beautiful minimal UI.

## Features

- ✨ Beautiful, minimal, and intuitive UI
- 🔐 Secure authentication with dummy token stored in Expo SecureStore
- 📱 Tab navigation with Home and Profile screens
- 🎨 Dark mode support
- 🔄 Session persistence across app restarts
- 🚪 Logout functionality with confirmation
- ✅ Form validation for login

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

Use these credentials to login:

**User 1:**
- Email: `demo@example.com`
- Password: `password123`

**User 2:**
- Email: `test@example.com`
- Password: `test123`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Custom button component
│   ├── TextInput.tsx   # Custom text input with validation
│   ├── ProfileIcon.tsx # Profile icon for tab bar
│   └── index.ts        # Component exports
├── context/            # React Context providers
│   └── AuthContext.tsx # Authentication state management
├── navigation/         # Navigation configuration
│   ├── RootNavigator.tsx  # Main navigation setup
│   ├── screens/        # Screen components
│   │   ├── Login.tsx   # Login screen
│   │   ├── Home.tsx    # Home screen
│   │   ├── Profile.tsx # Profile screen
│   │   └── NotFound.tsx # 404 screen
│   └── index.tsx       # Navigation exports
├── utils/              # Utility functions
│   └── auth.ts         # Authentication utilities
├── assets/             # Images and static assets
└── App.tsx            # Root component
```

## Architecture

### Authentication Flow

1. **Login Screen**: Users enter email and password
2. **Validation**: Form validation checks email format and password length
3. **Token Generation**: Dummy token is generated upon successful login
4. **Secure Storage**: Token and user data stored in Expo SecureStore
5. **Session Persistence**: Auth state persists across app restarts
6. **Logout**: Clears token from secure storage and returns to login

### State Management

- **AuthContext**: Manages authentication state globally
- React Context API for state sharing
- Hooks (`useAuth`) for easy access to auth state

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

## Validation Rules

### Email Validation
- Must be a valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Required field

### Password Validation
- Minimum 6 characters
- Required field

## Navigation Structure

```
RootNavigator
├── Login (if not authenticated)
└── Main (if authenticated)
    ├── Home Tab
    └── Profile Tab
```

## Technologies Used

- React Native 0.81.4
- Expo SDK 54
- React Navigation 7.x
- TypeScript
- Expo SecureStore
- React Hooks

## Development Notes

### Dummy Authentication

This app uses dummy authentication for demonstration purposes:
- No real backend API calls
- User credentials are hardcoded in `src/utils/auth.ts`
- Token generation is simulated locally
- In production, replace with real API integration

### Future Enhancements

- [ ] Biometric authentication (Face ID / Touch ID)
- [ ] Registration screen
- [ ] Password reset functionality
- [ ] Account lockout after failed attempts
- [ ] Remember me functionality
- [ ] Social login integration
- [ ] Unit tests for auth logic
- [ ] E2E tests

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
