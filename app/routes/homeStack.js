import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";

// import Home from '../containers/Home';
// import Kalendarz from "../containers/Kalendarz";
// import Ustawienia from "../containers/Ustawienia";
// import Wpisy from "../containers/Wpisy";

const screens = {
    // Home: {
    //     screen: Home
    // },
    // Wpisy: {
    //     screen: Wpisy
    // },
    // Kalendarz: {
    //     screen: Kalendarz
    // },
    // Ustawienia: {
    //     screen: Ustawienia
    // }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);