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
  const DELETE_THIS_LATER = [
    {
      id: "4bd36a66-35da-4210-8530-bf6b94c02a9a",
      name: "Vitamin C",
      remainingIntakes: 4,
      startDate: 'Sun Aug 20 2023 13:46:20 GMT+0200 (Central European Summer Time)',
      dates: [
        'Sun Aug 20 2023 18:00:00 GMT+0200 (Central European Summer Time)',
        'Mon Aug 21 2023 12:00:00 GMT+0200 (Central European Summer Time)',
        'Mon Aug 21 2023 18:00:00 GMT+0200 (Central European Summer Time)',
        'Tue Aug 22 2023 12:00:00 GMT+0200 (Central European Summer Time)'
      ],
      hours: ["12:00", "18:00"],
      dosage: "100 mg",
      information: "Take after a meal",
      color: "#f00",
      icon: "pill",
    },
  ];

  try {
    // ! DELETE THIS LATER
    await AsyncStorage.clear();

    // Options
    (await AsyncStorage.getItem("@options")) ||
      (await AsyncStorage.setItem("@options", JSON.stringify(DEFAULT_OPTIONS)));

    // Medication Entries
    (await AsyncStorage.getItem("@entries")) ||
      (await AsyncStorage.setItem(
        "@entries",
        JSON.stringify(DELETE_THIS_LATER)
      ));

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

export const createDateTimes = (startDate, hours, remainingIntakes) => {
  /* generates an array of date-time strings */

  const datetimes = [];
  // Convert String to Date
  const formattedDate = new Date(startDate);
  // Changes array of "HH:mm" strings to array of [HH, mm] arrays
  const formattedHours = hours.map((hour) => hour.split(":"));

  let counter = 0; // keep track of current hour
  const nextDate = new Date(formattedDate); // copy

  while (datetimes.length < remainingIntakes) {

    // Proceed to the next hour
    nextDate.setHours(formattedHours[counter][0], formattedHours[counter][1], 0);

    // Append to datetimes if of further date
    if (nextDate >= formattedDate) {
      datetimes.push(nextDate.toString());
    }

    counter += 1;

    // Proceed to the next day if out of hours
    if (counter === hours.length) {
      counter = 0;
      nextDate.setDate(nextDate.getDate() + 1);
    }
  }

  return datetimes;
};

