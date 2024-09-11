import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomHeader from "@/components/CustomHeader";
import { getAllBooks, updateFavouriteStatus } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import DropDownPicker from "react-native-dropdown-picker";
import { Book } from "@/types/types";
import { CustomButton, EmptyState } from "@/components";
import icons from "@/constants/icons";
import { Link, router } from "expo-router";

type DropDownItem = {
  label: string;
  value: string;
};

const MyLibrary = () => {
  const { data, refetch } = useAppwrite(getAllBooks);
  const books = data as Book[];
  const [refreshing, setRefreshing] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownItem[]>([]);

  const myTheme = require("@/dropDownTheme");

  DropDownPicker.addTheme("LIGHT", myTheme);
  DropDownPicker.setTheme("LIGHT");

  useEffect(() => {
    if (value === "Select all") {
      setFilteredBooks(books);
    } else if (value) {
      const filtered = books.filter((book) => book.genre === value) || [];
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books || []);
    }
  }, [value, books]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const uniqueGenres = [...new Set(books.map((book) => book.genre))];
        const genreItems = uniqueGenres.map((genre) => ({
          label: genre,
          value: genre,
        }));
        setItems([{ label: "Select all", value: "Select all" }, ...genreItems]);
      } catch (error) {
        console.error("Error fetching genres:", error);
        Alert.alert("Error", "Failed to load genres");
      }
    };
    fetchGenres();
  }, [books]);

  const renderBook = ({ item, index }: { item: Book; index: number }) => {
    const toggleFavourite = async () => {
      try {
        const updatedFavourite = !item.favourite;

        await updateFavouriteStatus(item.$id, updatedFavourite);

        item.favourite = updatedFavourite;
        setFilteredBooks([...filteredBooks]);
      } catch (error) {
        console.error("Failed to update favourite status:", error);
        Alert.alert("Error", "Could not update favourite status.");
      }
    };

    const backgroundColor =
      item.state === "New"
        ? "bg-green"
        : item.state === "Lent"
          ? "bg-blue"
          : "";

    return (
      <View
        className={`w-[50%] p-2 border-b border-grey ${
          index % 2 === 0 ? "border-r border-grey" : ""
        }`}
      >
        <Image source={{ uri: item.thumbNail }} className="w-34 h-60 mt-1" />
        <View className="flex flex-row justify-between mb-2">
          <TouchableOpacity
            className="flex justify-center items-center w-6 h-6 object-contain"
            onPress={toggleFavourite}
          >
            <Image
              source={item.favourite ? icons.heart : icons.favourite}
              className="w-full h-full"
            />
          </TouchableOpacity>
          <View
            className={`${backgroundColor} h-6 w-14 rounded-xl flex items-center justify-center`}
          >
            <Text className="text-center font-semibold text-white">
              {item.state || ""}
            </Text>
          </View>
          <View className="flex justify-center items-center w-6 h-6 object-contain">
            <Image source={icons.dots} className="w-full h-full"></Image>
            <Link href={"/home"} className="w-full h-full absolute"></Link>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView className="h-full bg-white px-4">
        <CustomHeader />
        <View className="mt-2 relative z-10">
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select a genre"
            theme="LIGHT"
            multiple={false}
            placeholderStyle={{
              color: "black",
              fontWeight: "bold",
            }}
            dropDownContainerStyle={{ zIndex: 9999 }}
          />
        </View>
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.$id}
          renderItem={renderBook}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListHeaderComponent={() => (
            <View className="my-2 space-y-6">
              <Text className="color-grey font-semibold text-sm ">
                {filteredBooks.length} books
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title={"No library found"}
              subtitle={
                "You don’t have any libraries created. Click the button below to create your first one."
              }
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

        <View className="absolute bottom-2 right-1/3 transform -translate-x-1/3 bg-transparent">
          <CustomButton
            title={"Add new book +"}
            handlePress={() => {
              //console.log("Navigating to addnewbook page");
              router.push("/myLibrary/addnewbook");
            }}
            containerStyles="w-40 h-10 rounded-full px-4 py-2 bg-primary"
            textStyles="text-base"
            isLoading={undefined}
          ></CustomButton>
        </View>
      </SafeAreaView>
      <StatusBar backgroundColor="black" style="dark" />
    </>
  );
};

export default MyLibrary;
