// Imports
import React from "react";
import { Text, View } from "react-native";

// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PillCalendar from "./screens/calendar";
import Detector from "./screens/detector";
import Entries from "./screens/entries";
import Settings from "./screens/settings";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors } from "./global/globalStyles";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: CustomColors.customMain },
          headerTitleStyle: { color: "white"},
          headerTitleAlign: "center",
        }}
        drawerStyle={{
          width: 280,
          backgroundColor: "#1A5A7D",
        }}
        initialRouteName="PillCalendar"
      >
        <Drawer.Screen name="Kalendarz" component={PillCalendar} />
        <Drawer.Screen name="Wykryj lek" component={Detector} />
        <Drawer.Screen name="Wpisy" component={Entries} />
        <Drawer.Screen name="Ustawienia" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
