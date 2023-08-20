import AsyncStorage from "@react-native-async-storage/async-storage";
import hexRgb from "hex-rgb";

export const initializeAsyncStorage = async () => {
  /* 
    Initializes the async storage component with all keys predefined.
    * PLEASE! Use the '@' prefix for storage key names, like '@key1' (It is purely conventional).
    Storage checking / creation follows a simple pattern:
      Await stored value IF exists || Await new value IF doesn't exist
  */

  // Default options for the storage
  const DEFAULT_OPTIONS = {
    font_size: 16,
    dark_mode: false,
    contrast_mode: false,
    colorblind_mode: 'normal',
  };

  const DEFAULT_STYLE = {
    customBackground: "#FFFFFF",
    customMain: "#47B8E0",
    customSecondary: "#134074",
    customAffirmation: "#0BC11D",
    customNegation: "#F26419",
    customDarkGray: "#666666",
    customLightGray: "#dddddd",
    customText: "#000000",
    customBorder: "#47B8E",
    customBGButton: "#47B8E",
    backgroundImageKey: "tloNormal",
  };

  const DELETE_THIS_LATER = [{
    id: "0",
    name: "Vitamin C",
    remainingIntakes: 20,
    startDate: "2023-02-15",
    dates: {},
    hours: {
      "hour-0": "12:00",
      "hour-1": "18:00",
    },
    dosage: "100 mg",
    information: "Take after a meal",
    color: "#f00",
    icon: "pill",
  }];

  try {
    // Options
    await AsyncStorage.getItem("@options") ||
      AsyncStorage.setItem("@options", JSON.stringify(DEFAULT_OPTIONS));

    await AsyncStorage.getItem("@style") ||
      AsyncStorage.setItem("@style", JSON.stringify(DEFAULT_STYLE));
    // Medication Entries
    await AsyncStorage.getItem("@entries") ||
      await AsyncStorage.setItem("@entries", JSON.stringify(DELETE_THIS_LATER));

    // Add other things in the future here
    // ...
  } catch (error) {
    console.log("Error initializing AsyncStorage:", error);
  }
};

export const isLightColor = (bgColor) => {
  /* Checks whether the provided color is light or dark */

  const rgb = hexRgb(bgColor ? bgColor : "#000");

  const luminance =
    (0.299 * rgb.red + 0.587 * rgb.green + 0.114 * rgb.blue) / 255;
  return luminance > 0.5;
};

export const handleDate = (date, mode) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  const monthFullNames = {
    1: "JANUARY",
    2: "FEBRUARY",
    3: "MARCH",
    4: "APRIL",
    5: "MAY",
    6: "JUNE",
    7: "JULY",
    8: "AUGUST",
    9: "SEPTEMBER",
    10: "OCTOBER",
    11: "NOVERMBER",
    12: "DECEMBER",
  };

  if (mode === "r") {
    return `${day} ${monthFullNames[month]} ${year}`;
  }

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
