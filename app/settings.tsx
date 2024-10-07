import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut } from "@/lib/appwrite";
import { useRouter, Href } from "expo-router";

const settings = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLogged(false);
      router.push("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(
          "Logout Error",
          error.message || "An unexpected error occurred."
        );
      } else {
        Alert.alert("Logout Error", "An unexpected error occurred.");
      }
    }
  };

  const navigateToPage = (path: Href) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigateToPage("/account")}
        style={styles.textButton}
      >
        <Text style={styles.textButtonText}>Account Settings</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigateToPage("/notifications")}
        style={styles.textButton}
      >
        <Text style={styles.textButtonText}>Notifications</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigateToPage("/sign-in")}
        style={styles.textButton}
      >
        <Text style={styles.textButtonText}>Privacy and Security</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigateToPage("/notifications")}
        style={styles.textButton}
      >
        <Text style={styles.textButtonText}>Display and Interfaces</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigateToPage("/notifications")}
        style={styles.textButton}
      >
        <Text style={styles.textButtonText}>Library Management</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigateToPage("/notifications")}
        style={styles.textButton}
      >
        <Text style={styles.textButtonText}>Help and Support</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigateToPage("/notifications")}
        style={styles.textButton}
      >
        <Text style={styles.textButtonText}>App Information</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textButton: {
    paddingVertical: 10,
  },
  textButtonText: {
    fontSize: 18,
    color: "black",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});

export default settings;
