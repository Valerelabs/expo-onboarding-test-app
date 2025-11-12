# Screens Overview

## 🎨 App Flow Visualization

```
┌─────────────────────────────────────────────────────┐
│                    App Launch                       │
│         (Checks for existing session)               │
└─────────────────────────────────────────────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
     Not Authenticated         Authenticated
            │                         │
            ▼                         ▼
┌───────────────────────┐   ┌───────────────────────┐
│   🔐 LOGIN SCREEN     │   │  🏠 HOME TAB         │
│                       │   │  (with Bottom Tabs)   │
│  - Email Input        │   │                       │
│  - Password Input     │   └───────────────────────┘
│  - Sign In Button     │             │
│  - Demo Credentials   │    ┌────────┴─────────┐
│                       │    │                  │
└───────────────────────┘    ▼                  ▼
                      ┌──────────────┐  ┌──────────────┐
                      │  HOME TAB    │  │ PROFILE TAB  │
                      └──────────────┘  └──────────────┘
```

## 📱 Screen Details

### 1. Login Screen

**Route:** `/Login` (Initial route when not authenticated)

**Components:**
- Custom TextInput (Email)
- Custom TextInput (Password with toggle)
- Custom Button (Sign In)
- Demo credentials card

**Features:**
- ✅ Email validation (format check)
- ✅ Password validation (min 6 chars)
- ✅ Inline error messages
- ✅ Loading state on submit
- ✅ Keyboard handling
- ✅ Dark mode support
- ✅ ScrollView for small screens

**User Actions:**
- Enter email and password
- Toggle password visibility
- Submit form (validates first)
- View demo credentials

---

### 2. Home Tab

**Route:** `/Main/Home` (Default tab after login)

**Components:**
- Welcome card with greeting
- Account information card
- Logout button (outline variant)

**Content:**
- User's name in greeting
- User's email
- User's ID
- Logout action

**Features:**
- ✅ Displays user data from context
- ✅ Confirmation dialog on logout
- ✅ Loading state during logout
- ✅ Card-based layout with shadows
- ✅ Dark mode support
- ✅ ScrollView layout

**User Actions:**
- View account information
- Logout with confirmation

---

### 3. Profile Tab

**Route:** `/Main/Profile`

**Components:**
- Large circular avatar with initial
- User name display
- User email display
- Profile details card
- Logout button (outline variant)

**Content:**
- Avatar (100px circle with first letter)
- Full name
- Email address
- Profile details (ID, Email, Name)
- Logout action

**Features:**
- ✅ Dynamic avatar color
- ✅ First letter extraction
- ✅ Detailed profile information
- ✅ Confirmation dialog on logout
- ✅ Loading state during logout
- ✅ Dark mode support
- ✅ Centered layout

**User Actions:**
- View profile details
- Logout with confirmation

---

## 🎯 Navigation Structure

### Tab Navigator (After Authentication)

```
┌──────────────────────────────────────────────┐
│                 Header                       │
├──────────────────────────────────────────────┤
│                                              │
│            Screen Content                    │
│                                              │
│                                              │
├──────────────────────────────────────────────┤
│  Tab Bar                                     │
│  ┌─────────────┐  ┌─────────────┐          │
│  │ 🏠 Home     │  │ 👤 Profile  │          │
│  └─────────────┘  └─────────────┘          │
└──────────────────────────────────────────────┘
```

### Stack Navigator (Root)

```
Authenticated Stack:
├─ Main (Tab Navigator)
│  ├─ Home Tab
│  └─ Profile Tab
└─ NotFound

Unauthenticated Stack:
└─ Login
```

---

## 🎨 UI Elements Used

### Reusable Components

#### 1. **Button Component**

