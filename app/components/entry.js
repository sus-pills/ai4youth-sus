import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Styles Imports
import { StyleSheet } from "react-native";
import {
  CustomColors,
  CustomBorder,
  CustomSpacing,
  GlobalStyles,
} from "../global/globalStyles";

const Entry = ({ entry }) => {
  return (
    <TouchableOpacity
      style={[
        styles.touchableOpacityButton,
        { backgroundColor: entry.color },
        GlobalStyles.customShadow,
      ]}
    >
      <Text style={styles.testText}>{entry.name}</Text>
      <Text style={styles.testText}>{entry.datetime}</Text>
      <Text style={styles.testText}>{entry.period}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityButton: {
    backgroundColor: CustomColors.customSecondary,
    borderRadius: CustomBorder.customRadius,
    padding: 12,
    margin: 6,
  },
  // testText: {
  //   color: "white",
  // },
});

export default Entry;
