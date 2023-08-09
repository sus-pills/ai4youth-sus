import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { initializeAsyncStorage } from "../global/globalFunctions";
import ImagePicker from "react-native-image-picker";
// Styles Imports
import { StyleSheet } from "react-native";
import {
  CustomColors,
  CustomBorder,
  CustomSpacing,
  GlobalStyles,
  ColorsDark
} from "../global/globalStyles";


const dateToString = () => {

}

const Entry = ({ entry, options, onPress }) => {
  const { font_size,dark_mode } = options
  const firstParameter = options?.font_size;
  const integerFP = parseInt(font_size);
  const fontSizeStyle = isNaN(integerFP) ? { fontSize: 16 } : { fontSize: integerFP };
  
  const darkModeBool = dark_mode;
  
  var colorBackground;
  var colorText;
  var colorMain;
  var colorSecondary;
  
  if (darkModeBool === true) {
    colorBackground = ColorsDark.customBackground;
    colorText = ColorsDark.customText;
    colorMain = ColorsDark.customMain;
    colorSecondary = ColorsDark.customSecondary;
  } else {
    colorBackground = CustomColors.customBackground;
    colorText = CustomColors.customText;
    colorMain = CustomColors.customMain;
    colorSecondary = CustomColors.customSecondary;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.4}
      style={[
        styles.touchableOpacityButton,
        {
          backgroundColor: colorMain,
        },
        GlobalStyles.customShadow,
      ]}
    >
      <View>
        <View style={styles.head}>
          <View style={[styles.colorDot, { backgroundColor: entry.color }]}></View>
          <Text style={{fontSize: 20, color: colorText}}>{entry.name}</Text>
        </View>

        <Text style={{color: colorText}}>
          {"Press to access more information"}
        </Text>
      </View>

      <MaterialIcons
        name={"info"}
        size={40}
        color={colorSecondary}
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
