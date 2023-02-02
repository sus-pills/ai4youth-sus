import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { HexColors } from "../global/globalStyles";

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

// Styles
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HexColors.bg,
    verticalAlign: "center",
    justifyContent: "center",
  },
});

const PillCalendar = () => {
  return (
    <View style={Styles.container}>
      <CalendarList
        className="h-full"
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
}

export default PillCalendar;