import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Styles Imports
import { StyleSheet } from "react-native";
import {
  CustomColors,
  CustomBorder,
  CustomSpacing,
  GlobalStyles,
} from "../global/globalStyles";

const dateToString = () => {

}

const Entry = ({ entry, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.4}
      style={[
        styles.touchableOpacityButton,
        {
          backgroundColor: "#f6f6f6",
          borderColor: entry.color,
        },
        GlobalStyles.customShadow,
      ]}
    >
      <View>
        <View style={styles.head}>
          <View style={[styles.colorDot, { backgroundColor: entry.color }]}></View>
          <Text style={{fontSize: 20}}>{entry.name}</Text>
        </View>

        <Text style={styles.body}>
          {"Naciśnij, aby uzyskać więcej informacji"}
        </Text>
      </View>

      <MaterialIcons
        name={"info"}
        size={40}
        color="#999"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityButton: {
    backgroundColor: CustomColors.customSecondary,
    borderRadius: CustomBorder.customRadius,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,

    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorDot: {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: 'black',
    marginRight: 10,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    marginVertical: 6,
  }
});

export default Entry;
