import React from "react";
import { View, Text } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors } from "../global/globalStyles";

const PillCalendar = () => {
  const calendarTheme = {
    "stylesheet.day.basic": {
      base: {
        height: 100,
      },
    },
    backgroundColor: "#f00"
  }

  return (
    <View style={Styles.container}>
      <CalendarList
        style={{ height: "100%" }}
        pagingEnabled={true}
        hideArrows={false}
        horizontal={true}
        firstDay={1}
        theme={
          calendarTheme
        }
        markedDates={
          {
            /* Tutaj będą wstawiane daty z wpisów */
          }
        }
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

export default PillCalendar;
