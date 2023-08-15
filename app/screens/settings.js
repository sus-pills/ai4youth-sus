import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { initializeAsyncStorage } from "../global/globalFunctions"; // Import the initializeAsyncStorage function
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {CustomColors, ColorsDark, CustomColorsBCM, ColorsDarkBCM, CustomColorsDeuteranomaly, ColorsDarkDeuteranomaly, CustomColorsDeuteranopia, ColorsDarkDeuteranopia, CustomColorsMonochromacy, ColorsDarkMonochromacy, CustomColorsProtanomaly, ColorsDarkProtanomaly, CustomColorsProtanopia, ColorsDarkProtanopia, CustomColorsTritanomaly, ColorsDarkTritanomaly, CustomColorsTritanopia, ColorsDarkTritanopia, HighContrast} from "../global/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Animated, Easing, ImageBackground } from 'react-native';

import backgroundImage_normal from '../img/tloNormal.png';
import backgroundImage_BCM from '../img/tloBCM.png';
import backgroundImage_Deuteranomaly from '../img/tloDeuteranomaly.png';
import backgroundImage_Deuteranopia from '../img/tloDeuteranopia.png';
import backgroundImage_Monochromacy from '../img/tloMonochromacy.png';
import backgroundImage_Protanomaly from '../img/tloProtanomaly.png';
import backgroundImage_Protanopia from '../img/tloProtanopia.png';
import backgroundImage_Tritanomaly from '../img/tloTritanomaly.png';
import backgroundImage_Tritanopia from '../img/tloTritanopia.png';

import backgroundImage_dark_normal from '../img/tlo2Normal.png';
import backgroundImage_dark_BCM from '../img/tlo2BCM.png';
import backgroundImage_dark_Deuteranomaly from '../img/tlo2Deuteranomaly.png';
import backgroundImage_dark_Deuteranopia from '../img/tlo2Deuteranopia.png';
import backgroundImage_dark_Monochromacy from '../img/tlo2Monochromacy.png';
import backgroundImage_dark_Protanomaly from '../img/tlo2Protanomaly.png';
import backgroundImage_dark_Protanopia from '../img/tlo2Protanopia.png';
import backgroundImage_dark_Tritanomaly from '../img/tlo2Tritanomaly.png';
import backgroundImage_dark_Tritanopia from '../img/tlo2Tritanopia.png';
import backgroundImage_HC from '../img/tloHC.png';

console.log("<------------>")

const backgroundImageMappings = {
  tloNormal: require('../img/tloNormal.png'),
  tlo2Normal: require('../img/tlo2Normal.png'),
  tloBCM: require('../img/tloBCM.png'),
  tlo2BCM: require('../img/tlo2BCM.png'),
  tlo2Deuteranomaly: require('../img/tlo2Deuteranomaly.png'),
  tlo2Deuteranopia: require('../img/tlo2Deuteranopia.png'),
  tlo2Monochromacy: require('../img/tlo2Monochromacy.png'),
  tlo2Protanomaly: require('../img/tlo2Protanomaly.png'),
  tlo2Protanopia: require('../img/tlo2Protanopia.png'),
  tlo2Tritanomaly: require('../img/tlo2Tritanomaly.png'),
  tlo2Tritanopia: require('../img/tlo2Tritanopia.png'),
  tloDeuteranomaly: require('../img/tloDeuteranomaly.png'),
  tloDeuteranopia: require('../img/tloDeuteranopia.png'),
  tloMonochromacy: require('../img/tloMonochromacy.png'),
  tloProtanomaly: require('../img/tloProtanomaly.png'),
  tloProtanopia: require('../img/tloProtanopia.png'),
  tloTritanomaly: require('../img/tloTritanomaly.png'),
  tloTritanopia: require('../img/tloTritanopia.png'),
  tloHC: require('../img/tloHC.png'),
  // ... add more mappings for other images
};


