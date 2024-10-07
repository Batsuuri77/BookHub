import React from "react";
import { useState } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import { createNote } from "@/lib/appwrite"; // Import your createNote function
import { useGlobalContext } from "@/context/GlobalProvider"; // Import GlobalContext for user
import { useLocalSearchParams, useNavigation } from "expo-router"; // For navigation
import { ContextInput, CustomButton, CustomHeader } from "@/components";
import Input from "@/components/Input";
import { isLoading } from "expo-font";
import { StatusBar } from "expo-status-bar";

interface AddNewNoteProps {
  bookId: string;
}

const AddNewNote = () => {
  const { bookId } = useLocalSearchParams();
  console.log("Book ID: ", bookId);

  if (typeof bookId !== "string") {
    console.error("Invalid bookId. Please pass a valid bookId.");
  }

  const { user } = useGlobalContext();
  const [context, setContext] = useState("");
  const [chapter, setChapter] = useState("");
  const [page, setPage] = useState("");
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateNote = async () => {
    if (!context) {
      Alert.alert("Error", "Please fill context");
      return;
    }

    setIsSubmitting(true);

    try {
      const noteData = {
        context,
        chapter,
        page,
        bookId: bookId,
        userId: user.$id,
      };
      console.log("Creating note with the following data:", noteData);
      await createNote(noteData);

      Alert.alert("Success", "Note created successfully!");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white px-4">
      <View className="w-full px-4">
        <CustomHeader />
        <ContextInput
          title={"1. Context"}
          value={context}
          placeholder={"Context"}
          handleChangeText={setContext}
          otherStyles={"w-full"}
        ></ContextInput>
        <Input
          title={"2. Chapter"}
          value={chapter}
          placeholder={"Chapter name"}
          handleChangeText={setChapter}
          otherStyles={undefined}
        ></Input>
        <Input
          title={"3. Page"}
          value={page}
          placeholder={"Page number"}
          handleChangeText={setPage}
          otherStyles={undefined}
        ></Input>
        <CustomButton
          title={"Save"}
          handlePress={handleCreateNote}
          containerStyles="w-full h-[56px] my-3 bg-primary"
          textStyles={undefined}
          isLoading={isSubmitting}
        />
      </View>
      <StatusBar backgroundColor="black" style="dark" />
    </SafeAreaView>
  );
};

export default AddNewNote;
