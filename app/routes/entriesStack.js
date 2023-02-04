// Imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CustomColors } from "../global/globalStyles";
// Screens Imports
import Entries from "../screens/entries";
import EntryInfo from "../screens/entryInfo";

const Stack = createStackNavigator();

const EntriesStack = () => (
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
    initialRouteName="Entries"
  >
    <Stack.Screen
      name="Entries"
      component={Entries}
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
);

export default EntriesStack;