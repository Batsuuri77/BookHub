import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { EmptyState, RecentBooks, Trending } from "@/components";
import CustomHeader from "@/components/CustomHeader";
import { getLatestBooks, getAllBooks } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Book } from "@/types/types";

const Home = () => {
  const { data: books, refetch } = useAppwrite(getAllBooks);
  const { data: latestBooks } = useAppwrite(getLatestBooks);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  //console.log(books);

  return (
    <>
      <SafeAreaView className="h-full bg-white px-4">
        <CustomHeader />
        <FlatList<Book>
          data={latestBooks}
          //data={[]}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <RecentBooks latestBooks={item} />}
          ListHeaderComponent={() => (
            <View className="my-2 space-y-6">
              <Text className="m-2 font-semibold text-base">
                Suggested books
              </Text>

              <Trending data={books ?? []} />
              <View className="justify-between items-start flex-row border-b-2 border-grey">
                <View>
                  <Text className="font-isemibold text-base mb-1 ml-2">
                    Recently added
                  </Text>
                </View>
              </View>
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
        <StatusBar backgroundColor="black" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Home;
