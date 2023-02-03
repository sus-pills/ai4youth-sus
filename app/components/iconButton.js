import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomBorder, CustomColors, CustomSpacing, GlobalStyles } from "../global/globalStyles";

const IconButton = ({ title, iconName }) => {
  return (
    // Button
    <TouchableOpacity style={[styles.touchableOpacityButton, GlobalStyles.customShadow]}>
      <View style={styles.container}>
        {/* Icon */}
        <MaterialIcons
          name={iconName}
          size={30}
          color="white"
          style={{ marginRight: 8 }}
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
    padding: 12,
    margin: 18,
    marginBottom: 18,
  },
  container: {
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
