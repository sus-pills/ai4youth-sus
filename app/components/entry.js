import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Styles Imports
import { StyleSheet } from "react-native";
import {
  CustomColors,
  CustomBorder,
  CustomSpacing,
} from "../global/globalStyles";

const Entry = ({ entry }) => {
  return (
    <TouchableOpacity key={entry.key} style={[styles.touchableOpacityButton, {backgroundColor: entry.color}]}>
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
    padding: CustomSpacing.customPadding,
    gap: 12,
  },
  testText: {
    color: 'white',
  }
});

export default Entry;
