import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
const Styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#0E2A3E",
    verticalAlign: "center",
    justifyContent: "center",
  },
  TekstAplikacji: {
    fontSize: 21,
    textAlign: "center",
    color: "white",
    fontFamily: "sans-serif-condensed",
  },
});

export default function Detector() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.TekstAplikacji}>Detektor Leków</Text>
      <Text>{"\n"}</Text>
      <Button
        /*onPress= tu bedzie kamera sie wywoływała*/
        title="Zrób zdjęcie"
        color="#1A5A7D"
        accessibilityLabel="Zrób zdjęcie by aplikacja wykryła tabletkę."
      />
    </View>
  );
}
