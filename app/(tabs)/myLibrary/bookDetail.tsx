import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import { icons } from "@/constants";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  getAllNotes,
  getBookById,
  updateFavouriteStatus,
} from "@/lib/appwrite";
import { format } from "date-fns";
import Notes from "@/components/Notes";
import { Note } from "@/types/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { StatusBar } from "expo-status-bar";

const BookDetail = () => {
  const navigation = useNavigation();
  const { bookId } = useLocalSearchParams();
  //console.log(bookId);
  const { user } = useGlobalContext();
  //console.log(user);

  const [book, setBook] = useState<any>(null);
  const [durationMessage, setDurationMessage] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) {
        console.error("No bookId provided");
        return;
      }

      try {
        if (bookId) {
          //console.log("Fetching book with ID:", bookId);

          const bookData = await getBookById(bookId as string);
          //console.log("Fetched book data:", bookData);

          setBook(bookData);
        }
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  //console.log(book);

  //Calculate duration between achievement date and goal date
  useEffect(() => {
    if (book?.achievement && book?.goal) {
      const achievementDate = new Date(book.achievement);
      const goalDate = new Date(book.goal);

      if (!isNaN(achievementDate.getTime()) && !isNaN(goalDate.getTime())) {
        const isEarly = achievementDate < goalDate;

        const startDate = isEarly ? achievementDate : goalDate;
        const endDate = isEarly ? goalDate : achievementDate;

        let months =
          (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          (endDate.getMonth() - startDate.getMonth());

        let days = endDate.getDate() - startDate.getDate();

        if (days < 0) {
          months -= 1;
          const previousMonth = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            0
          );
          days += previousMonth.getDate();
        }

        months = Math.abs(months);
        days = Math.abs(days);

        let durationMessage = "";

        if (months > 0) {
          durationMessage += `${months} month${months !== 1 ? "s" : ""} `;
        }

        if (days > 0 || months === 0) {
          durationMessage += `${days} day${days !== 1 ? "s" : ""} `;
        }

        durationMessage += isEarly ? "early" : "late";
        setDurationMessage(durationMessage);

        console.log(durationMessage);
      } else {
        console.error("Invalid dates provided.");
      }
    }
  }, [book]);

  //Get all notes by bookId
  useEffect(() => {
    const fetchNotes = async () => {
      if (!bookId) return;

      try {
        const fetchedNotes = await getAllNotes(bookId, user.$id);

        if (fetchedNotes) {
          const mappedNotes: Note[] = fetchedNotes.map((doc) => ({
            $id: doc.$id,
            context: doc.context || "",
            chapter: doc.chapter || "",
            page: doc.page || "",
            createdAt: doc.createdAt || new Date().toISOString(),
          }));

          setNotes(mappedNotes);
          console.log("Mapped notes:", mappedNotes);
        } else {
          console.log("No notes found for this book.");
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    if (bookId) {
      fetchNotes();
    }
  }, [bookId]);

  //Error handling conditions
  if (!book) {
    return (
      <SafeAreaView className="h-full bg-white px-4">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!bookId) {
    return (
      <SafeAreaView className="h-full bg-white px-4">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  //Go back function for go back button
  const handleGoBack = () => {
    navigation.goBack();
  };

  //Toggle favourite status of the book
  const toggleFavourite = async () => {
    if (!book) {
      console.error("Book data is not available");
      return;
    }

    try {
      const updatedFavourite = !book.favourite;

      await updateFavouriteStatus(book.$id, updatedFavourite);
      setBook((prevBook: any) => ({
        ...prevBook,
        favourite: updatedFavourite,
      }));
      book.favourite = updatedFavourite;
      //console.log(updatedFavourite);
    } catch (error) {
      console.error("Failed to update favourite status:", error);
      Alert.alert("Error", "Could not update favourite status.");
    }
  };

  const createNote = async () => {};

  //Set background color based on the state of the book
  const backgroundColor =
    book.state === "New" ? "bg-green" : book.state === "Lent" ? "bg-blue" : "";

  //Change format of dates
  const formattedAchievement = format(
    new Date(book.achievement),
    "MMM dd, yyyy"
  );
  const formattedgoal = format(new Date(book.goal), "MMM dd, yyyy");
  const formattedAddedDate = format(new Date(book.addedDate), "MMM dd, yyyy");

  return (
    <>
      <SafeAreaView className="flex-1 h-full bg-white px-4">
        <CustomHeader />
        <ScrollView className="flex-1">
          {/* Go back button and book title and author as a subject */}
          <View className="mt-2 w-full h-12 flex-row items-center justify-between">
            <View className="w-12 h-12 p-2 flex items-center justify-center">
              <Image source={icons.back} className="w-10 h-10"></Image>
              <TouchableOpacity
                onPress={handleGoBack}
                className="w-full h-full absolute"
              ></TouchableOpacity>
            </View>
            <View className=" flex-col items-center justify-center mr-24 max-w-full">
              <Text className="font-semibold text-xl text-center truncate max-w-xs">
                {book?.title}
              </Text>
              <Text className="font-semibold text-sm text-grey truncate max-w-xs text-center">
                {book?.author}
              </Text>
            </View>
          </View>

          {/* Thumbnail pic and genre, goal, achievement with addedDate */}
          <View className="flex-row items-start mt-2 max-w-full border-b border-grey pb-2">
            <View className="mr-2">
              <Image source={{ uri: book?.thumbNail }} className="w-40 h-60" />
              <View className="flex flex-row justify-between px-2">
                <TouchableOpacity
                  className="flex justify-center items-center w-6 h-6 object-contain"
                  onPress={toggleFavourite}
                >
                  <Image
                    source={book.favourite ? icons.heart : icons.favourite}
                    className="w-full h-full"
                  />
                </TouchableOpacity>
                <View
                  className={`${backgroundColor} h-6 w-14 rounded-xl flex items-center justify-center`}
                >
                  <Text className="text-center font-semibold text-white">
                    {book?.state || ""}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-1 flex-col max-w-full items-start py-2 pr-1 ">
              <View className="flex-row py-2 justify-between items-center max-w-full flex border-b border-grey">
                <View className="flex-1 w-full ">
                  <View className="flex flex-col w-full items-start ">
                    <Text className="font-semibold text-sm text-black">
                      Genre
                    </Text>
                    <View className="flex flex-row w-full items-center justify-between">
                      <Text className="font-semibold text-sm text-blue">
                        {book?.genre}
                      </Text>
                    </View>
                  </View>
                </View>
                <Image source={icons.detail} className="w-6 h-6"></Image>
              </View>
              <View className="flex-row py-2 justify-between items-center max-w-full flex border-b border-grey">
                <View className="flex-1 w-full ">
                  <View className="flex flex-col w-full items-start ">
                    <Text className="font-semibold text-sm text-black">
                      Goal
                    </Text>
                    <View className="flex flex-row w-full items-center justify-between">
                      <Text className="text-sm text-black">
                        {formattedgoal}
                      </Text>
                    </View>
                  </View>
                </View>
                <Image source={icons.detail} className="w-6 h-6"></Image>
              </View>
              <View className="flex-row py-2 justify-between items-center max-w-full flex border-b border-grey">
                <View className="flex-1 w-full ">
                  <View className="flex flex-col w-full items-start ">
                    <Text className="font-semibold text-sm text-black">
                      Achievement
                    </Text>
                    <View className="flex flex-col w-full items-start justify-between">
                      <Text className="text-sm text-black">
                        {formattedAchievement}
                      </Text>
                      <Text className="text-xs text-green">
                        {durationMessage}
                      </Text>
                    </View>
                  </View>
                </View>
                <Image source={icons.detail} className="w-6 h-6"></Image>
              </View>
              <View className="flex-row py-2 justify-between items-center max-w-full flex">
                <View className="flex-1 w-full ">
                  <View className="flex flex-col w-full items-start ">
                    <Text className="font-semibold text-sm text-black">
                      Added to the library on
                    </Text>
                    <View className="flex flex-col w-full items-start justify-between">
                      <Text className="text-sm text-black">
                        {formattedAddedDate}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Sharing status section to share the book to another person */}
          <View className="border-b border-grey p-2">
            <Text className="text-lg font-semibold mb-1">Sharing status</Text>
            <View className="flex flex-row justify-between items-center gap-x-4">
              <TouchableOpacity
                onPress={undefined}
                className="bg-[#D9D9D9] rounded-md p-2 flex-1"
              >
                <Text className="text-center font-semibold text-xs">Lend</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={undefined}
                className="bg-[#D9D9D9] rounded-md p-2 flex-1"
              >
                <Text className="text-center font-semibold text-xs">
                  Borrow
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Noting section to add notes to the book*/}
          <View className="border-b border-grey p-2 flex flex-row justify-between">
            <Text className="text-base font-semibold mb-1">Notes</Text>
            <TouchableOpacity
              onPress={() => {
                //console.log(item.$id);
                // router.push(`/myLibrary/bookDetail?bookId=${item.$id}`);

                router.push({
                  pathname: `/addnewnote`,
                  params: { bookId },
                });
              }}
            >
              <Image source={icons.add} className="w-6 h-6"></Image>
            </TouchableOpacity>
          </View>
          <View style={{ height: 400 }}>
            <FlatList
              data={notes}
              keyExtractor={(item) => item?.$id}
              renderItem={({ item }) => (
                <Notes
                  allNotes={{
                    context: item?.context,
                    chapter: item?.chapter,
                    page: item?.page,
                    createdAt: item?.createdAt,
                  }}
                />
              )}
              //style={{ flex: 1 }}
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="black" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default BookDetail;
