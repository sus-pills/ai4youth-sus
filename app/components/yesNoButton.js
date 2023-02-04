import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Styles Imports
import { StyleSheet } from "react-native";
import {
  CustomBorder,
  CustomColors,
  CustomSpacing,
  GlobalStyles,
} from "../global/globalStyles";

const IconButton = ({ affirmation, onPress }) => {
  const [color, setColor] = useState(CustomColors.customNegation);
  const [iconName, setIconName] = useState("close");

  if (affirmation) {
    setColor(CustomColors.customAffirmation);
    setIconName("check");
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.4}
      style={[
        styles.touchableOpacityButton,
        GlobalStyles.customShadow,
        { backgroundColor: color },
      ]}
    >
      {/* Icon */}
      <MaterialIcons name={iconName} size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityButton: {
    borderRadius: CustomBorder.customRadius,
    padding: 12,
    margin: 18,
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});

export default IconButton;
