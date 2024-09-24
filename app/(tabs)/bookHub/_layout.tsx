import { createStackNavigator } from "@react-navigation/stack";
import BookHub from "./index";
import SendPost from "./sentPost";

const Stack = createStackNavigator();

const BookHubStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookHubScreen" component={BookHub} />
      <Stack.Screen name="sendPost" component={SendPost} />
    </Stack.Navigator>
  );
};

export default BookHubStack;
