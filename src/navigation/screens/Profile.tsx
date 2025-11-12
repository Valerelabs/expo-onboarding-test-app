import { Text } from "@react-navigation/elements";
import {
  StyleSheet,
  View,
  ScrollView,
  useColorScheme,
  Alert,
} from "react-native";
import { Button } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export function Profile() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000000" : "#FFFFFF";
  const cardBackground = isDark ? "#1C1C1E" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const subtextColor = isDark ? "#8E8E93" : "#6C6C70";

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          setIsLoggingOut(true);
          try {
            await logout();
          } catch (error) {
            Alert.alert("Error", "Failed to logout. Please try again.");
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: "#007AFF" }]}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
        </View>

        <Text style={[styles.name, { color: textColor }]}>{user?.name}</Text>
        <Text style={[styles.email, { color: subtextColor }]}>
          {user?.email}
        </Text>

        <View style={[styles.card, { backgroundColor: cardBackground }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>
            Profile Details
          </Text>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: subtextColor }]}>
              Email
            </Text>
            <Text style={[styles.detailValue, { color: textColor }]}>
              {user?.email}
            </Text>
          </View>
          {user?.firstName && (
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: subtextColor }]}>
                First Name
              </Text>
              <Text style={[styles.detailValue, { color: textColor }]}>
                {user?.firstName}
              </Text>
            </View>
          )}
          {user?.lastName && (
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: subtextColor }]}>
                Last Name
              </Text>
              <Text style={[styles.detailValue, { color: textColor }]}>
                {user?.lastName}
              </Text>
            </View>
          )}
          {user?.phoneNumber && (
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: subtextColor }]}>
                Phone
              </Text>
              <Text style={[styles.detailValue, { color: textColor }]}>
                {user?.countryCode} {user?.phoneNumber}
              </Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: subtextColor }]}>
              User ID
            </Text>
            <Text
              style={[styles.detailValue, { color: textColor }]}
              numberOfLines={1}
            >
              {user?.id}
            </Text>
          </View>
        </View>

        <Button
          title="Logout"
          onPress={handleLogout}
          loading={isLoggingOut}
          disabled={isLoggingOut}
          variant="outline"
          style={styles.logoutButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  avatarContainer: {
    marginVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 32,
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "400",
  },
  logoutButton: {
    width: "100%",
    marginTop: 8,
  },
});
