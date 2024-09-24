import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const DebugScreen = () => {
  const { bookId } = useLocalSearchParams();
  return (
    <View>
      <Text>Book ID: {bookId}</Text>
    </View>
  );
};

export default DebugScreen;