const SettingsScreen = ( {}) => {
  const INPUT_RANGE_START = 0;
  const INPUT_RANGE_END = 1;
  const OUTPUT_RANGE_START = -281;
  const OUTPUT_RANGE_END = 0;
  const ANIMATION_TO_VALUE = 1;
  const ANIMATION_DURATION = 25000;
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);

  const [options, setOptions] = useState(null);
  const [optionsS, setOptionsS] = useState(null);
  const [fontSize, setFontSize] = useState('medium');
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [contrastModeEnabled, setContrastModeEnabled] = useState(false);
  const [colorblindMode, setColorblindMode] = useState('normal');

  const getOptionsFromAsyncStorage = async () => {
    try {
      console.log("getOptionsFromAsyncStorage ---->")
      const options = await AsyncStorage.getItem("@options");
      console.log("Fetched options:", options);
      setOptions(JSON.parse(options));
      const optionsS = await AsyncStorage.getItem("@style");
      console.log("Fetched options:", optionsS);
      setOptionsS(JSON.parse(optionsS));
    } catch (error) {
      console.log("Error fetching options:", error);
    }
  };
  console.log("----> getOptionsFromAsyncStorage")
  useFocusEffect(
    React.useCallback(() => {
      console.log("React.useCallback ---->")
      getOptionsFromAsyncStorage();
      initializeAsyncStorage();
      console.log("----> React.useCallback")
    }, [])
  );

  const handleFontSizeChange = (fontSize) => {
    setFontSize(fontSize);
    const currentOptions = options ? { ...options } : {};
    currentOptions.font_size = fontSize;
    AsyncStorage.setItem("@options", JSON.stringify(currentOptions));
    getOptionsFromAsyncStorage();
  };

  const toggleDarkMode = async (isEnabled) => {
    setDarkModeEnabled(isEnabled);
    try {
      await AsyncStorage.setItem("@darkModeEnabled", JSON.stringify(isEnabled));
    } catch (error) {
      console.log("Error saving dark mode setting:", error);
    }

    // Update options in AsyncStorage
    const currentOptions = options ? { ...options } : {};
    currentOptions.dark_mode = isEnabled;
    AsyncStorage.setItem('@options', JSON.stringify(currentOptions))
      .then(() => {
        getOptionsFromAsyncStorage();
      })
      .catch((error) => {
        console.log('Error toggling dark mode:', error);
      });
  };

  // Rest of your component



  

  // const handleFontSizeChange = (fontSize) => {
  //   setFontSize(fontSize);
  //   AsyncStorage.setItem("@options", JSON.stringify({ font_size: fontSize }));
  //   getOptionsFromAsyncStorage();
  // };

  // const toggleDarkMode = ( darkModeEnabled ) => {
  //   setDarkModeEnabled(darkModeEnabled);
  //   AsyncStorage.setItem("@options", JSON.stringify({ dark_mode: darkModeEnabled }));
  //   getOptionsFromAsyncStorage();
  // };

  const toggleContrastMode = (contrastModeEnabled) => {
    setContrastModeEnabled(contrastModeEnabled);
    const currentOptions = options ? { ...options } : {};
    currentOptions.contrast_mode = contrastModeEnabled;
    AsyncStorage.setItem("@options", JSON.stringify(currentOptions));
    getOptionsFromAsyncStorage();
  };

  const handleColorblindModeChange = (colorblindMode) => {
    setColorblindMode(colorblindMode);
    const currentOptions = options ? { ...options } : {};
    currentOptions.colorblind_mode = colorblindMode;
    AsyncStorage.setItem("@options", JSON.stringify(currentOptions));
    getOptionsFromAsyncStorage();
  };

  const isFocused = useIsFocused();

  const handleFactoryReset = () => {
    // Implement your factory reset logic here
    setFontSize('16');
    setDarkModeEnabled(false);
    setContrastModeEnabled(false);
    setColorblindMode('normal');

    AsyncStorage.setItem("@options", JSON.stringify({
      font_size: '16',
      dark_mode: false,
      contrast_mode: false,
      colorblind_mode: 'normal',
    }));
    getOptionsFromAsyncStorage();
  };

  useEffect(() => {
    if (isFocused) {
      getOptionsFromAsyncStorage();
    }
  }, [isFocused]);

  useEffect(() => {
    // This will be called whenever the 'options' state changes
    const firstParameter = options?.font_size;
    const secondParameter = options?.dark_mode;
    const thirdParameter = options?.contrast_mode
    const fourthParameter = options?.colorblind_mode;
    const backgroundStyle = optionsS?.customBackground;
    const mainStyle = optionsS?.customMain
    const secondaryStyle = optionsS?.customSecondary
    //console.log("Font Size:", firstParameter);
    //console.log("Dark Mode:", secondParameter);
    //console.log("High Contrast Mode:", thirdParameter);
    //console.log("Colorblind mode:", fourthParameter);
    //console.log("-----")
    //console.log("backgroundStyle:",backgroundStyle);
    //console.log("mainStyle:",mainStyle);
    //console.log("secondaryStyle:",secondaryStyle);
  }, [options, optionsS]);

  //Style for screens

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


  
  console.log(typeof(currentBackgroundImageKey)+" x "+currentBackgroundImageKey)
  //const currentBackgroundImageImport = require(currentBackgroundImage)
  const firstParameter = options?.font_size;
  const integerFP = parseInt(firstParameter)
  //console.log(firstParameter)
  const fontSizeStyle = isNaN(integerFP) ? { fontSize: 16 } : { fontSize: integerFP };
  //console.log(fontSizeStyle)
  const secondParameter = options?.dark_mode;
  const thirdParameter = options?.contrast_mode
  const fourthParameter = options?.colorblind_mode;
  const darkModeBool = secondParameter
  const contrastBool = thirdParameter
  const colorblindString = fourthParameter
  //console.log("COLORBLIND: "+colorblindString)
  //console.log("TEST HC : "+contrastBool)
  // const getBackgroundImage = (darkV, colorV) => {
  //   if (darkMode) {
  //     return require(`../img/dark_${colorblindMode}.png`);
  //   } else {
  //     return require(`../img/${colorblindMode}.png`);
  //   }
  // };
  var colorBackground;
  var colorText;
  var colorMain;
  var colorSecondary;
  var backgroundImage
  var colorButton = 'white'
  var colorBorder
  var colorBGButton = 'white'
  var colorAffirmation
  var colorNegation
  var colorDarkGray
  var colorLightGray
  var customImage
  if (contrastBool===false)
  {
  if (darkModeBool === false && colorblindString==="normal")
  {
    console.log("Biały motyw");
    colorBackground = CustomColors.customBackground;
    colorText = CustomColors.customText;
    colorMain = CustomColors.customMain;
    colorSecondary = CustomColors.customSecondary;
    colorAffirmation = CustomColors.customAffirmation;
    colorNegation = CustomColors.customNegation;
    colorDarkGray = CustomColors.customDarkGray;
    colorLightGray = CustomColors.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tloNormal";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)

  }
  else if (darkModeBool === true && colorblindString==="normal")
  {
    colorBackground = ColorsDark.customBackground;
    colorText = ColorsDark.customText;
    colorMain = ColorsDark.customMain;
    colorSecondary = ColorsDark.customSecondary;
    colorAffirmation = ColorsDark.customAffirmation;
    colorNegation = ColorsDark.customNegation;
    colorDarkGray = ColorsDark.customDarkGray;
    colorLightGray = ColorsDark.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tlo2Normal";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
    
  }
  else if (darkModeBool === false && colorblindString==="BCM")
  {
    console.log("Biały motyw");
    colorBackground = CustomColorsBCM.customBackground;
    colorText = CustomColorsBCM.customText;
    colorMain = CustomColorsBCM.customMain;
    colorSecondary = CustomColorsBCM.customSecondary;
    colorAffirmation = CustomColorsBCM.customAffirmation;
    colorNegation = CustomColorsBCM.customNegation;
    colorDarkGray = CustomColorsBCM.customDarkGray;
    colorLightGray = CustomColorsBCM.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tloBCM";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === true && colorblindString==="BCM")
  {
    colorBackground = ColorsDarkBCM.customBackground;
    colorText = ColorsDarkBCM.customText;
    colorMain = ColorsDarkBCM.customMain;
    colorSecondary = ColorsDarkBCM.customSecondary;
    colorAffirmation = ColorsDarkBCM.customAffirmation;
    colorNegation = ColorsDarkBCM.customNegation;
    colorDarkGray = ColorsDarkBCM.customDarkGray;
    colorLightGray = ColorsDarkBCM.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tlo2BCM";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === false && colorblindString==="Deuteranomaly")
  {
    colorBackground = CustomColorsDeuteranomaly.customBackground;
    colorText = CustomColorsDeuteranomaly.customText;
    colorMain = CustomColorsDeuteranomaly.customMain;
    colorSecondary = CustomColorsDeuteranomaly.customSecondary;
    colorAffirmation = CustomColorsDeuteranomaly.customAffirmation;
    colorNegation = CustomColorsDeuteranomaly.customNegation;
    colorDarkGray = CustomColorsDeuteranomaly.customDarkGray;
    colorLightGray = CustomColorsDeuteranomaly.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tloDeuteranomaly";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === true && colorblindString==="Deuteranomaly")
  {
    colorBackground = ColorsDarkDeuteranomaly.customBackground;
    colorText = ColorsDarkDeuteranomaly.customText;
    colorMain = ColorsDarkDeuteranomaly.customMain;
    colorSecondary = ColorsDarkDeuteranomaly.customSecondary;
    colorAffirmation = ColorsDarkDeuteranomaly.customAffirmation;
    colorNegation = ColorsDarkDeuteranomaly.customNegation;
    colorDarkGray = ColorsDarkDeuteranomaly.customDarkGray;
    colorLightGray = ColorsDarkDeuteranomaly.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tlo2Deuteranomaly";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === false && colorblindString==="Monochromacy")
  {
    colorBackground = CustomColorsMonochromacy.customBackground;
    colorText = CustomColorsMonochromacy.customText;
    colorMain = CustomColorsMonochromacy.customMain;
    colorSecondary = CustomColorsMonochromacy.customSecondary;
    colorAffirmation = CustomColorsMonochromacy.customAffirmation;
    colorNegation = CustomColorsMonochromacy.customNegation;
    colorDarkGray = CustomColorsMonochromacy.customDarkGray;
    colorLightGray = CustomColorsMonochromacy.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tloMonochromacy";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === true && colorblindString==="Monochromacy")
  {
    colorBackground = ColorsDarkMonochromacy.customBackground;
    colorText = ColorsDarkMonochromacy.customText;
    colorMain = ColorsDarkMonochromacy.customMain;
    colorSecondary = ColorsDarkMonochromacy.customSecondary;
    colorAffirmation = ColorsDarkMonochromacy.customAffirmation;
    colorNegation = ColorsDarkMonochromacy.customNegation;
    colorDarkGray = ColorsDarkMonochromacy.customDarkGray;
    colorLightGray = ColorsDarkMonochromacy.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tlo2Monochromacy";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === false && colorblindString==="Deuteranopia")
  {
    colorBackground = CustomColorsDeuteranopia.customBackground;
    colorText = CustomColorsDeuteranopia.customText;
    colorMain = CustomColorsDeuteranopia.customMain;
    colorSecondary = CustomColorsDeuteranopia.customSecondary;
    colorAffirmation = CustomColorsDeuteranopia.customAffirmation;
    colorNegation = CustomColorsDeuteranopia.customNegation;
    colorDarkGray = CustomColorsDeuteranopia.customDarkGray;
    colorLightGray = CustomColorsDeuteranopia.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tloDeuteranopia";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === true && colorblindString==="Deuteranopia")
  {
    colorBackground = ColorsDarkDeuteranopia.customBackground;
    colorText = ColorsDarkDeuteranopia.customText;
    colorMain = ColorsDarkDeuteranopia.customMain;
    colorSecondary = ColorsDarkDeuteranopia.customSecondary;
    colorAffirmation = ColorsDarkDeuteranopia.customAffirmation;
    colorNegation = ColorsDarkDeuteranopia.customNegation;
    colorDarkGray = ColorsDarkDeuteranopia.customDarkGray;
    colorLightGray = ColorsDarkDeuteranopia.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tlo2Deuteranopia";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === false && colorblindString==="Protanomaly")
  {
    colorBackground = CustomColorsProtanomaly.customBackground;
    colorText = CustomColorsProtanomaly.customText;
    colorMain = CustomColorsProtanomaly.customMain;
    colorSecondary = CustomColorsProtanomaly.customSecondary;
    colorAffirmation = CustomColorsProtanomaly.customAffirmation;
    colorNegation = CustomColorsProtanomaly.customNegation;
    colorDarkGray = CustomColorsProtanomaly.customDarkGray;
    colorLightGray = CustomColorsProtanomaly.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tloProtanomaly";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === true && colorblindString==="Protanomaly")
  {
    colorBackground = ColorsDarkProtanomaly.customBackground;
    colorText = ColorsDarkProtanomaly.customText;
    colorMain = ColorsDarkProtanomaly.customMain;
    colorSecondary = ColorsDarkProtanomaly.customSecondary;
    colorAffirmation = ColorsDarkProtanomaly.customAffirmation;
    colorNegation = ColorsDarkProtanomaly.customNegation;
    colorDarkGray = ColorsDarkProtanomaly.customDarkGray;
    colorLightGray = ColorsDarkProtanomaly.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tlo2Protanomaly";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === false && colorblindString==="Protanopia")
  {
    colorBackground = CustomColorsProtanopia.customBackground;
    colorText = CustomColorsProtanopia.customText;
    colorMain = CustomColorsProtanopia.customMain;
    colorSecondary = CustomColorsProtanopia.customSecondary;
    colorAffirmation = CustomColorsProtanopia.customAffirmation;
    colorNegation = CustomColorsProtanopia.customNegation;
    colorDarkGray = CustomColorsProtanopia.customDarkGray;
    colorLightGray = CustomColorsProtanopia.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tloProtanopia";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === true && colorblindString==="Protanopia")
  {
    colorBackground = ColorsDarkProtanopia.customBackground;
    colorText = ColorsDarkProtanopia.customText;
    colorMain = ColorsDarkProtanopia.customMain;
    colorSecondary = ColorsDarkProtanopia.customSecondary;
    colorAffirmation = ColorsDarkProtanopia.customAffirmation;
    colorNegation = ColorsDarkProtanopia.customNegation;
    colorDarkGray = ColorsDarkProtanopia.customDarkGray;
    colorLightGray = ColorsDarkProtanopia.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tlo2Protanopia";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === false && colorblindString==="Tritanomaly")
  {
    colorBackground = CustomColorsTritanomaly.customBackground;
    colorText = CustomColorsTritanomaly.customText;
    colorMain = CustomColorsTritanomaly.customMain;
    colorSecondary = CustomColorsTritanomaly.customSecondary;
    colorAffirmation = CustomColorsTritanomaly.customAffirmation;
    colorNegation = CustomColorsTritanomaly.customNegation;
    colorDarkGray = CustomColorsTritanomaly.customDarkGray;
    colorLightGray = CustomColorsTritanomaly.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tloTritanomaly";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === true && colorblindString==="Tritanomaly")
  {
    colorBackground = ColorsDarkTritanomaly.customBackground;
    colorText = ColorsDarkTritanomaly.customText;
    colorMain = ColorsDarkTritanomaly.customMain;
    colorSecondary = ColorsDarkTritanomaly.customSecondary;
    colorAffirmation = ColorsDarkTritanomaly.customAffirmation;
    colorNegation = ColorsDarkTritanomaly.customNegation;
    colorDarkGray = ColorsDarkTritanomaly.customDarkGray;
    colorLightGray = ColorsDarkTritanomaly.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tlo2Tritanomaly";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === false && colorblindString==="Tritanopia")
  {
    colorBackground = CustomColorsTritanopia.customBackground;
    colorText = CustomColorsTritanopia.customText;
    colorMain = CustomColorsTritanopia.customMain;
    colorSecondary = CustomColorsTritanopia.customSecondary;
    colorAffirmation = CustomColorsTritanopia.customAffirmation;
    colorNegation = CustomColorsTritanopia.customNegation;
    colorDarkGray = CustomColorsTritanopia.customDarkGray;
    colorLightGray = CustomColorsTritanopia.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tloTritanopia";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  else if (darkModeBool === true && colorblindString==="Tritanopia")
  {
    colorBackground = ColorsDarkTritanopia.customBackground;
    colorText = ColorsDarkTritanopia.customText;
    colorMain = ColorsDarkTritanopia.customMain;
    colorSecondary = ColorsDarkTritanopia.customSecondary;
    colorAffirmation = ColorsDarkTritanopia.customAffirmation;
    colorNegation = ColorsDarkTritanopia.customNegation;
    colorDarkGray = ColorsDarkTritanopia.customDarkGray;
    colorLightGray = ColorsDarkTritanopia.customLightGray;
    colorBorder = colorMain;
    colorBGButton = colorMain;
    customImage = "tlo2Tritanopia";

    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorMain,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)
  }
  colorBorder = colorMain
  colorBGButton = colorMain
}
else
{
    colorBackground = "black"
    colorMain = "white"
    colorText = "white"
    colorSecondary = "white"
    colorBorder = "white"
    colorAffirmation = "black"
    colorNegation = "black"
    colorBorder = "white";
    colorBGButton = "black";
    customImage = "tloHC";
    colorDarkGray = "black";
    colorLightGray = "black";
    
    AsyncStorage.setItem("@style", JSON.stringify({
      customBackground: colorBackground,
      customMain: colorMain,
      customSecondary: colorSecondary,
      customText: colorText,
      customAffirmation: colorAffirmation,
      customNegation: colorNegation,
      backgroundImageKey: customImage,
      customDarkGray: colorDarkGray,
      customLightGray: colorLightGray,
      customBorder: colorMain,
      customBGButton: colorBGButton,
    }));
    const currentOptions2 = optionsS ? { ...optionsS } : {};
    console.log(currentOptions2)

}

  //console.log('DarkModeBool = '+darkModeBool)
  

  if (!options) {
    // Options are not yet loaded, you might want to show a loading indicator or placeholder
    return null;
  }
  return (
    <View style={[styles.container,{backgroundColor: currentBackgroundColor}]}>
      <AnimetedImage 
            resizeMode="repeat" 
            style={[styles.background,{
                transform: [
                    {
                      translateX: translateAnimation,
                    },
                    {
                      translateY: translateAnimation,
                    },
                  ],
            }]}
            source={backgroundImageMappings[currentBackgroundImageKey]} />
      <View style={styles.setting}>
        <Text style={[styles.label,fontSizeStyle,{color: currentTextColor}]}>Font Size</Text>
        <Picker
          selectedValue={fontSize}
          style={[styles.picker,{color: currentTextColor}]}
          onValueChange={handleFontSizeChange}
        >
          <Picker.Item label="Small" value="12" />
          <Picker.Item label="Medium" value="16" />
          <Picker.Item label="Large" value="20" />
        </Picker>
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, fontSizeStyle,{color: currentTextColor}]}>Dark Mode</Text>
        <Switch value={darkModeEnabled} 
        onValueChange={toggleDarkMode} 
        thumbColor={currentMainColor}
        trackColor={{
          false: colorSecondary,
          true: colorSecondary,
  }}
  />
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, fontSizeStyle,{color: currentTextColor}]}>Contrast Mode</Text>
        <Switch value={contrastModeEnabled} onValueChange={toggleContrastMode} thumbColor={currentMainColor}
        trackColor={{
          false: currentSecondaryColor,
          true: currentSecondaryColor,}}/>
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, fontSizeStyle,{color: currentTextColor}]}>Colorblind Mode</Text>
        <Picker
          selectedValue={colorblindMode}
          style={[styles.picker,{color: currentTextColor}]}
          onValueChange={handleColorblindModeChange}
        >
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Blue Cone Monochromacy" value="BCM" />
          <Picker.Item label="Deuteranomaly" value="Deuteranomaly" />
          <Picker.Item label="Deuteranopia" value="Deuteranopia" />
          <Picker.Item label="Monochromacy" value="Monochromacy" />
          <Picker.Item label="Protanomaly" value="Protanomaly" />
          <Picker.Item label="Protanopia" value="Protanopia" />
          <Picker.Item label="Tritanomaly" value="Tritanomaly" />
          <Picker.Item label="Tritanopia" value="Tritanopia" />
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.factoryResetButton,{backgroundColor: currentBGButtonColor},{
          borderColor: currentBorderColor,  // Add this line for border color
          borderWidth: 1,               // Add this line for border width
          overflow: 'hidden',
        },]}
        onPress={handleFactoryReset}
      >
        <Text style={[styles.factoryResetButtonText, fontSizeStyle,{color: "white"}]}>Restore application to factory settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  factoryResetButton: {
    backgroundColor: CustomColors.customMain,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  factoryResetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  background: {
    position: 'absolute',
    width: 1200,
    height: 1200,
    top: 0,
    opacity: 0.2,
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: 0,
      },
    ],      
  }, 
});

export default SettingsScreen;