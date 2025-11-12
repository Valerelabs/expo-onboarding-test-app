# Sign Up Feature - Quick Start Guide

## How to Use the Sign Up Feature

### For End Users

1. **Launch the app** - You'll see the Login screen
2. **Click "Sign Up"** - Located below the "Don't have an account?" text
3. **Fill in the form:**
   - Email: your@email.com
   - First Name: John
   - Last Name: Doe
   - Country Code: Tap to select (search enabled)
   - Phone Number: 1234567890
   - Password: Must meet requirements (8+ chars, uppercase, lowercase, number, special char)
   - Confirm Password: Re-enter password
4. **Watch for validation:**
   - Red errors appear if fields are invalid
   - Password strength bar shows as you type
   - Submit button disabled until all fields valid
5. **Submit** - Tap "Sign Up" button
6. **Auto-login** - You'll be automatically logged in and taken to the Home screen

### For Developers

#### Testing the Feature

**Test New User Registration:**
```
Email: newuser@test.com
First Name: New
Last Name: User
Country Code: +1 (United States)
Phone: 5551234567
Password: Test@1234
Confirm: Test@1234
```

**Test Existing User (Should Fail):**
```
Email: demo@example.com (already exists)
```

**Test Invalid Inputs:**
```
Email: notanemail
Password: weak (too weak - will show errors)
Password: NoSpecialChar1 (missing special character)
First Name: A (too short)
Phone: 12 (too short)
```

#### Code Location

**Main Files:**
- Registration UI: `src/navigation/screens/SignUp.tsx`
- Validation Logic: `src/utils/validation.ts`
- Country Picker: `src/components/CountryCodePicker.tsx`
- User Storage: `src/stores/appStore.ts`

#### Validation Functions

Import and use anywhere:
```typescript
import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  getPasswordStrength,
} from '../utils/validation';

const result = validateEmail('test@example.com');
// Returns: { isValid: true, error: '' }

const strength = getPasswordStrength('Test@123');
// Returns: { strength: 'medium', score: 4 }
```

#### Adding a User Programmatically

```typescript
import useAppStore from '../stores/appStore';

const { addUser } = useAppStore();

addUser({
  id: Date.now().toString(),
  email: 'user@example.com',
  name: 'John Doe',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '1234567890',
  countryCode: '+1',
  password: 'SecurePass@123',
});
```

#### Customizing Validation

Edit `src/utils/validation.ts`:
```typescript
// Example: Increase minimum password length
export const validatePassword = (password: string) => {
  if (password.length < 12) { // Changed from 8 to 12
    return { isValid: false, error: 'Password must be at least 12 characters' };
  }
  // ... rest of validation
};
```

## Common Issues & Solutions

### Issue: "An account with this email already exists"
**Solution:** Use a different email or login with existing credentials

### Issue: Password strength shows "weak"
**Solution:** Add uppercase, lowercase, numbers, and special characters

### Issue: Country code picker not showing
**Solution:** Ensure you're running on iOS/Android (not web)

### Issue: Form button stays disabled
**Solution:** Check all fields for validation errors (red text)

## Demo Accounts

Pre-loaded for testing:
- **demo@example.com** / Demo@123
- **test@example.com** / Test@123

## Password Requirements

✅ Minimum 8 characters
✅ At least one uppercase letter (A-Z)
✅ At least one lowercase letter (a-z)
✅ At least one number (0-9)
✅ At least one special character (!@#$%^&*)

## Next Steps

After successful signup:
1. User is automatically logged in
2. Navigate to Profile tab to see your information
3. Logout and login again to test persistence
4. All data persists across app restarts

## Screenshots Locations

The app displays:
- Login screen with "Sign Up" link
- Sign Up form with all fields
- Country code picker modal with search
- Password strength indicator
- Profile screen showing registered data

## Accessibility Features

- ✅ All inputs labeled for screen readers
- ✅ Error messages announced
- ✅ Proper color contrast (WCAG compliant)
- ✅ Touch targets 44x44 points minimum
- ✅ Keyboard navigation supported

## Performance Notes

- Country picker uses FlatList (virtualized, fast)
- MMKV storage (faster than AsyncStorage)
- Validation memoized to prevent re-renders
- Search optimized with useMemo

## Security Notes

⚠️ **For Demo Only:**
- Passwords stored in plain text
- No backend API
- Local storage only

🔒 **For Production:**
- Use secure backend API
- Hash passwords server-side (bcrypt/argon2)
- Implement JWT tokens
- Add rate limiting
- Use HTTPS only

## Support

For issues or questions:
1. Check console logs for errors
2. Verify all fields meet validation requirements
3. Clear app data and restart if needed
4. Review SIGNUP_IMPLEMENTATION.md for details

