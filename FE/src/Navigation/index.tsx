import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer_1 } from "@/Screens/Welcome";
import { WelcomeContainer_2 } from "@/Screens/Welcome";
import { WelcomeContainer_3 } from "@/Screens/Welcome";
import { RootScreens } from "@/Screens";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.OB1]: undefined;
  [RootScreens.OB2]: undefined;
  [RootScreens.OB3]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootScreens.OB1}
          component={WelcomeContainer_1}
        />
        <RootStack.Screen
          name={RootScreens.OB2}
          component={WelcomeContainer_2}
        />
        <RootStack.Screen
          name={RootScreens.OB3}
          component={WelcomeContainer_3}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
