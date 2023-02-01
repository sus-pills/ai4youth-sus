import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./containers/home";
import Wpisy from "./containers/wpisy";
import Kalendarz from "./containers/kalendarz";
import Ustawienia from "./containers/ustawienia";
import Detektor from "./containers/detektor";
import { NavigationContainer } from "@react-navigation/native";

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
          headerStyle: {
            backgroundColor: "#1A5A7D",
          },
        }}
        drawerStyle={{
          width: 280,
          backgroundColor: "#1A5A7D",
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Start" component={Home} />
        <Drawer.Screen name="Wpisy" component={Wpisy} />
        <Drawer.Screen name="Kalendarz" component={Kalendarz} />
        <Drawer.Screen name="Detektor Leków" component={Detektor} />
        <Drawer.Screen name="Ustawienia" component={Ustawienia} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
