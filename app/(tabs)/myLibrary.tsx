import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { EmptyState, RecentBooks, Trending } from "@/components";
import CustomHeader from "@/components/CustomHeader";
import { getLatestBooks, getAllBooks } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import DropDownPicker from "react-native-dropdown-picker";
import { Book } from "@/types/types";

type DropDownItem = {
  label: string;
  value: string;
};

const MyLibrary = () => {
  const { data, refetch } = useAppwrite(getAllBooks);
  const books = data as Book[];

  const { data: latestBooks } = useAppwrite(getLatestBooks);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  //console.log(books);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownItem[]>([]);

  const myTheme = require("@/dropDownTheme");

  DropDownPicker.addTheme("LIGHT", myTheme);
  DropDownPicker.setTheme("LIGHT");

  useEffect(() => {
    if (value) {
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
        //console.log(uniqueGenres);
        setItems(genreItems);
      } catch (error) {
        console.error("Error fetching genres:", error);
        Alert.alert("Error", "Failed to load genres");
      }
    };
    fetchGenres();
  }, [books]);

  return (
    <>
      <SafeAreaView className="h-full bg-white px-4">
        <CustomHeader />
        <View className="mt-2">
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
            mode="BADGE"
            placeholderStyle={{
              color: "black",
              fontWeight: "bold",
            }}
          />
        </View>
      </SafeAreaView>
      <StatusBar backgroundColor="black" style="dark" />
    </>
  );
};

export default MyLibrary;
