// Imports
import React from "react";
import { View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Styles Imports
import { CustomColors } from "../global/globalStyles";
import { StyleSheet } from "react-native";
// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PillCalendar from "../screens/calendar";
import Detector from "../screens/detector";
import Entries from "../screens/entries";
import Settings from "../screens/settings";
import Start from "../screens/start";
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
        style: { position: 'absolute', bottom: 0 },
      }}
      initialRouteName="PillCalendar"
    >
      <Tab.Screen style={Styles.paddingM}
        name="Start"
        component={Start}
        options={{
          title: "Start",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name={"star"}
              size={size}
              color={focused ? CustomColors.customMain : inactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen style={Styles.paddingM}
        name="Kalendarz"
        component={PillCalendar}
        options={{
          title: "Kalendarz",
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name={"calendar"}
              size={size}
              color={focused ? CustomColors.customMain : inactiveColor}
            />
          ),
        }}
      />

      <Tab.Screen style={Styles.paddingM}
        name="Wykryj lek"
        component={Detector}
        options={{
          title: "Wykryj lek",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name={"photo-camera"}
              size={size}
              color={focused ? CustomColors.customMain : inactiveColor}
            />
          ),
        }}
      />

      <Tab.Screen style={Styles.paddingM}
        name="Wpisy"
        component={Entries}
        options={{
          title: "Wpisy",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name={"format-list-bulleted"}
              size={size}
              color={focused ? CustomColors.customMain : inactiveColor}
            />
          ),
        }}
      />

      <Tab.Screen style={Styles.paddingM}
        name="Ustawienia"
        component={Settings}
        options={{
          title: "Ustawienia",
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

const Styles = StyleSheet.create({
  paddingM: {
    marginLeft: 5,
  },
});

export default HomeTab;