**Variants:**
- `primary` - Blue background (#007AFF)
- `secondary` - Purple background (#5856D6)
- `outline` - Transparent with blue border

**States:**
- Default
- Loading (with spinner)
- Disabled (gray)

**Usage in App:**
- Login screen: Primary button
- Home/Profile: Outline button for logout

#### 2. **TextInput Component**

**Features:**
- Label above input
- Error message below
- Focus indicator (blue border)
- Dark mode colors
- Password toggle (eye icon)

**States:**
- Default
- Focused (blue border)
- Error (red border + message)

**Usage in App:**
- Login screen: Email and password inputs

#### 3. **ProfileIcon Component**

**Features:**
- SVG-style icon
- Scalable
- Color-adaptable
- Minimal design

**Usage in App:**
- Profile tab bar icon

---

## 🌈 Color Palette

### Light Mode
- Background: `#FFFFFF` / `#F2F2F7`
- Primary: `#007AFF`
- Text: `#000000`
- Subtext: `#6C6C70`
- Card: `#FFFFFF`
- Border: `rgba(0, 0, 0, 0.1)`

### Dark Mode
- Background: `#000000`
- Primary: `#007AFF`
- Text: `#FFFFFF`
- Subtext: `#8E8E93`
- Card: `#1C1C1E`
- Border: `rgba(255, 255, 255, 0.1)`

---

## 📐 Layout Specifications

### Login Screen
- Padding: 24px horizontal, 40px vertical
- Input height: 54px
- Button height: 54px
- Border radius: 12px (inputs & buttons)
- Typography: Title 32px, Body 16px

### Home Tab
- Padding: 20px
- Card padding: 20px
- Card border radius: 16px
- Card margin bottom: 16px
- Typography: Greeting 24px, Body 16px

### Profile Tab
- Padding: 20px
- Avatar size: 100px
- Avatar text: 40px
- Card padding: 20px
- Card border radius: 16px
- Typography: Name 28px, Email 16px, Details 14px

---

## 🔄 User Flows

### Login Flow
```
1. User opens app
2. Sees login screen
3. Enters email
4. Enters password
5. Taps "Sign In"
6. Form validates
7. Loading spinner shows
8. Auth token stored
9. Navigates to Home tab
```

### Session Persistence Flow
```
1. User opens app (already logged in)
2. Loading screen shows briefly
3. Checks for stored token
4. Validates token
5. Loads user data
6. Navigates to Home tab (skips login)
```

### Logout Flow
```
1. User taps "Logout" button
2. Confirmation dialog appears
3. User confirms
4. Loading spinner shows
5. Token removed from storage
6. Auth state cleared
7. Navigates to Login screen
```

---

## 🚀 Interactions

### Login Screen
- **Email Input Click**: Focus input, show keyboard
- **Password Input Click**: Focus input, show keyboard
- **Eye Icon Click**: Toggle password visibility
- **Sign In Button**: Validate form → Submit → Navigate
- **Outside Click**: Dismiss keyboard

### Home Tab
- **Scroll**: View all content
- **Logout Button**: Show confirmation dialog
- **Confirm Logout**: Execute logout flow

### Profile Tab
- **Scroll**: View all content
- **Logout Button**: Show confirmation dialog
- **Confirm Logout**: Execute logout flow

### Tab Bar
- **Home Tab Click**: Navigate to Home
- **Profile Tab Click**: Navigate to Profile
- **Current Tab Click**: No action (already there)

---

## ✨ Animations & Transitions

### Transitions
- Screen navigation: Slide transition
- Tab switch: Fade transition
- Modal dialogs: Fade + scale in

### Micro-animations
- Button press: Opacity 0.7
- Input focus: Border color fade
- Loading spinner: Rotate 360°
- Tab icon: Scale on press

---

## 📱 Responsive Design

### Small Screens (< 375px)
- ScrollView enabled on login
- KeyboardAvoidingView active
- Reduced padding where needed

### Medium Screens (375-768px)
- Standard layout
- Full padding
- Optimal spacing

### Large Screens (> 768px)
- Same layout (mobile-first)
- Could be enhanced for tablet

---

## 🎭 States Management

### Global State (AuthContext)
- `user` - Current user object (or null)
- `isLoading` - Auth check in progress
- `isAuthenticated` - Boolean auth status
- `login()` - Login function
- `logout()` - Logout function

### Local State (Screens)

**Login:**
- `email` - Email input value
- `password` - Password input value
- `emailError` - Email validation error
- `passwordError` - Password validation error
- `isLoading` - Login in progress

**Home & Profile:**
- `isLoggingOut` - Logout in progress

---

## 🔐 Security Features

### Secure Storage
- Auth token stored in Keychain (iOS) / Keystore (Android)
- User data encrypted in secure store
- No plaintext storage

### Validation
- Email format validation
- Password length validation
- Required field checks

### Session Management
- Token checked on app launch
- Token cleared on logout
- No token = auto navigate to login

---

## 📊 Data Flow

```
┌─────────────┐
│   Login     │
│   Screen    │
└─────┬───────┘
      │
      │ Submit credentials
      ▼
┌─────────────┐
│    Auth     │
│   Utility   │
└─────┬───────┘
      │
      │ Validate & generate token
      ▼
┌─────────────┐
│   Secure    │
│   Store     │
└─────┬───────┘
      │
      │ Store token & user
      ▼
┌─────────────┐
│    Auth     │
│   Context   │
└─────┬───────┘
      │
      │ Update state
      ▼
┌─────────────┐
│    Root     │
│  Navigator  │
└─────┬───────┘
      │
      │ Navigate based on auth
      ▼
┌─────────────┐
│    Home     │
│     Tab     │
└─────────────┘
```

---

This completes the screens overview! All screens are implemented with beautiful, minimal, and intuitive UI as requested. 🎉

