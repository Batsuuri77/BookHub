import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { EmptyState, Trending } from "@/components";
import CustomHeader from "@/components/CustomHeader";

const Home = () => {
  return (
    <SafeAreaView className="h-full px-4 bg-white">
      <CustomHeader image={undefined} />
      <FlatList
        //data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text className="text-3xl">{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 border-t-2 border-grey">
            <View className="justify-between items-start flex-row mb-6 border-b-2 border-grey">
              <View>
                <Trending
                  posts={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
                />
                <Text className="font-isemibold text-base mb-1">
                  Suggested books
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
      />
      <StatusBar backgroundColor="black" style="auto" />
    </SafeAreaView>
  );
};

export default Home;
