import React, {useState, useEffect, useRef} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { initializeAsyncStorage } from "../global/globalFunctions";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../components/iconButton";
import {CustomColors, ColorsDark} from "../global/globalStyles";
import { Animated, Easing, ImageBackground } from 'react-native';
import backgroundImage1 from '../img/tloNormal.png';
import backgroundImage2 from '../img/tlo2Normal.png';

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

const EntryInfo = ({ route, navigation }) => {
  const entry = route.params.entry;
  const times = Object.values(entry.times);

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
  const fontSizeStyle = isNaN(integerFP) ? { fontSize: 16 } : { fontSize: integerFP+4 };
  const fontSizeStyle2 = isNaN(integerFP) ? { fontSize: 16 } : { fontSize: integerFP+8 };
  console.log(fontSizeStyle)
  const secondParameter = options?.dark_mode;
  const thirdParameter = options?.contrast_mode
  const fourthParameter = options?.colorblind_mode;
  const fontSizeInteger = parseInt(firstParameter)
  const darkModeBool = secondParameter
  const contrastBool = parseInt(thirdParameter)
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

  const InfoRow = ({ label, value, colorText }) => (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, {color: colorText}, fontSizeStyle]}>{label}:</Text>
      <Text style={[styles.infoValue,{color: colorText},fontSizeStyle]}>{value}</Text>
    </View>
  );

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
      <Text style={[styles.entryTitle,{color: currentTextColor},fontSizeStyle2]}>{entry.name}</Text>
      <View style={[styles.infoContainer]}>
        <InfoRow label="Key" value={entry.id} colorText={currentTextColor}/>
        {times.map((time, index) => (
          <InfoRow key={index} label={`Time #${index + 1}`} value={time} colorText={currentTextColor}/>
        ))}
        <InfoRow label="Next Intake" value={entry.nextIntake} colorText={currentTextColor} />
        <InfoRow label="Every Xth Day" value={entry.everyXthDay} colorText={currentTextColor} />
        <InfoRow label="Color" value={entry.color} colorText={currentTextColor}/>
      </View>
      <IconButton
        onPress={() => {
          navigation.navigate("EntryEdit", { entry });
        }}
        iconName="square-edit-outline"
        communityIcons={true}
        title="Edit"
        style={{backgroundColor: currentBGButtonColor, borderColor: currentBorderColor,
          borderWidth: 1,             
          overflow: 'hidden',}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  entryTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Adjust the color as needed
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabel: {
    flex: 1,
    fontSize: 18,
    color: "#555", // Adjust the color as needed
  },
  infoValue: {
    flex: 2,
    fontSize: 18,
    color: "#111", // Adjust the color as needed
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

export default EntryInfo;
