import { Text, View, Image, Dimensions, FlatList } from "react-native";
import { Link } from "expo-router";
import icons from "../constants/icons";

const { width } = Dimensions.get("window");

const Trending = ({ data }) => {
  const [firstItem, ...otherItems] = data;

  return (
    <View
      className="bg-white max-w-[332px] rounded-xl ml-1 flex items-center justify-center"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {/* Render the first item's large thumbnail */}
      {firstItem && (
        <View className="flex flex-col items-center px-4 py-2 w-full justify-between">
          <View className="flex flex-row justify-between items-center w-full mb-2">
            <Text className="text-blue font-semibold">{firstItem.genre}</Text>
            <View className="flex flex-row items-center gap-1">
              <Link
                href={"/(tabs)/myLibrary"}
                className="text-gray-500 font-semibold"
              >
                see all
              </Link>
              <Image source={icons?.right} className="w-2 h-2" />
            </View>
          </View>
          <View className="flex justify-start items-start w-full">
            <Image
              source={{ uri: firstItem.thumbNail }}
              className="w-[130px] h-[200px] mb-2"
            />
          </View>
        </View>
      )}

      {/* Render the remaining thumbnails in a 2-row grid */}
      <View className="absolute flex flex-row gap-1 items-start flex-wrap top-12 left-36 max-w-[187px] max-h-[180px] overflow-hidden">
        {otherItems.map((item) => (
          <Image
            key={item.$id}
            source={{ uri: item.thumbNail }}
            className="w-[50px] h-[80px]"
          />
        ))}
      </View>
    </View>
  );
};

export default Trending;
