import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

const SplashScreen = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    prepare();
  }, []);

  const prepare = async () => {
    try {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      // Pre-load fonts, make any API calls you need to do here
      await Font.loadAsync(Entypo.font);
      // Artificially delay for two seconds to simulate a slow loading
      // experience. Please remove this if you copy and paste the code!

      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      console.warn(error);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
};

export default SplashScreen;
