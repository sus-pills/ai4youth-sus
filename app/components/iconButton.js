import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Styles Imports
import { StyleSheet } from "react-native";
import { HexColors } from "../global/globalStyles";

const IconButton = ({ title, iconName }) => {
  return (
    // Button
    <TouchableOpacity style={styles.touchableOpacityButton}>
      <View style={styles.container}>
        {/* Icon */}
        <MaterialIcons
          name={iconName}
          size={24}
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
    backgroundColor: HexColors.customBackground,
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 1,
  },
  title: {
    color: "white",
    fontSize: 24,
  },
});

export default IconButton;
