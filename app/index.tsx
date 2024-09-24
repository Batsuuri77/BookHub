import "react-native-reanimated";
import { View, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { CustomButton } from "../components";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[177px] h-[160px]"
            resizeMode="contain"
          />
          <View>
            <CustomButton
              title="Continue"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full h-[56px] my-3 bg-primary"
              textStyles={undefined}
              isLoading={undefined}
            ></CustomButton>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="white" style="dark" />
    </SafeAreaView>
  );
}
