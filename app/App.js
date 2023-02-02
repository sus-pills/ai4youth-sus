// Imports
import React, { useState } from "react";
import { Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
  const activeColor = CustomColors.customMain;
  const inactiveColor = CustomColors.customDarkGray;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: CustomColors.customMain },
          headerTitleAlign: "center",
          headerTintColor: 'white',
          drawerActiveTintColor: activeColor,
          drawerInactiveTintColor: inactiveColor,
        }}
        initialRouteName="PillCalendar"
      >
        <Drawer.Screen name="Kalendarz" component={PillCalendar} options={{
          title: 'Kalendarz',
          drawerIcon: ({focused, size}) => <MaterialIcons
            name={'calendar-today'}
            size={size}
            color={focused ? CustomColors.customMain : inactiveColor}
            // style={{ marginRight: 8 }}
          />
        }} />
        
        <Drawer.Screen name="Wykryj lek" component={Detector} options={{
          title: 'Wykryj lek',
          drawerIcon: ({focused, size}) => <MaterialIcons
            name={'photo-camera'}
            size={size}
            color={focused ? CustomColors.customMain : inactiveColor}
            // style={{ marginRight: 8 }}
          />
        }} />

        <Drawer.Screen name="Wpisy" component={Entries} options={{
          title: 'Wpisy',
          drawerIcon: ({focused, size}) => <MaterialIcons
            name={'format-list-bulleted'}
            size={size}
            color={focused ? CustomColors.customMain : inactiveColor}
            // style={{ marginRight: 8 }}
          />
        }} />

        <Drawer.Screen name="Ustawienia" component={Settings} options={{
          title: 'Ustawienia',
          drawerIcon: ({focused, size}) => <MaterialIcons
            name={'settings'}
            size={size}
            color={focused ? CustomColors.customMain : inactiveColor}
            // style={{ marginRight: 8 }}
          />
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
