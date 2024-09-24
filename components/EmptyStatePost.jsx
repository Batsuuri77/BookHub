import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyStatePost = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[150px] h-[130px]"
      />

      <Text className="text-xl font-imedium">{title}</Text>
      <Text className="text-sm text-center font-isemibold mt-2">
        {subtitle}
      </Text>
    </View>
  );
};

export default EmptyStatePost;
