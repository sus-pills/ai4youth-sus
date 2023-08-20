import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text } from "react-native";
import { CalendarList } from "react-native-calendars";
import { format } from "date-fns";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors } from "../global/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Calendar = () => {
  const [markedDates, setMarkedDates] = useState({});

  const fetchData = async () => {
    try {
      // Fetch and check
      const fetchedData = await AsyncStorage.getItem("@entries");
      const data = fetchedData ? JSON.parse(fetchedData) : [];
      return data;
    } catch (error) {
      console.error("[calendar.js] Error retrieving @entries:", error);
      return [];
    }
  };

  const updateCalendar = (entries) => {
    const newDates = {};

    entries.forEach((entry) => {
      entry.dates.forEach((date) => {
        // Format the date
        const formattedDate = format(new Date(date), "yyyy-MM-dd");

        // Create a new key-val pair with all properties
        if (!newDates[formattedDate]) {
          newDates[formattedDate] = { dots: [] };
        }

        // Add colorful dots
        const newDot = { key: date, color: entry.color };
        newDates[formattedDate].dots.push(newDot);
      });
    });

    // Return updated dates
    return { ...newDates };
  };

  useFocusEffect(
    useCallback(() => {
      const updateScreen = async () => {
        try {
          // Fetch data from AsyncStorage
          const data = await fetchData();
          // Update the calendar and state
          const dates = updateCalendar(data);
          setMarkedDates(dates);
          console.log("WOW")
        } catch (error) {
          console.error("[calendar.js] Error updating screen:", error);
        }
      };

      updateScreen(); // Call the async function
    }, [])
  );

  const calendarTheme = {
    "stylesheet.day.basic": {
      base: {
        height: 100,
      },
    },
  };

  return (
    <View style={Styles.container}>
      <CalendarList
        style={{ height: "100%" }}
        pagingEnabled={true}
        hideArrows={false}
        horizontal={true}
        firstDay={1}
        theme={calendarTheme}
        markingType={"multi-dot"}
        markedDates={markedDates}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.customBackground,
    verticalAlign: "center",
    justifyContent: "center",
  },
});

export default Calendar;
