import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  useColorScheme,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, TextInput } from "../../components";
import { CountryCodePicker } from "../../components/CountryCodePicker";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  getPasswordStrength,
} from "../../utils/validation";
import useAppStore from "../../stores/appStore";
import useSignupStore from "../../stores/signupStore";
import { User } from "../../utils/auth";
import { storeToken, storeUser, generateToken } from "../../utils/auth";
import { useAuth } from "../../context/AuthContext";
import callingCodes from "../../utils/callingCodes.json";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Country {
  name: string;
  flag: string;
  code: string;
  callingCode: string;
}

type SignUpScreenNavigationProp = NativeStackNavigationProp<any, "SignUp">;

interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}

export function SignUp({ navigation }: SignUpProps) {
  const { addUser } = useAppStore();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();

  // Get persisted form data from store
  const {
    email: storedEmail,
    setEmail: setStoredEmail,
    password: storedPassword,
    setPassword: setStoredPassword,
    confirmPassword: storedConfirmPassword,
    setConfirmPassword: setStoredConfirmPassword,
    firstName: storedFirstName,
    setFirstName: setStoredFirstName,
    lastName: storedLastName,
    setLastName: setStoredLastName,
    phoneNumber: storedPhoneNumber,
    setPhoneNumber: setStoredPhoneNumber,
    selectedCountry: storedSelectedCountry,
    setSelectedCountry: setStoredSelectedCountry,
    clearForm,
  } = useSignupStore();

  // Form state - initialize with persisted values
  const [email, setEmail] = useState(storedEmail);
  const [password, setPassword] = useState(storedPassword);
  const [confirmPassword, setConfirmPassword] = useState(storedConfirmPassword);
  const [firstName, setFirstName] = useState(storedFirstName);
  const [lastName, setLastName] = useState(storedLastName);
  const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    storedSelectedCountry
  );

  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    strength: "weak" | "medium" | "strong";
    score: number;
  }>({ strength: "weak", score: 0 });

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000000" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const subtextColor = isDark ? "#8E8E93" : "#6C6C70";

  // Update password strength as user types
  useEffect(() => {
    if (password) {
      setPasswordStrength(getPasswordStrength(password));
    } else {
      setPasswordStrength({ strength: "weak", score: 0 });
    }
  }, [password]);

  // Check if form is valid
  const isFormValid = (): boolean => {
    return (
      email.trim() !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !firstNameError &&
      !lastNameError &&
      !phoneNumberError
    );
  };

  // Validate all fields
  const validateForm = (): boolean => {
    let isValid = true;

    // Validate email
    const emailValidation = validateEmail(email);
    setEmailError(emailValidation.error);
    if (!emailValidation.isValid) isValid = false;

    // Validate password
    const passwordValidation = validatePassword(password);
    setPasswordError(passwordValidation.error);
    if (!passwordValidation.isValid) isValid = false;

    // Validate confirm password
    const confirmPasswordValidation = validateConfirmPassword(
      password,
      confirmPassword
    );
    setConfirmPasswordError(confirmPasswordValidation.error);
    if (!confirmPasswordValidation.isValid) isValid = false;

    // Validate first name
    const firstNameValidation = validateFirstName(firstName);
    setFirstNameError(firstNameValidation.error);
    if (!firstNameValidation.isValid) isValid = false;

    // Validate last name
    const lastNameValidation = validateLastName(lastName);
    setLastNameError(lastNameValidation.error);
    if (!lastNameValidation.isValid) isValid = false;

    // Validate phone number
    const phoneValidation = validatePhoneNumber(phoneNumber);
    setPhoneNumberError(phoneValidation.error);
    if (!phoneValidation.isValid) isValid = false;

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Check if user already exists
      const existingUsers = useAppStore.getState().getUsers();
      const userExists = existingUsers.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (userExists) {
        Alert.alert(
          "Error",
          "An account with this email already exists. Please login instead."
        );
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: email.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber.trim(),
        countryCode: selectedCountry.callingCode,
        password: password, // In real app, this would be hashed
      };

      // Add user to store
      addUser(newUser);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate and store token
      const token = generateToken(newUser.id);
      await storeToken(token);

      // Store user data (without password)
      const userToStore: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
        countryCode: newUser.countryCode,
      };
      await storeUser(userToStore);

      // Auto-login the user
      await login(email.trim(), password);

      // Clear the persisted form data after successful sign-up
      clearForm();

      Alert.alert("Success", "Your account has been created successfully!", [
        { text: "OK" },
      ]);

      // Navigation will be handled by the auth flow
    } catch (error: any) {
      console.error("Sign up error:", error);
      Alert.alert(
        "Error",
        error.message || "An error occurred during sign up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength.strength) {
      case "weak":
        return "#FF3B30";
      case "medium":
        return "#FF9500";
      case "strong":
        return "#34C759";
      default:
        return "#D1D1D6";
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: subtextColor }]}>
            Sign up to get started
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setStoredEmail(text);
              if (emailError) {
                const validation = validateEmail(text);
                setEmailError(validation.error);
              }
            }}
            onBlur={() => {
              const validation = validateEmail(email);
              setEmailError(validation.error);
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            editable={!isLoading}
          />

          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setStoredFirstName(text);
              if (firstNameError) {
                const validation = validateFirstName(text);
                setFirstNameError(validation.error);
              }
            }}
            onBlur={() => {
              const validation = validateFirstName(firstName);
              setFirstNameError(validation.error);
            }}
            placeholder="Enter your first name"
            autoCapitalize="words"
            error={firstNameError}
            editable={!isLoading}
          />

          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setStoredLastName(text);
              if (lastNameError) {
                const validation = validateLastName(text);
                setLastNameError(validation.error);
              }
            }}
            onBlur={() => {
              const validation = validateLastName(lastName);
              setLastNameError(validation.error);
            }}
            placeholder="Enter your last name"
            autoCapitalize="words"
            error={lastNameError}
            editable={!isLoading}
          />

          <View style={styles.phoneContainer}>
            <View style={styles.countryCodeContainer}>
              <CountryCodePicker
                selectedCountry={selectedCountry}
                onSelect={(country) => {
                  setSelectedCountry(country);
                  setStoredSelectedCountry(country);
                }}
              />
            </View>
            <View style={styles.phoneNumberContainer}>
              <TextInput
                label="Phone Number"
                value={phoneNumber}
                onChangeText={(text) => {
                  // Remove non-digit characters
                  const cleaned = text.replace(/\D/g, "");
                  setPhoneNumber(cleaned);
                  setStoredPhoneNumber(cleaned);
                  if (phoneNumberError) {
                    const validation = validatePhoneNumber(cleaned);
                    setPhoneNumberError(validation.error);
                  }
                }}
                onBlur={() => {
                  const validation = validatePhoneNumber(phoneNumber);
                  setPhoneNumberError(validation.error);
                }}
                placeholder="123456789"
                keyboardType="phone-pad"
                error={phoneNumberError}
                editable={!isLoading}
                containerStyle={styles.phoneInput}
              />
            </View>
          </View>

          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setStoredPassword(text);
              if (passwordError) {
                const validation = validatePassword(text);
                setPasswordError(validation.error);
              }
            }}
            onBlur={() => {
              const validation = validatePassword(password);
              setPasswordError(validation.error);
            }}
            placeholder="Enter your password"
            secureTextEntry
            error={passwordError}
            editable={!isLoading}
          />

          {password && !passwordError && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBars}>
                {[1, 2, 3, 4, 5, 6].map((bar) => (
                  <View
                    key={bar}
                    style={[
                      styles.strengthBar,
                      {
                        backgroundColor:
                          bar <= passwordStrength.score
                            ? getStrengthColor()
                            : "#D1D1D6",
                      },
                    ]}
                  />
                ))}
              </View>
              <Text
                style={[styles.strengthText, { color: getStrengthColor() }]}
              >
                {passwordStrength.strength === "weak" && "Weak password"}
                {passwordStrength.strength === "medium" && "Medium strength"}
                {passwordStrength.strength === "strong" && "Strong password"}
              </Text>
            </View>
          )}

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setStoredConfirmPassword(text);
              if (confirmPasswordError) {
                const validation = validateConfirmPassword(password, text);
                setConfirmPasswordError(validation.error);
              }
            }}
            onBlur={() => {
              const validation = validateConfirmPassword(
                password,
                confirmPassword
              );
              setConfirmPasswordError(validation.error);
            }}
            placeholder="Re-enter your password"
            secureTextEntry
            error={confirmPasswordError}
            editable={!isLoading}
          />

          <Button
            title="Sign Up"
            onPress={handleSignUp}
            loading={isLoading}
            disabled={isLoading || !isFormValid()}
            style={styles.signUpButton}
          />

          <View style={styles.loginLinkContainer}>
            <Text style={[styles.loginText, { color: subtextColor }]}>
              Already have an account?{" "}
            </Text>
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
              variant="outline"
              disabled={isLoading}
              style={styles.loginButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 50,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  phoneContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  countryCodeContainer: {
    width: 140,
  },
  phoneNumberContainer: {
    flex: 1,
  },
  phoneInput: {
    marginBottom: 0,
  },
  strengthContainer: {
    marginTop: -12,
    marginBottom: 20,
  },
  strengthBars: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: "500",
  },
  signUpButton: {
    marginTop: 8,
  },
  loginLinkContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    marginBottom: 12,
  },
  loginButton: {
    paddingHorizontal: 32,
  },
});
