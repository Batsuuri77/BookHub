import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native-animatable";
import { images } from "../../constants";
import { FormField, CustomButton } from "@/components";
import { Link, router } from "expo-router";
import { useState } from "react";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

// const countryCodes = [
//   { label: "+1 USA", value: "+1" },
//   { label: "+91 India", value: "+91" },
//   { label: "+44 UK", value: "+44" },
// ];

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // countryCode: "+61",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const context = useGlobalContext();
  console.log(context);

  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    if (form.password.length < 8 || form.password.length > 36) {
      Alert.alert(
        "Error",
        "Password must be between 8 and 36 characters long."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      //set it to global state ...
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
    // const fullPhoneNumber = parseInt(form.countryCode + form.phoneNumber, 10);
    // console.log("Full phone number:", fullPhoneNumber);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="flex w-full justify-center items-center min-h-[90vh] px-4">
          <Image
            source={images.logo_hor}
            className="w-[177px] h-[50px]"
            resizeMode="contain"
          />
          <View>
            <FormField
              title="User name"
              value={form.username}
              placeholder="User name"
              handleChangeText={(e: any) => setForm({ ...form, username: e })}
              otherStyles={undefined}
            ></FormField>
            {/* <View className="flex flex-row items-center mb-3">
              <View className="mr-1">
                <Text className="text-base text-textcolor font-imedium">
                  Country Code
                </Text>
                <Picker
                  onValueChange={(value: any) =>
                    setForm({ ...form, countryCode: value })
                  }
                  items={countryCodes}
                  value={form.countryCode}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      width: 80,
                      height: 56,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: "gray",
                      borderRadius: 10,
                      color: "black",
                      backgroundColor: "#f8f8f8",
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderWidth: 0.5,
                      borderColor: "gray",
                      borderRadius: 8,
                      color: "black",
                      paddingRight: 30,
                      backgroundColor: "#f8f8f8",
                    },
                  }}
                />
              </View>

              <FormField
                title="Phone Number"
                value={form.phoneNumber}
                placeholder="Phone Number"
                handleChangeText={(e: any) =>
                  setForm({ ...form, phoneNumber: e })
                }
                otherStyles="flex-1"
                keyboardType="phone-pad"
              />
            </View> */}
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
            <FormField
              title="Confirm Password"
              value={form.confirmPassword}
              placeholder="Confirm password"
              handleChangeText={(e: any) =>
                setForm({ ...form, confirmPassword: e })
              }
              otherStyles={undefined}
            ></FormField>
            <CustomButton
              title="Sign up"
              handlePress={submit}
              containerStyles="w-full my-3 bg-primary"
              textStyles={undefined}
              isLoading={isSubmitting}
            ></CustomButton>
            <View className="flex justify-center items-center flex-row gap-3">
              <Text className="text-lg text-textcolor font-iregular">
                Have an account already?
              </Text>
              <Link
                href={"/sign-in"}
                className="text-lg text-primary font-iregular"
              >
                Log In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
