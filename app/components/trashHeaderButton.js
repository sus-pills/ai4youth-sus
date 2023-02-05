import React from "react";
import { StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const TrashHeaderButton = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.buttonContainer}>
      <MaterialIcons
        name="delete"
        color="white"
        size={24}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingRight: 14,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default TrashHeaderButton;
