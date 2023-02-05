import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { v4 as uuidv4 } from "uuid";

// Custom Imports
import IconButton from "../components/iconButton";
import Entry from "../components/entry";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors, CustomSpacing } from "../global/globalStyles";

const Entries = ({ navigation: { navigate } }) => {
  const [entries, setEntries] = useState([
    {
      id: "n37X-1vW2",
      name: "Vitamin C",
      times: {
        1: "12:00:00",
        2: "18:00:00",
      },
      nextIntake: "2023-02-03 12:00:00",
      weekDays: ["Su", "St"],
      remainingIntakes: 20,
      everyXthDay: null,
      dosage: 10,
      unit: "milligramy",
      instructions: null,
      color: "#f00",
    },

    {
      id: "5gH-9zQ6",
      name: "Calcium",
      times: {
        1: "08:00:00",
        2: "14:00:00",
        3: "20:00:00",
      },
      nextIntake: "2023-03-01 08:00:00",
      weekDays: ["Mo", "We", "Fr"],
      remainingIntakes: 30,
      everyXthDay: null,
      dosage: 500,
      unit: "milligrams",
      instructions: "Take with food",
      color: "#0f0",
    },

    {
      id: "k48-tM7z",
      name: "Iron",
      times: {
        1: "06:00:00",
        2: "12:00:00",
      },
      nextIntake: "2023-02-28 06:00:00",
      weekDays: ["Tu", "Th", "Sa"],
      remainingIntakes: 25,
      everyXthDay: null,
      dosage: 15,
      unit: "milligrams",
      instructions: "Take with orange juice",
      color: "#00f",
    },

    {
      id: "jS7-pL6q",
      name: "Magnesium",
      times: {
        1: "09:00:00",
        2: "15:00:00",
      },
      nextIntake: "2023-03-02 09:00:00",
      weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      remainingIntakes: 35,
      everyXthDay: null,
      dosage: 400,
      unit: "milligrams",
      instructions: "Take with water",
      color: "#f0f",
    },

    {
      id: "t6Q-hG9n",
      name: "Zinc",
      times: {
        1: "10:00:00",
        2: "16:00:00",
      },
      nextIntake: "2023-03-03 10:00:00",
      weekDays: ["Mo", "We", "Fr"],
      remainingIntakes: 20,
      everyXthDay: null,
      dosage: 25,
      unit: "milligrams",
      instructions: "Take on an empty stomach",
      color: "#f80",
    },

    {
      id: "h9T-n7L6",
      name: "Biotin",
      times: {
        1: "11:00:00",
        2: "17:00:00",
      },
      nextIntake: "2023-03-01 11:00:00",
      weekDays: ["Tu", "Th", "Sa"],
      remainingIntakes: 15,
      everyXthDay: null,
      dosage: 5000,
      unit: "micrograms",
      instructions: "Take with a meal",
      color: "#0ff",
    },

    {
      id: "p6L-t9Hn",
      name: "Folic Acid",
      times: {
        1: "07:00:00",
        2: "13:00:00",
      },
      nextIntake: "2023-02-28 07:00:00",
      weekDays: ["Mo", "We", "Fr"],
      remainingIntakes: 25,
      everyXthDay: null,
      dosage: 400,
      unit: "micrograms",
      instructions: "Take with a meal",
      color: "#ff0",
    },

    {
      id: "n9T-l7P6",
      name: "Vitamin D",
      times: {
        1: "08:00:00",
        2: "14:00:00",
      },
      nextIntake: "2023-03-02 08:00:00",
      weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      remainingIntakes: 30,
      everyXthDay: null,
      dosage: 1000,
      unit: "international units",
      instructions: "Take with a meal",
      color: "#0f0",
    },

    {
      id: "t9L-p6Hn",
      name: "Vitamin A",
      times: {
        1: "09:00:00",
        2: "15:00:00",
      },
      nextIntake: "2023-03-03 09:00:00",
      weekDays: ["Tu", "Th", "Sa"],
      remainingIntakes: 20,
      everyXthDay: null,
      dosage: 5000,
      unit: "international units",
      instructions: "Take with a meal",
      color: "#f00",
    },
  ]);
  const [title, setTitle] = useState("Dodaj Wpis");

  return (
    <View style={styles.container}>
      {/* Button */}
      <IconButton title={title} iconName="add" />

      {/* Entries */}
      <ScrollView style={styles.scrollView}>
        {entries.map((entry) => (
          <Entry
            onPress={() => {
              navigate("EntryInfo", { entry });
            }}
            key={entry.id}
            entry={entry}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.customBackground,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 0,
  },
});

export default Entries;
