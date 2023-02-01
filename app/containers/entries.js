import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#0E2A3E",
  },
  TekstWpisow: {
    fontSize: 21,
    textAlign: "left",
    color: "white",
    fontFamily: "sans-serif-condensed",
  },
  ZawartoscWpisow: {
    fontSize: 18,
    textAlign: "left",
    color: "white",
    fontFamily: "sans-serif-condensed",
  },
  KalendarzAplikacji: {
    borderRadius: 25,
    padding: 15,
    elevation: 2,
    backgroundColor: "#1A5A7D",
    borderWidth: 2,
  },
  zawartoscWpisu: {
    borderRadius: 25,
    padding: 7,
    backgroundColor: "rgba(0,0,0,0.2)",
    backgroundOpacity: 0.2,
    opacity: 1,
    padding: 10,
  },
});

export default function Entries() {
  return (
    <View style={Styles.container}>
      <View style={Styles.zawartoscWpisu}>
        <Text style={Styles.TekstWpisow}>01.02.2023</Text>
        <Text style={Styles.ZawartoscWpisow}>Tabletka APAP Noc</Text>
      </View>
      <View
        style={{
          padding: 5,
        }}
      />
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 2,
          borderRadius: 2,
          marginLeft: 1,
          marginRight: 1,
          borderColor: "white",
        }}
      />
      <View
        style={{
          padding: 5,
        }}
      />
      <View style={Styles.zawartoscWpisu}>
        <Text style={Styles.TekstWpisow}>03.02.2023</Text>
        <Text style={Styles.ZawartoscWpisow}>Tabletka na ból zęba</Text>
      </View>
      <View
        style={{
          padding: 5,
        }}
      />
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 2,
          borderRadius: 2,
          marginLeft: 1,
          marginRight: 1,
          borderColor: "white",
        }}
      />
      <View
        style={{
          padding: 5,
        }}
      />
      <View style={Styles.zawartoscWpisu}>
        <Text style={Styles.TekstWpisow}>05.02.2023</Text>
        <Text style={Styles.ZawartoscWpisow}>Witaminy</Text>
      </View>
      <View
        style={{
          padding: 5,
        }}
      />
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 2,
          borderRadius: 2,
          marginLeft: 1,
          marginRight: 1,
          borderColor: "white",
        }}
      />
    </View>
  );
}
