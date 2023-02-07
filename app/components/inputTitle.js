import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text } from "react-native";
import { CustomColors } from "../global/globalStyles";

const InputText = ({text}) => {
  return (
    <Text style={styles.title}>
      <MaterialCommunityIcons
        name={"chevron-double-right"}
        size={24}
        color={CustomColors.customDarkGray}
      />
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: CustomColors.customDarkGray,
  },
})

export default InputText;