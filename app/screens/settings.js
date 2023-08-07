import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { initializeAsyncStorage } from "../global/globalFunctions"; // Import the initializeAsyncStorage function
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {CustomColors} from "../global/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {

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

  const toggleDarkMode = (darkModeEnabled) => {
    setDarkModeEnabled(darkModeEnabled);
    const currentOptions = options ? { ...options } : {};
    currentOptions.dark_mode = darkModeEnabled;
    AsyncStorage.setItem("@options", JSON.stringify(currentOptions));
    getOptionsFromAsyncStorage();
  };

  // colorblind, high contrast , wszstkie screeny settingsy 




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
  var colorButton = 'white'
  if (darkModeBool === true)
  {
    console.log("Ciemny motyw")
    colorBackground = "#0E2A3E";
    colorText = "white";
    colorMain = "#1A5A7D";
    colorSecondary = "#0B344E";
  }
  else
  {
    console.log("Biały motyw")
    colorBackground = "#FFFFFF";
    colorText = "black";
    colorMain = "#47B8E0";
    colorSecondary = "#134074";
  }
  console.log('DarkModeBool = '+darkModeBool)

  return (
    <View style={[styles.container,{backgroundColor: colorBackground}]}>
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
});

export default SettingsScreen;