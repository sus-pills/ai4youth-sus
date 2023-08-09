// appStack.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CustomColors } from "../global/globalStyles";

// Screens Imports
import HomeTab from "../routes/homeTab";
import EntryInfo from "../screens/entryInfo";
import EntryEdit from "../screens/entryEdit";

const Stack = createStackNavigator();

const AppStack = ({isDarkMode, setIsDarkMode}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
        initialRouteName="HomeTab"
      >
        <Stack.Screen
          name="HomeTab"
          options={{
            headerShown: false,
          }}
          >
            {props => (
            <HomeTab {...props} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          )}

        </Stack.Screen>

        <Stack.Screen
          name="EntryInfo"
          component={EntryInfo}
          options={{
            title: "Entry Information",
          }}
        />

        <Stack.Screen
          name="EntryEdit"
          component={EntryEdit}
          options={{
            title: "Edit Entry",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
