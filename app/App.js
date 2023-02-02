// Imports
import React from "react";
import { Text, View, StyleSheet } from "react-native";

// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PillCalendar from "./components/calendar";
import Detector from "./components/detector";
import Entries from "./components/entries";
import Settings from "./components/settings";

// Other Imports
import { HexColors } from "./global/globalStyles";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: HexColors.main },
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
