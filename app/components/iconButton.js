import React, { useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Styles Imports
import { StyleSheet } from "react-native";
import {
  CustomBorder,
  CustomColors,
  CustomSpacing,
  GlobalStyles,
} from "../global/globalStyles";

const IconButton = ({
  title,
  iconName,
  textColor,
  communityIcons,
  style,
  onPress,
  isLoading,
}) => {
  const color = textColor ? textColor : "white";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.4}
      style={[styles.touchableOpacityButton, GlobalStyles.customShadow, style]}
    >
      <View style={styles.container}>
        {/* Icon */}
        {isLoading ? (
          <ActivityIndicator
            size={30}
            color={color}
            style={{ marginRight: title ? 8 : 0 }}
          />
        ) : communityIcons ? (
          <MaterialCommunityIcons
            name={iconName}
            size={30}
            color={color}
            style={{ marginRight: title ? 8 : 0 }}
          />
        ) : (
          <MaterialIcons
            name={iconName}
            size={30}
            color={color}
            style={{ marginRight: title ? 8 : 0 }}
          />
        )}

        {/* Title */}
        <Text style={[styles.title, { color: color }]}>{title}</Text>
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
    minHeight: 48, // <-- Default Height
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 2,
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});

export default IconButton;
