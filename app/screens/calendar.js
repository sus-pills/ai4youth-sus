import React from "react";
import { View, Text } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors } from "../global/globalStyles";

LocaleConfig.locales["pl"] = {
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: [
    "Sty.",
    "Luty",
    "Mar.",
    "Kwi.",
    "Maj",
    "Cze.",
    "Lip.",
    "Sie.",
    "Wrz.",
    "Paź.",
    "Lis.",
    "Gru.",
  ],
  dayNames: [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ],
  dayNamesShort: ["N", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"],
  today: "Dzisiaj",
};

// Localization config
LocaleConfig.defaultLocale = "pl";

const PillCalendar = () => {
  return (
    <View style={Styles.container}>
      <CalendarList
        style={{ height: "100%" }}
        pagingEnabled={true}
        hideArrows={false}
        horizontal={true}
        firstDay={1}
        theme={{
          "stylesheet.day.basic": {
            base: {
              height: 100,
            },
          },
        }}
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
    backgroundColor: CustomColors.bg,
    verticalAlign: "center",
    justifyContent: "center",
  },
});

export default PillCalendar;
