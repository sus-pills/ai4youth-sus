import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { format } from "date-fns";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors } from "../global/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Calendar = () => {
  const [markedDates, setMarkedDates] = useState({});



  const calendarTheme = {
    "stylesheet.day.basic": {
      base: {
        height: 100,
      },
    },
    backgroundColor: "#f00",
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
        marking={"multi-dot"}
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
