// Imports
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Styles Imports
import { CustomColors } from "../global/globalStyles";

// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calendar from "../screens/calendar";
import Detector from "../screens/detector";
import Entries from "../screens/entries";
import Settings from "../screens/settings";

const Tab = createBottomTabNavigator();

export const HomeTab = () => {
  const activeColor = CustomColors.customMain;
  const inactiveColor = CustomColors.customDarkGray;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: CustomColors.customMain },
        headerTitleAlign: "center",
        headerTintColor: "white",
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      }}
      initialRouteName="Calendar"
    >
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          title: "Calendar",
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name={"calendar"}
              size={size}
              color={focused ? CustomColors.customMain : inactiveColor}
            />
          ),
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
              color={focused ? CustomColors.customMain : inactiveColor}
            />
          ),
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
              color={focused ? CustomColors.customMain : inactiveColor}
            />
          ),
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
              color={focused ? CustomColors.customMain : inactiveColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
