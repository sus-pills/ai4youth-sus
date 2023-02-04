// Imports
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Styles Imports
import { CustomColors } from "../global/globalStyles";

// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PillCalendar from "../screens/calendar";
import Detector from "../screens/detector";
// import EntriesStack from "./entriesStack";
import Settings from "../screens/settings";
import Entries from "../screens/entries";

const {Navigator, Screen} = createBottomTabNavigator();

export const NavBar = () => {
  const activeColor = CustomColors.customMain;
  const inactiveColor = CustomColors.customDarkGray;

  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: CustomColors.customMain },
        headerTitleAlign: "center",
        headerTintColor: "white",
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      }}
      initialRouteName="PillCalendar"
    >
      <Screen
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

      <Screen
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

      <Screen
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

      <Screen
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
    </Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <NavBar />
    </NavigationContainer>
  )
}

export default AppNavigator;
