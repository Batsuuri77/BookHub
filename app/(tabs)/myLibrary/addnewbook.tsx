import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  RefreshControl,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import Input from "@/components/Input";
import { CustomButton, EmptyState } from "@/components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { icons } from "@/constants";
import * as ImagePicker from "expo-image-picker";
import { appwriteConfig, databases, storage } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";

const AddNewBook = () => {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [item, setItem] = useState([
    { label: "Fiction", value: "fiction" },
    { label: "Fantasy", value: "fantasy", parent: "fiction" },
    { label: "Science Fiction", value: "science_fiction", parent: "fiction" },
    { label: "Dystopian", value: "distopian", parent: "fiction" },
    {
      label: "Action & Adventure",
      value: "action_adventure",
      parent: "fiction",
    },
    { label: "Mystery", value: "mystery", parent: "fiction" },
    { label: "Horror", value: "horror", parent: "fiction" },
    {
      label: "Thriller & Suspense",
      value: "thriller_suspense",
      parent: "fiction",
    },
    {
      label: "Historical Fiction",
      value: "historical_fiction",
      parent: "fiction",
    },
    { label: "Romance", value: "romance", parent: "fiction" },
    {
      label: "Contemporary Fiction",
      value: "contemporary_fiction",
      parent: "fiction",
    },
    { label: "Literary Fiction", value: "literary_fiction", parent: "fiction" },
    { label: "Magical Realism", value: "magical_realism", parent: "fiction" },
    { label: "Novel", value: "novel", parent: "fiction" },
    { label: "Short Story", value: "short_story", parent: "fiction" },
    { label: "Fairy tale", value: "fairy_tale", parent: "fiction" },

    { label: "Non-fiction", value: "non_fiction" },
    { label: "Essay", value: "essay", parent: "non_fiction" },
    {
      label: "Art & Photography",
      value: "art_photography",
      parent: "non_fiction",
    },
    { label: "Travel", value: "travel", parent: "non_fiction" },
    { label: "Guide/How-to", value: "guide_howto", parent: "non_fiction" },
    {
      label: "Religion & Spirituality",
      value: "religion_spirituality",
      parent: "non_fiction",
    },
    {
      label: "Humanities & Social Sciences",
      value: "humanities_socialsciences",
      parent: "non_fiction",
    },
    {
      label: "Parenting & Families",
      value: "parenting_families",
      parent: "non_fiction",
    },
    {
      label: "Memoir & Autobiography",
      value: "memoir_autobiography",
      parent: "non_fiction",
    },
    { label: "Humor", value: "humor", parent: "non_fiction" },
    { label: "Food & Drink", value: "food_drink", parent: "non_fiction" },
    { label: "Biography", value: "biography", parent: "non_fiction" },
    { label: "History", value: "history", parent: "non_fiction" },
    { label: "Self-help", value: "self_help", parent: "non_fiction" },

    { label: "Crime", value: "crime", parent: "non_fiction" },
    {
      label: "Science & Technologies",
      value: "science_technologies",
      parent: "non_fiction",
    },
    { label: "Educational", value: "educational", parent: "non_fiction" },
    { label: "Poetry", value: "poetry" },
    { label: "Children's book", value: "childrens_book" },
  ]);

  const [nee, setNee] = useState(false);
  const [assess, setAssess] = useState(null);
  const [type, setType] = useState([
    { label: "Hard Copy", value: "hardcopy" },
    { label: "E-book", value: "ebook" },
  ]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [goalDate, setGoalDate] = useState<string | null>(null);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const myTheme = require("@/dropDownTheme");
  DropDownPicker.addTheme("LIGHT", myTheme);
  DropDownPicker.setTheme("LIGHT");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Book",
      headerStyle: {
        backgroundColor: "#ffffff",
      },
      headerTintColor: "black",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.log("A date has been picked: ", date);
    setGoalDate(format(date, "MMMM dd, yyyy"));

    hideDatePicker();
  };

  const handleUploadPic = async () => {
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
      setImageUri(result.assets[0].uri);
    }
  };

  const handleTitleChange = (text: any) => {
    setTitle(text);
  };

  const handleAuthorChange = (text: any) => {
    setAuthor(text);
  };

  const handleSubmit = async () => {
    console.log({ title, author, value, assess, imageUri, goalDate });

    if (!title || !author || !value || !assess) {
      Alert.alert("Please fill out all fields.");
      return;
    }

    setIsLoading(true);
    try {
      // Create the book document first with a placeholder for thumbNail
      const currentDate = new Date().toISOString();
      const bookResult = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.bookCollectionId,
        ID.unique(),
        {
          title,
          author,
          genre: value,
          goal: goalDate,
          bookType: assess,
          thumbNail: null, // Set initial value as null
          addedDate: currentDate,
        }
      );

      let imageUrl = null;
      if (imageUri) {
        const fileInfo = await fetch(imageUri);
        const blob = await fileInfo.blob();

        const fileData = {
          uri: imageUri,
          type: blob.type,
          name: `uploaded_${Date.now()}.jpg`,
          size: blob.size,
        };

        const uploadResponse = await storage.createFile(
          appwriteConfig.storageId,
          ID.unique(),
          fileData
        );

        imageUrl = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.storageId}/files/${uploadResponse.$id}/view?project=${appwriteConfig.projectId}&mode=admin`;

        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.bookCollectionId,
          bookResult.$id,
          {
            thumbNail: imageUrl,
          }
        );
      }

      Alert.alert("Success", "Book added successfully!");
      navigation.goBack();
    } catch (error: any) {
      console.error("Error adding book: ", error);
      Alert.alert("Error", `Failed to add the book: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView className="h-full bg-white px-4">
        <FlatList
          data={[{ key: "form" }]}
          renderItem={() => (
            <>
              <View className="w-full px-4">
                <CustomHeader />
                <Input
                  title={"1. Insert a title"}
                  value={title}
                  placeholder={"Insert a title"}
                  handleChangeText={handleTitleChange}
                  otherStyles={"w-full"}
                ></Input>
                <Text className="text-base text-textcolor font-medium ">
                  2. Select a genre
                </Text>
                <View className="mt-2 relative z-10 ">
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={item}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItem}
                    placeholder="Select a genre"
                    theme="LIGHT"
                    multiple={false}
                    placeholderStyle={{
                      color: "black",
                      fontWeight: "semibold",
                    }}
                    dropDownContainerStyle={{ zIndex: 9999 }}
                  />
                </View>
                <Input
                  title={"3. Insert an author"}
                  value={author}
                  placeholder={"Insert an author"}
                  handleChangeText={handleAuthorChange}
                  otherStyles={"w-full"}
                ></Input>
                <Text className="text-base text-textcolor font-medium ">
                  4. Set a goal
                </Text>
                <View className="ml-4 flex flex-row justify-between items-center pr-8">
                  <TouchableOpacity
                    className="bg-primary w-50% flex items-center justify-center rounded-2xl px-4 py-1"
                    onPress={showDatePicker}
                  >
                    <Text className="text-center text-base font-medium text-white">
                      Set a goal
                    </Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                  {goalDate && (
                    <Text className="text-sm text-textcolor font-medium text-center ml-2">
                      {goalDate}
                    </Text>
                  )}
                </View>
                <Text className="text-base text-textcolor font-medium ">
                  5. Select a type
                </Text>
                <View className="mt-2 relative z-10 ">
                  <DropDownPicker
                    open={nee}
                    value={assess}
                    items={type}
                    setOpen={setNee}
                    setValue={setAssess}
                    setItems={setType}
                    placeholder="Select a type"
                    theme="LIGHT"
                    multiple={false}
                    placeholderStyle={{
                      color: "black",
                      fontWeight: "semibold",
                    }}
                    dropDownContainerStyle={{ zIndex: 9999 }}
                  />
                </View>
                <View className="">
                  <Text className="text-base text-textcolor font-medium mb-2">
                    6. Insert picture
                  </Text>
                  <View className=" bg-stone-200 w-36 h-64 rounded-xl flex justify-center items-center">
                    {imageUri ? (
                      <>
                        <TouchableOpacity
                          onPress={handleUploadPic}
                          className="w-full h-full overflow-hidden"
                        >
                          <Image
                            source={{ uri: imageUri }}
                            className="w-full h-full rounded-xl overflow-hidden aspect-auto"
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setImageUri(null)}
                          className="absolute top-3 right-3"
                        >
                          <Image className="w-4 h-4" source={icons.x}></Image>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity onPress={handleUploadPic}>
                        <Image source={icons.plus} className="w-8 h-8 p-2" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <CustomButton
                  title={"Save a book"}
                  handlePress={handleSubmit}
                  containerStyles={"bg-primary mt-4 mx-4 h-[56px]"}
                  textStyles={undefined}
                  isLoading={undefined}
                ></CustomButton>

                <StatusBar backgroundColor="black" style="dark" />
              </View>
            </>
          )}
          keyExtractor={(item) => item.key}
          nestedScrollEnabled={false}
        />
      </SafeAreaView>
    </>
  );
};

export default AddNewBook;
