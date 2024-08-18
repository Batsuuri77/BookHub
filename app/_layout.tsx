import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "FiraCode-Bold": require("../assets/fonts/FiraCode-Bold.ttf"),
    "FiraCode-Light": require("../assets/fonts/FiraCode-Light.ttf"),
    "FiraCode-Medium": require("../assets/fonts/FiraCode-Medium.ttf"),
    "FiraCode-Regular": require("../assets/fonts/FiraCode-Regular.ttf"),
    "FiraCode-SemiBold": require("../assets/fonts/FiraCode-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};
export default RootLayout;
