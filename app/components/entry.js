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

const Entry = ({ entry, options, optionsS, onPress }) => {
  const { font_size,dark_mode, contrast_mode, colorblind_mode } = options
  const firstParameter = options?.font_size;
  const integerFP = parseInt(font_size);
  const fontSizeStyle = isNaN(integerFP) ? { fontSize: 16 } : { fontSize: integerFP };
  const fontSizeStyle2 = isNaN(integerFP) ? { fontSize: 16 } : { fontSize: integerFP+4 };
  //const currentFontSize = isNaN(integerFP) ? 16 : integerFP;
  //const currentFontSize2 = isNaN(integerFP) ? 20 : integerFP + 4;
  const darkModeBool = dark_mode;
  const contrastBool = contrast_mode;
  const colorblindString = colorblind_mode;

  const currentBackgroundColor = optionsS?.customBackground;
  const currentMainColor = optionsS?.customMain;
  const currentSecondaryColor = optionsS?.customSecondary;
  const currentAffirmationColor = optionsS?.customAffirmation;
  const currentNegationColor = optionsS?.customNegation;
  const currentDarkGrayColor = optionsS?.customDarkGray;
  const currentLightGrayColor = optionsS?.customLightGray;
  const currentTextColor = optionsS?.customText;
  const currentBorderColor = optionsS?.customBorder;
  const currentBGButtonColor = optionsS?.customBGButton;
  const currentBackgroundImageKey = optionsS?.backgroundImageKey;
  var currentColorDot;
  console.log("FONTSIZESTYLE: "+fontSizeStyle)
  if (options?.contrast_mode===true)
  {
    currentColorDot = "white"
  }
  else
  {
    currentColorDot = entry.color
  }

  console.log(currentBackgroundColor+" = CURRENT BACKGROUDN COLOR")
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.4}
      style={[
        styles.touchableOpacityButton,
        {
          backgroundColor: currentBGButtonColor,
          borderColor: currentBorderColor,
          borderWidth: 1,             
          overflow: 'hidden',
        },
        GlobalStyles.customShadow,
      ]}
    >
      <View>
        <View style={styles.head}>
          <View style={[styles.colorDot, { backgroundColor: currentColorDot }]}></View>
          <Text style={[fontSizeStyle2,
            {color: currentTextColor}]}>{entry.name}</Text>
        </View>

        <Text style={[{color: currentTextColor},fontSizeStyle]}>
          {"Press to access more information"}
        </Text>
      </View>

      <MaterialIcons
        name={"info"}
        size={40}
        color={currentSecondaryColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityButton: {
    backgroundColor: "white",
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
