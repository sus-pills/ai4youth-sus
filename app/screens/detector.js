import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import IconButton from "../components/iconButton";

// Styles Import
import { StyleSheet } from "react-native";
import {CustomColors, ColorsDark, CustomColorsBCM, ColorsDarkBCM, CustomColorsDeuteranomaly, ColorsDarkDeuteranomaly, CustomColorsDeuteranopia, ColorsDarkDeuteranopia, CustomColorsMonochromacy, ColorsDarkMonochromacy, CustomColorsProtanomaly, ColorsDarkProtanomaly, CustomColorsProtanopia, ColorsDarkProtanopia, CustomColorsTritanomaly, ColorsDarkTritanomaly, CustomColorsTritanopia, ColorsDarkTritanopia} from "../global/globalStyles";

//
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { initializeAsyncStorage } from "../global/globalFunctions";
import ImagePicker from "react-native-image-picker";
import { color } from "react-native-reanimated";
import { Animated, Easing, ImageBackground } from 'react-native';

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


const Detector = () => {
  console.log("-----------------")
  const [title, setTitle] = useState("Take a Photo");
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
  useFocusEffect(
    React.useCallback(() => {
      getOptionsFromAsyncStorage();
      initializeAsyncStorage();
    }, [])
  );
  useEffect(() => {
    // This will be called whenever the 'options' state changes
    const firstParameter = options?.font_size;
    const secondParameter = options?.dark_mode;
    const thirdParameter = options?.contrast_mode
    const fourthParameter = options?.colorblind_mode;
    console.log("Font Size:", firstParameter);
    console.log("Dark Mode:", secondParameter);
    console.log("High Contrast Mode:", thirdParameter);
    console.log("Colorblind mode:", fourthParameter);
  }, [options]);

  const firstParameter = options?.font_size;
  const integerFP = parseInt(firstParameter)
  console.log(firstParameter)
  const fontSizeStyle = isNaN(integerFP) ? { fontSize: 16 } : { fontSize: integerFP };
  console.log(fontSizeStyle)
  const secondParameter = options?.dark_mode;
  const thirdParameter = options?.contrast_mode
  const fourthParameter = options?.colorblind_mode;
  const fontSizeInteger = parseInt(firstParameter)
  const darkModeBool = secondParameter
  const contrastBool = thirdParameter
  const colorblindString = fourthParameter



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

  const handleCameraPress = () => {
    // Set options for the ImagePicker
    const optionsCam = {
      mediaType: 'photo', // Specify the media type (photo or video)
      maxWidth: 800, // Set the maximum width for the image
      maxHeight: 800, // Set the maximum height for the image
      quality: 1, // Set the quality of the image (0 to 1)
    };

    // Launch the camera
    ImagePicker.launchCamera(optionsCam, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // You can access the image data using response.uri
        console.log('Image URI: ', response.uri);
      }
    });
  };

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
        <View style={styles.centeredContent}>
        <IconButton title={title} iconName="photo-camera" 
        style={[{
          width: 255,
          backgroundColor: currentBGButtonColor,
          borderColor: currentBorderColor,
          borderWidth: 1,             
          overflow: 'hidden',
          },]}onPress={handleCameraPress} />
        {/* ... Your other components ... */}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.customBackground,
    fontSize: 16,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
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
export default Detector;
