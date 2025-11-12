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
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as LocalAuthentication from "expo-local-authentication";
import { Button, TextInput } from "../components";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/auth";

type LoginScreenNavigationProp = NativeStackNavigationProp<any, "Login">;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

export function Login({ navigation }: LoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string>("");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000000" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const subtextColor = isDark ? "#8E8E93" : "#6C6C70";

  // Check biometric availability on mount
  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const available = compatible && enrolled;

      setIsBiometricAvailable(available);

      if (available) {
        const types =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (Platform.OS === "android") {
          if (
            types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
          ) {
            setBiometricType("Fingerprint");
          } else {
            setBiometricType("Biometric");
          }
        } else if (Platform.OS === "ios") {
          if (
            types.includes(
              LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
            )
          ) {
            setBiometricType("Face ID");
          } else {
            setBiometricType("Biometric");
          }
        } else {
          setBiometricType("Biometric");
        }
      }
    } catch (error) {
      console.error("Error checking biometric availability:", error);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Authenticate with ${biometricType}`,
        fallbackLabel: "Use Passcode",
        disableDeviceFallback: false,
      });

      if (result.success) {
        // Reset failed attempts after successful biometric auth
        setFailedAttempts(0);
        Alert.alert(
          "Authentication Successful",
          "You can now try logging in again.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Authentication Failed",
          "Biometric authentication was not successful. Please try again.",
          [{ text: "OK" }]
        );
      }
    } catch (error: any) {
      console.error("Biometric authentication error:", error);
      Alert.alert(
        "Authentication Error",
        "An error occurred during biometric authentication.",
        [{ text: "OK" }]
      );
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    // Check if user needs biometric authentication after 5 failed attempts
    if (failedAttempts >= 5 && isBiometricAvailable) {
      Alert.alert(
        "Too Many Failed Attempts",
        `Please authenticate with ${biometricType} to continue.`,
        [
          {
            text: "Authenticate",
            onPress: handleBiometricAuth,
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(email.trim(), password);
      // Reset failed attempts on successful login
      setFailedAttempts(0);
      // Navigation will be handled by the auth flow
    } catch (error: any) {
      // Increment failed attempts on login failure
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);

      let errorMessage =
        error.message || "An error occurred during login. Please try again.";

      // Add warning about biometric requirement after 5 attempts
      if (newFailedAttempts >= 5 && isBiometricAvailable) {
        errorMessage = `Too many failed attempts. Please authenticate with ${biometricType} to continue.`;
      } else if (newFailedAttempts >= 3 && isBiometricAvailable) {
        errorMessage += `\n\nAttempts remaining: ${5 - newFailedAttempts}`;
      }

      // Defer Alert to allow React to process state updates first
      setTimeout(() => {
        Alert.alert("Login Failed", errorMessage, [{ text: "OK" }]);
      }, 0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { color: subtextColor }]}>
            Sign in to continue
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            editable={!isLoading}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
            }}
            placeholder="Enter your password"
            secureTextEntry
            error={passwordError}
            editable={!isLoading}
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            disabled={
              isLoading || (failedAttempts >= 5 && isBiometricAvailable)
            }
            style={styles.loginButton}
          />

          {failedAttempts > 0 && failedAttempts < 5 && (
            <View style={styles.attemptsContainer}>
              <Text style={[styles.attemptsText, { color: "#FF3B30" }]}>
                Failed attempts: {failedAttempts}/5
              </Text>
            </View>
          )}

          {failedAttempts >= 5 && isBiometricAvailable && (
            <View style={styles.biometricContainer}>
              <Text style={[styles.biometricWarning, { color: "#FF3B30" }]}>
                Too many failed attempts
              </Text>
              <Button
                title={`Authenticate with ${biometricType}`}
                onPress={handleBiometricAuth}
                variant="secondary"
                style={styles.biometricButton}
              />
            </View>
          )}

          <View style={styles.signUpLinkContainer}>
            <Text style={[styles.signUpText, { color: subtextColor }]}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              disabled={isLoading}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
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
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 48,
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
  loginButton: {
    marginTop: 8,
  },
  attemptsContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  attemptsText: {
    fontSize: 14,
    fontWeight: "600",
  },
  biometricContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  biometricWarning: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  biometricButton: {
    width: "100%",
  },
  signUpLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
});
