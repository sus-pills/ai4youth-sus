import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";

import PillCalendar from "../components/calendar";
import Detector from "../components/detector";
import Entries from "../components/entries";
import Settings from "../components/settings";

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