import "react-native-reanimated";
import { Text, View, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[177px] h-[160px]"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
