// Imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CustomColors } from "../global/globalStyles";
// Screens Imports
import HomeTab from "../routes/homeTab";
import EntryInfo from "../screens/entryInfo";

const Stack = createStackNavigator();

const appStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: CustomColors.customMain,
        },
        headerTintColor: 'white',
        headerTitleAlign: "center",
      }}
      options={{
        headerMode: 'screen',
      }}
      initialRouteName="HomeTab"
    >
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EntryInfo"
        component={EntryInfo}
        options={{
          title: "Informacje",
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default appStack;