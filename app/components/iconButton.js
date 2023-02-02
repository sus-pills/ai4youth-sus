import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomBorder, CustomColors, CustomSpacing } from "../global/globalStyles";

const IconButton = ({ title, iconName }) => {
  return (
    // Button
    <TouchableOpacity style={styles.touchableOpacityButton}>
      <View style={styles.container}>
        {/* Icon */}
        <MaterialIcons
          name={iconName}
          size={30}
          color="white"
          style={{ marginRight: 10 }}
        />
        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityButton: {
    backgroundColor: CustomColors.customMain,
    borderRadius: CustomBorder.customRadius,
    padding: CustomSpacing.customPadding,
    margin: CustomSpacing.customMargin,
  },
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 1,
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});

export default IconButton;
