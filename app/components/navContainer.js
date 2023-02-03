// Imports
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Styles Imports
import { CustomColors } from "../global/globalStyles";

// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PillCalendar from "../screens/calendar";
import Detector from "../screens/detector";
import Entries from "../screens/entries";
import Settings from "../screens/settings";

const NavContainer = () => {
  const TabBar = createBottomTabNavigator();
  const activeColor = CustomColors.customMain;
  const inactiveColor = CustomColors.customDarkGray;

  return (
    <NavigationContainer>
      <TabBar.Navigator
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
        <TabBar.Screen
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

        <TabBar.Screen
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

        <TabBar.Screen
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

        <TabBar.Screen
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
      </TabBar.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
