# Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```

### 3. Run on Your Device
Choose your platform:
- **iOS**: Press `i` or run `npm run ios`
- **Android**: Press `a` or run `npm run android`
- **Web**: Press `w` or run `npm run web` (Note: SecureStore won't work on web)

## Login to the App

Use these demo credentials:

```
Email: demo@example.com
Password: password123
```

or

```
Email: test@example.com
Password: test123
```

## What You'll See

### 1. Login Screen
- Beautiful minimal design
- Email and password fields with validation
- Demo credentials displayed
- Dark mode support

### 2. Home Tab (After Login)
- Welcome message with your name
- User account information card
- Logout button

### 3. Profile Tab
- Large avatar with your initial
- User profile details
- Logout button

## Key Features to Test

### ✅ Form Validation
- Try logging in with invalid email (e.g., "test")
- Try logging in with short password (less than 6 chars)
- See inline error messages

### ✅ Authentication Flow
1. Login with demo credentials
2. App navigates to Home tab
3. See user data displayed
4. Navigate between Home and Profile tabs

### ✅ Session Persistence
1. Login to the app
2. Close the app completely
3. Reopen the app
4. You should still be logged in! 🎉

### ✅ Logout
1. Tap "Logout" button on Home or Profile
2. Confirm in the dialog
3. Returns to login screen
4. Token cleared from secure storage

### ✅ Dark Mode
1. Change your device to dark mode
2. App automatically adapts
3. All screens support dark theme

### ✅ Loading States
- See spinner while logging in
- See loading screen on app start
- See loader on logout button

### ✅ Password Visibility
- Tap the eye icon to show/hide password
- Helps verify correct entry

## Troubleshooting

### Can't install dependencies?
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### App won't start?
```bash
# Clear Expo cache
npx expo start -c
```

### Navigation not working?
- Make sure you're on a physical device or simulator (not web)
- Restart the development server
- Clear app data on your device

### SecureStore errors?
- SecureStore requires iOS/Android (won't work on web)
- Ensure you have the latest expo-secure-store installed
- Try on a physical device if simulator fails

## File Structure Overview

```
TestApp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Custom button
│   │   ├── TextInput.tsx    # Custom input
│   │   └── ProfileIcon.tsx  # Tab icon
│   ├── context/             # State management
│   │   └── AuthContext.tsx  # Auth state
│   ├── navigation/          # Navigation setup
│   │   ├── RootNavigator.tsx
│   │   └── screens/
│   │       ├── Login.tsx
│   │       ├── Home.tsx
│   │       └── Profile.tsx
│   ├── utils/               # Helper functions
│   │   └── auth.ts          # Auth utilities
│   └── App.tsx              # Root component
├── package.json             # Dependencies
└── README.md               # Full documentation
```

## Tech Stack

- **Framework**: React Native 0.81.4
- **Platform**: Expo SDK 54
- **Navigation**: React Navigation 7.x
- **Language**: TypeScript
- **Storage**: Expo SecureStore
- **State**: React Context API

## Next Steps

1. ✅ Login with demo credentials
2. ✅ Explore Home and Profile tabs
3. ✅ Test logout functionality
4. ✅ Try dark mode
5. ✅ Test session persistence (close & reopen)

## Need More Info?

- **Full Documentation**: See `README.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Client Requirements**: See `ClientRequirement.md`

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console for error messages
3. Ensure all dependencies are installed
4. Try clearing cache and reinstalling

---

**Happy Testing! 🚀**

Remember: This is a demo app with dummy authentication. In production, you would integrate with a real backend API.

