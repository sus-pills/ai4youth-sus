// Imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "react-navigation-stack";
import { CustomColors } from "../global/globalStyles";
// Screens Imports
import Entries from "../screens/entries";
import EntryInfo from "../screens/entryInfo";

const {Navigator, Screen} = createStackNavigator();

const EntriesStack = () => (
  <Navigator
    headerMode='screen'
    screenOptions={{
      headerStyle: {
        backgroundColor: CustomColors.customMain,
      },
      headerTintColor: 'white',
      headerTitleAlign: "center",
    }}
    initialRouteName="Entries"
  >
    <Screen
      name="Entries"
      component={Entries}
      options={{
        title: "Wpisy",
      }}
    />
    <Screen
      name="EntryInfo"
      component={EntryInfo}
      options={{
        title: "Informacje",
      }}
    />
  </Navigator>
);

export default EntriesStack;