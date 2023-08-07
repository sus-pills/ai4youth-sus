import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import IconButton from "../components/iconButton";

// Styles Import
import { StyleSheet } from "react-native";
import { CustomColors, CustomSpacing } from "../global/globalStyles";

//
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { initializeAsyncStorage } from "../global/globalFunctions";
import ImagePicker from "react-native-image-picker";

const Detector = () => {
  const [title, setTitle] = useState("Take a Photo");

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
  if (darkModeBool === true)
  {
    console.log("Ciemny motyw")
    var colorBackground = "#0E2A3E";
    var colorText = "white";
    var colorMain = "#1A5A7D";
    var colorSecondary = "#0B344E";
  }
  else
  {
    console.log("Biały motyw")
    var colorBackground = "#FFFFFF";
    var colorText = "black";
    var colorMain = "#47B8E0";
    var colorSecondary = "#134074";
  }

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
      <View style={[styles.container,{backgroundColor: colorBackground}]}>
        <IconButton title={title} iconName="photo-camera" onPress={handleCameraPress} />
        {/* ... Your other components ... */}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.customBackground,
    fontSize: 16,
  },
});
export default Detector;
