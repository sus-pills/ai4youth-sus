import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { initializeAsyncStorage } from "../global/globalFunctions"; // Import the initializeAsyncStorage function
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {CustomColors, ColorsDark} from "../global/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Animated, Easing, ImageBackground } from 'react-native';
import backgroundImage1 from '../img/atlo.png';
import backgroundImage2 from '../img/atlo2.png';


const SettingsScreen = ( { isDarkMode, setIsDarkMode }) => {
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
  const [fontSize, setFontSize] = useState('medium');
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [contrastModeEnabled, setContrastModeEnabled] = useState(false);
  const [colorblindMode, setColorblindMode] = useState('normal');

  const getOptionsFromAsyncStorage = async () => {
    try {
      const options = await AsyncStorage.getItem("@options");
      console.log("Fetched options:", options);
      setOptions(JSON.parse(options));
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
      setIsDarkMode(isEnabled);
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

  const toggleContrastMode = () => {
    setContrastModeEnabled((prevValue) => !prevValue);
  };

  const handleColorblindModeChange = (mode) => {
    setColorblindMode(mode);
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
  const contrastBool = parseInt(thirdParameter)
  const colorblindString = fourthParameter


  var colorBackground;
  var colorText;
  var colorMain;
  var colorSecondary;
  var colorG = "#0AAE1A";
  var colorR = "#E75A0D"
  var backgroundImage
  if (darkModeBool === true)
  {
    console.log("Ciemny motyw");
    colorBackground = ColorsDark.customBackground;
    colorText = ColorsDark.customText;
    colorMain = ColorsDark.customMain;
    colorSecondary = ColorsDark.customSecondary;
    backgroundImage = backgroundImage2
  }
  else
  {
    console.log("Biały motyw");
    colorBackground = CustomColors.customBackground;
    colorText = CustomColors.customText;
    colorMain = CustomColors.customMain;
    colorSecondary = CustomColors.customSecondary;
    backgroundImage = backgroundImage1
  }
  //console.log('DarkModeBool = '+darkModeBool)
  var colorButton = 'white'

  if (!options) {
    // Options are not yet loaded, you might want to show a loading indicator or placeholder
    return null;
  }
  return (
    <View style={[styles.container,{backgroundColor: colorBackground}]}>
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
            source={backgroundImage} />
      <View style={styles.setting}>
        <Text style={[styles.label,fontSizeStyle,{color: colorText}]}>Font Size</Text>
        <Picker
          selectedValue={fontSize}
          style={[styles.picker,{color: colorText}]}
          onValueChange={handleFontSizeChange}
        >
          <Picker.Item label="Small" value="12" />
          <Picker.Item label="Medium" value="16" />
          <Picker.Item label="Large" value="20" />
        </Picker>
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, fontSizeStyle,{color: colorText}]}>Dark Mode</Text>
        <Switch value={darkModeEnabled} 
        onValueChange={toggleDarkMode} />
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, fontSizeStyle,{color: colorText}]}>Contrast Mode</Text>
        <Switch value={contrastModeEnabled} onValueChange={toggleContrastMode} />
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, fontSizeStyle,{color: colorText}]}>Colorblind Mode</Text>
        <Picker
          selectedValue={colorblindMode}
          style={[styles.picker,{color: colorText}]}
          onValueChange={handleColorblindModeChange}
        >
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Protanopia" value="protanopia" />
          <Picker.Item label="Deuteranopia" value="deuteranopia" />
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.factoryResetButton,{backgroundColor: colorMain}]}
        onPress={handleFactoryReset}
      >
        <Text style={[styles.factoryResetButtonText, fontSizeStyle,{color: colorButton}]}>Restore application to factory settings</Text>
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