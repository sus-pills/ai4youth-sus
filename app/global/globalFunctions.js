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
  };

  // ! DELETE THIS LATER
  const DELETE_THIS_LATER = [{
    id: "0",
    name: "Vitamin C",
    remainingIntakes: 20,
    startDate: "2023-02-15",
    times: {
      "time-0": "12:00",
      "time-1": "18:00",
    },
    dosage: "100 mg",
    information: "Take after a meal",
    color: "#f00",
    icon: "pill",
  }];

  try {

    // ! DELETE THIS LATER
    await AsyncStorage.clear()

    // Options
    await AsyncStorage.getItem("@options") ||
      await AsyncStorage.setItem("@options", JSON.stringify(DEFAULT_OPTIONS));

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
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  switch (mode) {
    case "us":
      return `${monthFullNames[month]} ${day}, ${year}`;
    case "eu":
      return `${day} ${monthFullNames[month]} ${year}`;
    default:
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
};
