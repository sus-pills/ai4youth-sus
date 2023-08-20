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
  //const { font_size,dark_mode, contrast_mode, colorblind_mode } = options
  const firstParameter = options?.font_size;
  const integerFP = parseInt(font_size);
  const fontSizeStyle = isNaN(integerFP) ? { fontSize: 16 } : { fontSize: integerFP };
  const fontSizeStyle2 = isNaN(integerFP) ? { fontSize: 16 } : { fontSize: integerFP+4 };
  //const currentFontSize = isNaN(integerFP) ? 16 : integerFP;
  //const currentFontSize2 = isNaN(integerFP) ? 20 : integerFP + 4;
  const darkModeBool = dark_mode;
  const contrastBool = contrast_mode;
  const colorblindString = colorblind_mode;

  const font_size = options?.font_size || 'medium';
  const dark_mode = options?.dark_mode || 'false';
  const contrast_mode = options?.contrast_mode || 'false';
  const colorblind_mode = options?.colorblind_mode || 'Normal';
  const currentBackgroundColor = optionsS?.customBackground || '#FFFFFF';
  const currentMainColor = optionsS?.customMain || 'defaultMainColor';
  const currentSecondaryColor = optionsS?.customSecondary || 'defaultSecondaryColor';
  const currentAffirmationColor = optionsS?.customAffirmation || 'defaultAffirmationColor';
  const currentNegationColor = optionsS?.customNegation || 'defaultNegationColor';
  const currentDarkGrayColor = optionsS?.customDarkGray || 'defaultDarkGrayColor';
  const currentLightGrayColor = optionsS?.customLightGray || 'defaultLightGrayColor';
  const currentTextColor = optionsS?.customText || 'defaultTextColor';
  const currentBorderColor = optionsS?.customBorder || 'defaultBorderColor';
  const currentBGButtonColor = optionsS?.customBGButton || 'defaultBGButtonColor';
  const currentBackgroundImageKey = optionsS?.backgroundImageKey || 'defaultBackgroundImageKey';
  const currentColorDot = options?.contrast_mode === true ? "white" : entry.color;
  console.log("FONTSIZESTYLE: "+fontSizeStyle)
  // if (options?.contrast_mode===true)
  // {
  //   currentColorDot = "white"
  // }
  // else
  // {
  //   currentColorDot = entry.color
  // }
  console.log("OPTIONSS: "+optionsS)
  console.log("OPTIONS: "+options)
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
