import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { EmptyState, Trending } from "@/components";
import CustomHeader from "@/components/CustomHeader";
import { getLatestBooks } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";

const Home = () => {
  const { data: books, refetch } = useAppwrite(getLatestBooks);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  //console.log(books);

  return (
    <SafeAreaView className="h-full bg-white px-4">
      <CustomHeader image={undefined} />
      <FlatList
        data={books}
        //data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl">{item.title}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-2 space-y-6 border-t-2 border-grey">
            <Text className="mx-2 font-isemibold text-base">
              Suggested books
            </Text>
            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
            <View className="justify-between items-start flex-row mb-6 border-b-2 border-grey">
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
      <StatusBar backgroundColor="black" style="auto" />
    </SafeAreaView>
  );
};

export default Home;
