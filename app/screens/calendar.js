import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { initializeAsyncStorage } from "../global/globalFunctions";
import { View, Text, Image } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors,ColorsDark } from "../global/globalStyles";
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


import gif from "../img/calendar.gif"
const PillCalendar = () => {

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

  const [calendarBackground, setCalendarBackground] = useState(CustomColors.customBackground);
  const [colorBackground, setColorBackground] = useState('#FFFFFF');
  const [colorText, setColorText] = useState('#FFFFFF');
  const [calendarKey, setCalendarKey] = useState(new Date().toString()); // Add a key to force re-rendering
  const [options, setOptions] = useState(null);
  const [optionsS, setOptionsS] = useState(null);
  const [fontSize, setFontSize] = useState('medium');
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [contrastModeEnabled, setContrastModeEnabled] = useState(false);
  const [colorblindMode, setColorblindMode] = useState('normal');

  const [isLoading, setIsLoading] = useState(true);

  // Function to handle the calendar load complete event
  const handleCalendarLoadComplete = () => {
    setIsLoading(false);
  };
  const handleVisibleMonthsChange = () => {
    setIsLoading(false);
  };

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

  const fetchCalendarData = async () => {
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
      fetchCalendarData();
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
  const colorblindString = fourthParameter;

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

  // useEffect(() => {
  //   if (options) {
  //     const darkModeBool = options?.dark_mode;
  //     const colorBackground = darkModeBool ? "#0E2A3E" : "#FFFFFF";
  //     setCalendarBackground(colorBackground);
  //     setCalendarKey(new Date().toString()); // Update the key to force re-render
  //   }
  // }, [options]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay time as needed
    return () => clearTimeout(loadingTimeout);
  }, []);

  // useEffect hook to listen for changes in the 'isLoading' state
  useEffect(() => {
    // Perform any additional actions when the calendar finishes loading
    if (!isLoading) {
      // Calendar has finished loading, do something if needed
    }
  }, [isLoading]);

  const markedDates = {
    // Add custom styles for specific dates
    "2023-08-01": {
      customStyles: {
        container: {
          backgroundColor: "red",
          borderRadius: 12,
        },
        text: {
          color: "white",
        },
      },
    },
    "2023-08-10": {
      customStyles: {
        container: {
          backgroundColor: "blue",
          borderRadius: 12,
        },
        text: {
          color: "white",
        },
      },
    },
    // Add more dates with custom styles as needed
  };
  // var colorBackground;
  // var colorText;
  // var colorMain;
  // var colorSecondary;
  // var colorG = "#0AAE1A";
  // var colorR = "#E75A0D"
  // if (darkModeBool === true)
  // {
  //   console.log("Ciemny motyw")
  //   colorBackground = "#0E2A3E";
  //   colorText = "white";
  //   colorMain = "#1A5A7D";
  //   colorSecondary = "#0B344E";
  // }
  // else
  // {
  //   console.log("Biały motyw")
  //   colorBackground = "#FFFFFF";
  //   colorText = "black";
  //   colorMain = "#47B8E0";
  //   colorSecondary = "#134074";
  // }
  const calendarTheme = {
    "stylesheet.calendar.main": {
      container: {
        paddingLeft: 0, // Set the left padding to 0 to start the days from the leftmost position
      },
      week: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        //backgroundColor: "your_desired_color",
      },
      dayContainer: {
        flex: 1,
        alignItems: "center",
      },
      dayText: {
        fontSize: 18,
        fontWeight: "500",
        color: currentTextColor,
        textAlign: "center",
      },
    },
    "stylesheet.day.basic": {
      base: {
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: currentTextColor, // Set the border color for the day component
        borderWidth: 1,  
        borderRadius: 12,
        backgroundColor: currentMainColor,
      },
      text: {
        fontSize: 18, // Set the desired font size for day texts
        color: currentTextColor,
        fontWeight: 'bold',
      },
      today: {
        backgroundColor: currentBackgroundColor, // Set the background color for the current day
        fontWeight: 'bold',
      },
    },
    "stylesheet.calendar.header": {
      header: {
        //backgroundColor: "BLACK", // Apply the background color to the custom header
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //paddingLeft: 10,
        //paddingRight: 10,
        color: currentTextColor,
        backgroundColor: currentBackgroundColor,
        fontWeight: "bold",
        paddingHorizontal: 10, // Adjust the padding as needed
        paddingBottom: 10, // Add padding to the bottom
        borderColor: currentTextColor, // Set the border color for the day component
        borderWidth: 1,  
      },
      dayHeader: {
        color: currentTextColor,
        fontWeight: "bold",
        textAlign: "center",
        //margin: 5,
        fontSize: 18,
        width: 43,
        alignItems: "center",
        //padding: 2,
        borderColor: currentTextColor, // Set the border color for the day component
        borderWidth: 1,  
      },
      week: {
      backgroundColor: currentSecondaryColor,
      //marginTop: 5, // Add margin to separate the weekdays row from the month days
      flexDirection: "row",
      justifyContent: "space-between", // Adjust as needed
      alignItems: "center",
      //paddingHorizontal: 10, // Add horizontal padding
      //paddingVertical: 5, // Add vertical padding
      width: '100%',
      },
    },
    

    calendarBackground: 'rgba(235, 52, 0, 0)',
    dayTextColor: currentTextColor,
    monthTextColor: currentTextColor,
  };

  if (isLoading) {
    return (
      <View style={[Styles.container, { backgroundColor: currentBackgroundColor }]}>
        <AnimetedImage 
            resizeMode="repeat" 
            style={[Styles.background,{
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
        <Image source={gif} style={{width: 265, height: 265}}/>
      </View>
    );
  }


  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={[Styles.container, { backgroundColor: currentBackgroundColor }]}>
          <AnimetedImage 
            resizeMode="repeat" 
            style={[Styles.background,{
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
          <Text>Loading...</Text>
        </View>
      );
    }
    else {
      return (
    <View style={[Styles.container,{backgroundColor: currentBackgroundColor}]}>
      <AnimetedImage 
            resizeMode="repeat" 
            style={[Styles.background,{
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
      <View style={[Styles.calendarContainer]}>
      <CalendarList
        key={calendarKey} // Use the key to force re-rendering
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
        contentContainerStyle={{
          justifyContent: "center", // Align the items vertically to the center
          alignItems: "center", // Align the items horizontally to the center
        }}
        pagingEnabled={true}
        hideArrows={false}
        horizontal={true}
        firstDay={1}
        theme={calendarTheme}
        markedDates={markedDates}
        markingType={"custom"}
        renderDay={(day, item) => {
          if (isLoading) {
            // Display a custom component (e.g., a loader) while the calendar is loading
            return (
              <View>
                <Text>Loading...</Text>
              </View>
            );
          } else {
            // Calendar has finished loading, display the actual date
            return (
              <View>
                <Text>"LOADED"</Text>
              </View>
            );
          }
        }}
        onVisibleMonthsChange={handleVisibleMonthsChange}
      />
      </View>
    </View>
  );
      }
    };
  return renderContent();
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.customBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    fontSize: 25,
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

export default PillCalendar;
