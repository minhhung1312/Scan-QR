import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { ResultContainer } from "@/Screens/Result";
import { ScanContainer } from "@/Screens/Scan";
import { HistoryContainer } from "@/Screens/History"
import { AboutContainer } from "@/Screens/About"

import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#ECF0F1", // Màu nền của thanh tab
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarActiveTintColor: "#15803d", // Màu khi tab được chọn
        tabBarInactiveTintColor: "#22c55e", // Màu khi tab không được chọn
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{

          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Result"
        component={ResultContainer}
        options={{

          tabBarIcon: ({ color, size }) => (
            <Icon name="map-marker" size={size} color={color} />
          ),
          tabBarLabel: "Result",
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanContainer}
        options={{

          tabBarIcon: ({ color, size }) => (
            <Icon name="qrcode" size={size} color={color} />
          ),
          tabBarLabel: "Scan",
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
          tabBarLabel: "History",
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="info-circle" size={size} color={color} />
          ),
          tabBarLabel: "About",
        }}
      />
    </Tab.Navigator>
  );
};
