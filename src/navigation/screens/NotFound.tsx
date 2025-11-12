import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import { Button } from "../../components";

export function NotFound({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text>404</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
