// Imports
import React, { useState, useEffect } from 'react';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Styles Imports
import { CustomColors } from "../global/globalStyles";

// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PillCalendar from "../screens/calendar";
import Detector from "../screens/detector";
import Entries from "../screens/entries";
import Settings from "../screens/settings";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused, isFocused } from '@react-navigation/native';
import { initializeAsyncStorage } from "../global/globalFunctions";

const Tab = createBottomTabNavigator();

export const HomeTab = () => {
  const isFocused = useIsFocused();
  const activeColor = "#5317FF";
  const inactiveColor = "#2DDD5D";
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
      backgroundColor: 'black',
      elevation: 10, // Adjust this value to control shadow intensity (Android)
      shadowOpacity: 0.5, // Adjust this value to control shadow intensity (iOS)
    },
        headerShown: true,
        headerStyle: { backgroundColor: "black" },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTintColor: 'white',
        tabBarActiveTintColor: CustomColors.customMain,
        tabBarInactiveTintColor: "white",
        tabBarBackgroundColor: "black",
        
      }}
      
      initialRouteName="PillCalendar"
    >
      <Tab.Screen
        name="Calendar"
        component={PillCalendar}
        options={{
          title: "Calendar",
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name={"calendar"}
              size={size}
              color={focused ? CustomColors.customMain : "white"}
            />
          ),
          tabBarStyle: {
            borderTopWidth: 0, // Remove the gray line
            backgroundColor: "black",
          },
        }}
      />

      <Tab.Screen
        name="Camera"
        component={Detector}
        options={{
          title: "Camera",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name={"photo-camera"}
              size={size}
              color={focused ? CustomColors.customMain : "white"}
          
            />
            
          ),
          tabBarStyle: {
            borderTopWidth: 0, // Remove the gray line
            backgroundColor: "black",
          },
        }}
      />

      <Tab.Screen
        name="Entries"
        component={Entries}
        options={{
          title: "Entries",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name={"format-list-bulleted"}
              size={size}
              color={focused ? CustomColors.customMain : "white"}
            />
          ),
          tabBarStyle: {
            borderTopWidth: 0, // Remove the gray line
            backgroundColor: "black",
          },
        }}
      />

      <Tab.Screen
        name="Options"
        component={Settings}
        options={{
          title: "Options",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name={"settings"}
              size={size}
              color={focused ? CustomColors.customMain : "white"}
            />
          ),
          tabBarStyle: {
            borderTopWidth: 0, // Remove the gray line
            backgroundColor: "black",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
