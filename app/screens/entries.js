import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";

// Custom Imports
import IconButton from "../components/iconButton";
import Entry from "../components/entry";

// Styles Imports
import { StyleSheet } from "react-native";

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAsyncStorage } from "../global/globalFunctions";
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


const Entries = ({ navigation: { navigate } }) => {
  const INPUT_RANGE_START = 0;
  const INPUT_RANGE_END = 1;
  const OUTPUT_RANGE_START = 1;
  const OUTPUT_RANGE_END = 0;
  const ANIMATION_TO_VALUE = 1;
  const ANIMATION_DURATION = 1;
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      if (!animationPaused) {
        translateValue.setValue(initialValue);
        Animated.timing(translateValue, {
          toValue: ANIMATION_TO_VALUE,
          duration: ANIMATION_DURATION,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => translate());
      }
    };

    translate();
  }, [animationPaused]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });
  const [animationPaused, setAnimationPaused] = useState(false);
  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);
  useEffect(() => {
    if (!animationPaused) {
      // Only start the animation if it's not paused
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
    }
  }, [animationPaused, translateValue]);
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("Add Entry");

  const [options, setOptions] = useState({
    font_size: 'medium', // Provide a default value for font_size
    dark_mode: false,    // Provide a default value for dark_mode
    contrast_mode: 0,    // Provide a default value for contrast_mode
    colorblind_mode: 'normal', // Provide a default value for colorblind_mode
  });
  const [optionsS, setOptionsS] = useState({
    // Provide default values for your custom styles
    customBackground: '#FFFFFF',
    customMain: '#333333',
    customSecondary: '#555555',
    customAffirmation: '#00FF00',
    customNegation: '#FF0000',
    customDarkGray: '#111111',
    customLightGray: '#AAAAAA',
    customText: '#333333',
    customBorder: '#000000',
    customBGButton: '#FFFFFF',
    backgroundImageKey: 'tloNormal', // Provide a default value for backgroundImageKey
  });
  const [fontSize, setFontSize] = useState('medium');
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [contrastModeEnabled, setContrastModeEnabled] = useState(false);
  const [colorblindMode, setColorblindMode] = useState('normal');

  const fetchDataFromStorage = async () => {
    try {
      const fetchedData = await AsyncStorage.getItem("@entries");
      console.log("Fetched data:", fetchedData); // Add this line
      const processedData = fetchedData ? JSON.parse(fetchedData) : [];
      console.log("Processed data:", processedData); // Add thi
      setEntries(processedData);
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    // Check for data
    fetchDataFromStorage();
  }, [fetchDataFromStorage]);



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
    if (options) {
      const firstParameter = options?.font_size;
      const secondParameter = options?.dark_mode;
      const thirdParameter = options?.contrast_mode;
      const fourthParameter = options?.colorblind_mode;
      console.log("Font Size:", firstParameter);
      console.log("Dark Mode:", secondParameter);
      console.log("High Contrast Mode:", thirdParameter);
      console.log("Colorblind mode:", fourthParameter);
    }
  }, [options, optionsS]);

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

  console.log("CURRENTBGBUTTON: "+currentBGButtonColor)


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
  console.log(entries)
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
      {/* Button */}
      <IconButton title={title} style={{backgroundColor: currentBGButtonColor, borderColor: currentBorderColor,
          borderWidth: 1,             
          overflow: 'hidden',}} iconName="add" onPress={() => {
            navigate("EntryAdd");
          }}/>

      {/* Entries */}
      <ScrollView style={[styles.scrollView]}>
        {entries.map((entry) => (
          <Entry
            options={options}
            optionsS={optionsS}
            onPress={() => {
              navigate("EntryInfo", { entry });
            }}
            key={entry.id}
            entry={entry}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 0,
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

export default Entries;
