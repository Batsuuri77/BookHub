import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { BookHubPost, CustomButton, EmptyState, EmptyStatePost } from "@/components";
import CustomHeader from "@/components/CustomHeader";
import { getLatestBooks, getAllBooks, getAllPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Book, Post } from "@/types/types";
import { useNavigation } from '@react-navigation/native';
import { Link, router } from "expo-router";

const BookHub = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <>
      <SafeAreaView className="h-full bg-white px-4">
        <CustomHeader />
        <FlatList<Post>
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <BookHubPost posts={item} />}
          ListHeaderComponent={() => (
              <View className="justify-between items-start flex-row border-b-2 border-grey">
       
                <View className="flex flex-row">
                    <Text className="font-isemibold text-base mb-1 ml-2">
                        Share your insights here...
                      </Text>

                </View>
                <View className="mt-1 mb-1 transform -translate-x-1/3 bg-transparent">
                    <CustomButton
                      title={"Post"}
                      handlePress={() => {
                        router.push("/bookHub/sendPost");
                      }}
                      containerStyles="w-20 h-6 rounded-full bg-primary"
                      textStyles="text-base"
                      isLoading={undefined}
                    ></CustomButton>
                </View>
            
              </View>
          )}
          ListEmptyComponent={() => (
            <EmptyStatePost
              title={"No posts found"}
              subtitle={
                "No posts available at the moment"
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

export default BookHub;
