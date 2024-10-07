import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { updateUser, uploadFile } from "@/lib/appwrite";
import * as ImagePicker from "expo-image-picker";

const Account = () => {
  const { user, setUser } = useGlobalContext();

  const [profilePicture, setProfilePicture] = useState(user?.avatar);
  const [name, setName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo);
  const [email, setEmail] = useState(user?.email);
  const [dob, setDob] = useState(user?.dob);

  const handleSave = async () => {
    try {
      if (!user) {
        console.error("No user context available.");
        return;
      }
      const updatedUser = await updateUser(
        user.$id,
        email,
        user.username,
        name,
        lastName,
        phoneNo,
        dob,
        profilePicture
      );
      setUser(updatedUser);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleChangeProfilePicture = async () => {
    console.log("called upload");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need media permissions to make this work!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      try {
        // Convert URI to a file object
        const file = {
          uri: uri,
          type: "image/jpeg",
          name: uri.split("/").pop(),
          size: 5,
        };

        console.log(file);
        // Call the uploadFile function
        const fileUrl = await uploadFile(file, "image");

        if (fileUrl) {
          setProfilePicture(fileUrl);
        } else {
          Alert.alert(
            "Upload failed",
            "The image could not be uploaded. Please try again."
          );
        }
      } catch (error) {
        Alert.alert(
          "Upload failed",
          "Unable to upload image. Please try again."
        );
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity onPress={handleChangeProfilePicture}>
              <Text style={styles.changeProfilePic}>
                Change Profile Picture
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNo}
                onChangeText={(text) => setPhoneNo(text)}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} value={email} editable={false} />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                value={dob}
                onChangeText={(text) => setDob(text)}
              />
            </View>
            {/* Repeat as needed for additional fields */}
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-2 right-10 left-10 transform -translate-x-1/3 bg-transparent">
        <CustomButton
          title={"Save"}
          handlePress={handleSave}
          containerStyles="w-90 h-10 rounded-full px-4 py-2 bg-primary"
          textStyles="text-base"
          isLoading={undefined}
        ></CustomButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 80, // Ensure space for fixed button
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  appBarButton: {
    fontSize: 16,
    color: "#007bff",
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  changeProfilePic: {
    color: "blue",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  formContainer: {
    marginVertical: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    width: "100%", // Ensure full width for the input
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    left: "50%",
    transform: [{ translateX: -80 }],
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: 160,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Account;

function launchImageLibrary(
  options: { mediaType: string; includeBase64: boolean },
  arg1: (response: any) => void
) {
  throw new Error("Function not implemented.");
}
