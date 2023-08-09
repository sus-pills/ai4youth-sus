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
import backgroundImage1 from '../img/atlo.png';
import backgroundImage2 from '../img/atlo2.png';



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
  var backgroundImage;
  useEffect(() => {
    if (darkModeBool === true) {
      setColorBackground(ColorsDark.customBackground); // Set the dark mode background color
      setColorText(ColorsDark.customText);
    } else {
      setColorBackground(CustomColors.customBackground); // Set the light mode background color
      setColorText(CustomColors.customText);
    }
    setCalendarKey(new Date().toString());
  }, [darkModeBool]);
  if (darkModeBool==true)
  {
    console.log(backgroundImage+" BAKCROUND IMAGE")
    backgroundImage = backgroundImage1
    console.log(backgroundImage+" BAKCROUND IMAGE")
  }
  else
  {
    backgroundImage = backgroundImage1
    console.log(backgroundImage+" BAKCROUND IMAGE")
  }
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
    "stylesheet.day.basic": {
      base: {
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontSize: 18, // Set the desired font size for day texts
        color: colorText,
      },
    },
    "stylesheet.calendar.header": {
      header: {
        backgroundColor: "BLACK", // Apply the background color to the custom header
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
      },
    },

    calendarBackground: colorBackground,
    dayTextColor: colorText,
    monthTextColor: colorText,
  };

  if (isLoading) {
    return (
      <View style={[Styles.container, { backgroundColor: colorBackground }]}>
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
            source={backgroundImage} />
        <Image source={gif} style={{width: 265, height: 265}}/>
      </View>
    );
  }


  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={[Styles.container, { backgroundColor: colorBackground }]}>
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
            source={backgroundImage} />
          <Text>Loading...</Text>
        </View>
      );
    }
    else {
      return (
    <View style={[Styles.container,{backgroundColor: colorBackground}]}>
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
            source={backgroundImage} />
      <View style={[Styles.calendarContainer]}>
      <CalendarList
        key={calendarKey} // Use the key to force re-rendering
        style={{
          flex: 1,
          backgroundColor: colorBackground,
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
