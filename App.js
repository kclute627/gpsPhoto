import React, { useState, useEffect, useCallback } from "react";

import { View, Text } from "react-native";

import Home from "./Screens/Home";
import Camara from "./Screens/Camara";
import Camaraprev from "./Screens/CamaraPrev";
import { Entypo } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";

const RootStack = createStackNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    prepare();


  }, []);
  const prepare = async () => {
    try {
     const splash = await SplashScreen.hideAsync();
     console.log(splash)
      // await SplashScreen.preventAutoHideAsync();

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
    } finally {
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

  const onCapture = (uri) => {
    console.log("do something with ", uri);
  };

  if (!appIsReady) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        onLayout={onLayoutRootView}
      >
        <LottieView
          ref={(animation) => {
            this.animation = animation
          }}
          style={{
            width: 400,
            height: 400,
          }}
          autoPlay
          loop
          source={require("./Assets/20054-gps-location-arrow.json")}
        />
        <Text
          style={{
            fontSize: 44,
            fontWeight: "700",
            color: "blue",
          }}
        >
          GPS Photo
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Camara"
          component={Camara}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Camaraprev"
          component={Camaraprev}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );

  // if (appIsReady) {
  //   return (
  //     <NavigationContainer>
  //       <RootStack.Navigator>
  //         <RootStack.Screen
  //           name="Home"
  //           component={Home}
  //           options={{ headerShown: false }}
  //         />
  //         <RootStack.Screen
  //           name="Camara"
  //           component={Camara}
  //           options={{ headerShown: false }}
  //         />
  //         <RootStack.Screen
  //           name="Camaraprev"
  //           component={Camaraprev}
  //           options={{ headerShown: false }}
  //         />
  //       </RootStack.Navigator>
  //     </NavigationContainer>
  //   );
  // }
  // return (
  //   <View
  //     style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
  //     onLayout={onLayoutRootView}
  //   >
  //     <Text>SplashScreen Demo! 👋</Text>
  //     {/* <Entypo name="rocket" size={30} /> */}
  //   </View>
  // );
};

export default App;
