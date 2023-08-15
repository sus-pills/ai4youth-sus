import React, { useState, useEffect, useRef } from "react";
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
  const [entries, setEntries] = useState([
    {
      id: "1",
      name: "Vitamin C",
      remainingIntakes: 20,
      nextDate: "2023-02-15",
      times: {
        "key-0": "12:00",
        "key-1": "18:00",
      },
      dosage: "100 mg",
      information: "Take after a meal",
      color: "#f00",
      icon: "pill",
    },
    {
      id: "2",
      name: "Calcium",
      remainingIntakes: 30,
      nextDate: "2022-12-01",
      times: {
        "key-0": "08:00",
        "key-1": "14:00",
        "key-2": "20:00",
      },
      dosage: "500 mg",
      information: "Take with food",
      color: "#0f0",
      icon: "pill",
    },
    {
      id: "3",
      name: "Iron",
      remainingIntakes: 25,
      nextDate: "2022-11-17",
      times: {
        "key-0": "10:00",
        "key-1": "15:00",
      },
      dosage: "200 mg",
      information: "Take with a glass of orange juice",
      color: "#00f",
      icon: "needle",
    },
    {
      id: "4",
      name: "Zinc",
      remainingIntakes: 40,
      nextDate: "2022-10-22",
      times: {
        "key-0": "09:00",
        "key-1": "12:00",
        "key-2": "18:00",
      },
      dosage: "150 mg",
      information: "Take before a meal",
      color: "#ff0",
      icon: "bottle-tonic-plus",
    },
    {
      id: "5",
      name: "Vitamin B12",
      remainingIntakes: 50,
      nextDate: "2022-09-19",
      times: {
        "key-0": "07:00",
        "key-1": "13:00",
        "key-2": "19:00",
      },
      dosage: "500 mcg",
      information: "Take with water",
      color: "#f0f",
      icon: "pill",
    },
    {
      id: "6",
      name: "Magnesium",
      remainingIntakes: 35,
      nextDate: "2022-08-15",
      times: {
        "key-0": "06:00",
        "key-1": "12:00",
        "key-2": "20:00",
      },
      dosage: "400 mg",
      information: "Take with a meal",
      color: "#0ff",
      icon: "medical-bag",
    },
    {
      id: "7",
      name: "Omega-3",
      remainingIntakes: 60,
      nextDate: "2022-07-12",
      times: {
        "key-0": "08:00",
        "key-1": "14:00",
      },
      dosage: "1000 mg",
      information: "Take with food",
      color: "#f80",
      icon: "pill",
    },
    {
      id: "8",
      name: "Folic Acid",
      remainingIntakes: 45,
      nextDate: "2022-06-17",
      times: {
        "key-0": "09:00",
        "key-1": "16:00",
        "key-2": "22:00",
      },
      dosage: "400 mcg",
      information: "Take with a glass of water",
      color: "#8f0",
      icon: "bottle-tonic-plus",
    },
    {
      id: "9",
      name: "Vitamin D",
      remainingIntakes: 55,
      nextDate: "2022-05-22",
      times: {
        "key-0": "07:00",
        "key-1": "13:00",
        "key-2": "20:00",
      },
      dosage: "1000 IU",
      information: "Take after a meal",
      color: "#0f8",
      icon: "needle",
    },
    {
      id: "10",
      name: "Probiotic",
      remainingIntakes: 50,
      nextDate: "2022-04-19",
      times: {
        "key-0": "06:00",
        "key-1": "12:00",
        "key-2": "18:00",
      },
      dosage: "1 capsule",
      information: "Take with a glass of water",
      color: "#f08",
      icon: "medical-bag",
    },
  ]);
  const [title, setTitle] = useState("Add Entry");

  const [options, setOptions] = useState({});
  const [optionsS, setOptionsS] = useState({});
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
          overflow: 'hidden',}} iconName="add" />

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
