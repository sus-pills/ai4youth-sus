// Imports
import React from "react";
import { Text, View, StyleSheet } from "react-native";

// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PillCalendar from "./containers/calendar";
import Detector from "./containers/detector";
import Entries from "./containers/entries";
import Settings from "./containers/settings";

// Other Imports
import { HexColors } from "./global/globalStyles";

const Drawer = createDrawerNavigator();

const Styles = StyleSheet.create({
  zakladka: {
    backgroundColor: "black",
    width: 200,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: HexColors.main },
          headerTitleStyle: { color: "white" },
        }}
        drawerStyle={{
          width: 280,
          backgroundColor: "#1A5A7D",
        }}
        initialRouteName="Calendar"
      >
        <Drawer.Screen name="Kalendarz" component={PillCalendar} />
        <Drawer.Screen name="Wykryj lek" component={Detector} />
        <Drawer.Screen name="Wpisy" component={Entries} />
        <Drawer.Screen name="Ustawienia" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
