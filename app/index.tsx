import "react-native-reanimated";
import { Text, View, ScrollView, Image, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { CustomButton, FormField } from "../components";
import React, { useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
            <FormField
              title="Username"
              value={username}
              placeholder="username"
              onChangeText={setUsername}
              handleChangeText={undefined}
              otherStyles={undefined}
            ></FormField>
            <FormField
              title="Password"
              value={password}
              placeholder="password"
              onChangeText={setPassword}
              secureTextEntry={true}
              handleChangeText={undefined}
              otherStyles={undefined}
            ></FormField>
            <Link
              href={"../home"}
              className="underline text-xs text-blue text-right mb-2"
            >
              Forgot your password
            </Link>
            <CustomButton
              title="Log in"
              handlePress={() => {}}
              containerStyles="w-full my-3 bg-primary"
              textStyles={undefined}
              isLoading={undefined}
            ></CustomButton>
            <CustomButton
              title="Sign up"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full my-3 bg-grey"
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

// https://www.youtube.com/watch?v=ZBCUegTZF7M
