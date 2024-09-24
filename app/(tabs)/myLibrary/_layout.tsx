// import { createStackNavigator } from "@react-navigation/stack";
// import MyLibraryScreen from "./index"; // or './index.tsx'
// import AddNewBook from "./addnewbook";
// import BookDetail from "./bookDetail";

// const Stack = createStackNavigator();

// const MyLibraryStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="MyLibraryScreen" component={MyLibraryScreen} />
//       <Stack.Screen name="addnewbook" component={AddNewBook} />
//       <Stack.Screen name="bookDetail" component={BookDetail} />
//     </Stack.Navigator>
//   );
// };

// export default MyLibraryStack;

import { Stack } from "expo-router";

export default function MyLibraryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="addnewbook" options={{ headerShown: false }} />
      <Stack.Screen name="bookDetail" options={{ headerShown: false }} />
    </Stack>
  );
}
