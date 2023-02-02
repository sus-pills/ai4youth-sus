import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";

import PillCalendar from "../screens/calendar";
import Detector from "../screens/detector";
import Entries from "../screens/entries";
import Settings from "../screens/settings";

const screens = {
    PillCalendar: {
        screen: PillCalendar
    },
    Detector: {
        screen: Detector
    },
    Entries: {
        screen: Entries
    },
    Settings: {
        screen: Settings
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);