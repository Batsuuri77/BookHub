import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native-animatable";
import { images } from "../../constants";
import { FormField, CustomButton } from "@/components";
import { Link, router } from "expo-router";
import { useState } from "react";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    if (form.password.length < 8 || form.password.length > 35) {
      Alert.alert(
        "Error",
        "Password must be between 8 and 35 characters long."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "An unexpected error occurred.");
        console.log(error);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
        console.log(error);
      }
    } finally {
      setIsSubmitting(false);
    }
    // const fullPhoneNumber = parseInt(form.countryCode + form.phoneNumber, 10);
    // console.log("Full phone number:", fullPhoneNumber);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="flex w-full justify-center items-center min-h-[95vh] px-4">
          <Image
            source={images.logo}
            className="w-[177px] h-[160px]"
            resizeMode="contain"
          />
          <View>
            <FormField
              title="Email"
              value={form.email}
              placeholder="Email"
              handleChangeText={(e: any) => setForm({ ...form, email: e })}
              otherStyles={undefined}
              keyboardType="email-address"
            ></FormField>
            <FormField
              title="Password"
              value={form.password}
              placeholder="Password"
              handleChangeText={(e: any) => setForm({ ...form, password: e })}
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
              handlePress={submit}
              containerStyles="w-full h-[56px] my-3 bg-primary"
              textStyles={undefined}
              isLoading={isSubmitting}
            ></CustomButton>
            <View className="flex justify-center items-center flex-row gap-3">
              <Text className="text-lg text-textcolor font-iregular">
                Don't have an account
              </Text>
              <Link
                href={"/sign-up"}
                className="text-lg text-primary font-iregular"
              >
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
