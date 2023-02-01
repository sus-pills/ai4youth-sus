import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    flex: 1,
    backgroundColor: "#0E2A3E",
  },
  SusLogo: {
    width: 200,
    height: 197,
  },
  TekstAplikacji: {
    fontSize: 21,
    textAlign: "center",
    color: "white",
    fontFamily: "sans-serif-condensed",
  },
});

export default function Home() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.TekstAplikacji}>
        Witaj w naszej aplikacji Kalendarz Tabletek! By zacząć wybierz daną
        zakładkę dostępną z menu po lewej stronie aplikacji.
        {"\n"}
      </Text>
      <Image
        style={Styles.SusLogo}
        source={require("F:/repozytoria/ai4youth-sus/app/img/image.png")}
      />
    </View>
  );
}
