import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Switch,
  TextInput,
} from "react-native";
import OptionsMenu from "react-native-option-menu";
const MyComponent = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};


const Styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    backgroundColor: "#0E2A3E",
    height: 723,
  },
  TekstAplikacji: {
    fontSize: 21,
    color: "white",
    fontFamily: "sans-serif-condensed",
    textAlign: "left",
  },
});

export default function Settings() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.TekstAplikacji}>Tryb dla daltonistów:</Text>
      <Switch></Switch>

      <Text style={Styles.TekstAplikacji}>Wysoki kontrast:</Text>
      <Switch></Switch>

      {/* <OptionsMenu
        button={}
        buttonStyle={{
          width: 55,
          height: 55,
          margin: 7.5,
          resizeMode: "contain",
        }}
        options={["Trinatopia", "Protanopia"]}
      />
      <OptionsMenu
        button={}
        buttonStyle={{
          width: 55,
          height: 55,
          margin: 7.5,
          resizeMode: "contain",
        }}
        options={["32", "36", "40"]}
      /> */}
    </View>
  );
}
/* W switchu jeśli tryb dla daltonistów pokażą się typy. Trinatopia i tym podobne*/
