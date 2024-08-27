import { View, Text, Image, Settings } from "react-native";
import images from "../constants/images";
import { Link } from "expo-router";

const CustomHeader = ({ image }) => {
  return (
    <View className="flex justify-between items-center flex-row max-h-20 p-2 w-full">
      <View className="flex items-center rounded-full w-10 h-10 overflow-hidden">
        <Link href={"/profile"} className="w-full h-full absolute"></Link>
        <Image
          source={images.settings}
          className="w-full h-full object-cover"
        />
      </View>
      <View className="w-[180px] h-[40px]">
        <Image
          source={images.logo_hor}
          resizeMode="contain"
          className="w-[180px] h-[40px]"
        />
      </View>
      <View className="flex items-center rounded-full w-10 h-10">
        <Link href={"/settings"} className="w-full h-full absolute"></Link>
        <Image
          source={images.settings}
          className="w-full h-full object-cover"
        />
      </View>
    </View>
  );
};

export default CustomHeader;
