import { FlatList } from "react-native";
import { Text } from "react-native-animatable";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <Text className="text-3xl">{item.id}</Text>}
      horizontal
    />
  );
};

export default Trending;
