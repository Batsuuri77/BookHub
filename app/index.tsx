import "react-native-reanimated";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pbold">Bookhub</Text>
      <StatusBar style="auto" />
      <Link href="../home" style={{ color: "blue" }}>
        Go to home
      </Link>
    </View>
  );
}
