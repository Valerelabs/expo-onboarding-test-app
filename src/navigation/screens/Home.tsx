import { Text } from "@react-navigation/elements";
import { StyleSheet, View, ScrollView, useColorScheme } from "react-native";
import { useAuth } from "../../context/AuthContext";

export function Home() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000000" : "#FFFFFF";
  const cardBackground = isDark ? "#1C1C1E" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const subtextColor = isDark ? "#8E8E93" : "#6C6C70";

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: cardBackground }]}>
          <Text style={[styles.greeting, { color: textColor }]}>
            Welcome back, {user?.name || "User"}! 👋
          </Text>
          <Text style={[styles.subtitle, { color: subtextColor }]}>
            You're now logged in to your account
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: cardBackground }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>
            Account Information
          </Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: subtextColor }]}>
              Email:
            </Text>
            <Text style={[styles.infoValue, { color: textColor }]}>
              {user?.email}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: subtextColor }]}>
              User ID:
            </Text>
            <Text style={[styles.infoValue, { color: textColor }]}>
              {user?.id}
            </Text>
          </View>
        </View>
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
  },
  card: {
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
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "400",
  },
  logoutButton: {
    marginTop: 8,
  },
});
