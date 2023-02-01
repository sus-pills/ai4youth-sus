import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";

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
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ],
  dayNamesShort: ["Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob.", "Nie."],
  today: "Dzisiaj",
};
LocaleConfig.defaultLocale = "pl";

const Styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#0E2A3E",
    verticalAlign: "center",
    justifyContent: "center",
  },
  TekstAplikacji: {
    fontSize: 21,
    textAlign: "center",
    color: "#1A5A7D",
    fontFamily: "sans-serif-condensed",
  },
  KalendarzAplikacji: {
    borderRadius: 25,
    padding: 15,
    elevation: 2,
    backgroundColor: "#1A5A7D",
    color: "white",
    borderWidth: 2,
  },
});

export default function Calendar() {
  return (
    <View style={Styles.container}>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 25,
          padding: 15,
        }}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "blue",
          indicatorColor: "blue",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        markedDates={{
          "2023-02-01": { marked: true, selectedColor: "1A5A7D" },
          "2023-02-03": { marked: true, selectedColor: "1A5A7D" },
          "2023-02-05": { marked: true, selectedColor: "1A5A7D" },
          /* Tutaj będą wstawiane daty z wpisów */
        }}
      />
    </View>
  );
}
