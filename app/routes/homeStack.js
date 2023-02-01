import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";

import Calendar from "../containers/calendar";
import Detector from "../containers/detector";
import Entries from "../containers/entries";
import Settings from "../containers/settings";

const screens = {
    Calendar: {
        screen: Calendar
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