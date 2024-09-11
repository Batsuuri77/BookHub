import { StatusBar } from "expo-status-bar";
import { Tabs, Redirect } from "expo-router";
import icons from "../../constants/icons";
import { View, Image, Text, ImageSourcePropType } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Loader } from "../../components";

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <>
      <View className="items-center justify-center gap-2">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-7 h-7"
        />
      </View>
      <Text
        className={`${focused ? "font-bold" : "font-semibold"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </>
  );
};

const TabsLayout = () => {
  // const globalContext = useGlobalContext();
  // if (!globalContext) {
  //   return <Text>Error: Global context is undefined</Text>;
  // }

  // const { loading, isLogged } = globalContext;

  // if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF6230",
          // tabBarActiveBackgroundColor: "#FF6230",
          tabBarInactiveTintColor: "#989898",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            shadowColor: "#989898",
            height: 92,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="myLibrary"
          options={{
            title: "My Library",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.myLibrary}
                color={color}
                name="My Library"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookHub"
          options={{
            title: "Book Hub",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookHub}
                color={color}
                name="Book Hub"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "favourite",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.favourite}
                color={color}
                name="Notification"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;
