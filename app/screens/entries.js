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
      id: "37X-1vW2",
      name: "Vitamin C",
      times: {
        "key-0": "12:00:00",
        "key-1": "18:00:00",
      },
      nextIntake: "2023-02-03 12:00:00",
      weekDays: ["Su", "St"],
      remainingIntakes: 20,
      everyXthDay: null,
      dosage: 10,
      unit: "milligramy",
      instructions: null,
      color: "#f00",
      icon: "pill",
    },

    {
      id: "5gH-9zQ6",
      name: "Calcium",
      times: {
        "key-0": "08:00:00",
        "key-1": "14:00:00",
        "key-2": "20:00:00",
      },
      nextIntake: "2023-03-01 08:00:00",
      weekDays: ["Mo", "We", "Fr"],
      remainingIntakes: 30,
      everyXthDay: null,
      dosage: 500,
      unit: "milligrams",
      instructions: "Take with food",
      color: "#0f0",
      icon: "pill",
    },

    {
      id: "k48-tM7z",
      name: "Iron",
      times: {
        "key-0": "06:00:00",
        "key-1": "12:00:00",
      },
      nextIntake: "2023-02-28 06:00:00",
      weekDays: ["Tu", "Th", "Sa"],
      remainingIntakes: 25,
      everyXthDay: null,
      dosage: 15,
      unit: "milligrams",
      instructions: "Take with orange juice",
      color: "#00f",
      icon: "pill",
    },

    {
      id: "jS7-pL6q",
      name: "Magnesium",
      times: {
        "key-0": "09:00:00",
        "key-1": "15:00:00",
      },
      nextIntake: "2023-03-02 09:00:00",
      weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      remainingIntakes: 35,
      everyXthDay: null,
      dosage: 400,
      unit: "milligrams",
      instructions: "Take with water",
      color: "#f0f",
      icon: "pill",
    },

    {
      id: "t6Q-hG9n",
      name: "Zinc",
      times: {
        "key-0": "10:00:00",
        "key-1": "16:00:00",
      },
      nextIntake: "2023-03-03 10:00:00",
      weekDays: ["Mo", "We", "Fr"],
      remainingIntakes: 20,
      everyXthDay: null,
      dosage: 25,
      unit: "milligrams",
      instructions: "Take on an empty stomach",
      color: "#f80",
      icon: "pill",
    },

    {
      id: "h9T-n7L6",
      name: "Biotin",
      times: {
        "key-0": "11:00:00",
        "key-1": "17:00:00",
      },
      nextIntake: "2023-03-01 11:00:00",
      weekDays: ["Tu", "Th", "Sa"],
      remainingIntakes: 15,
      everyXthDay: null,
      dosage: 5000,
      unit: "micrograms",
      instructions: "Take with a meal",
      color: "#0ff",
      icon: "pill",
    },

    {
      id: "p6L-t9Hn",
      name: "Folic Acid",
      times: {
        "key-0": "07:00:00",
        "key-1": "13:00:00",
      },
      nextIntake: "2023-02-28 07:00:00",
      weekDays: ["Mo", "We", "Fr"],
      remainingIntakes: 25,
      everyXthDay: null,
      dosage: 400,
      unit: "micrograms",
      instructions: "Take with a meal",
      color: "#ff0",
      icon: "pill",
    },

    {
      id: "n9T-l7P6",
      name: "Vitamin D",
      times: {
        "key-0": "08:00:00",
        "key-1": "14:00:00",
      },
      nextIntake: "2023-03-02 08:00:00",
      weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      remainingIntakes: 30,
      everyXthDay: null,
      dosage: 1000,
      unit: "international units",
      instructions: "Take with a meal",
      color: "#0f0",
      icon: "pill",
    },

    {
      id: "t9L-p6Hn",
      name: "Vitamin A",
      times: {
        "key-0": "09:00:00",
        "key-1": "15:00:00",
      },
      nextIntake: "2023-03-03 09:00:00",
      weekDays: ["Tu", "Th", "Sa"],
      remainingIntakes: 20,
      everyXthDay: null,
      dosage: 5000,
      unit: "international units",
      instructions: "Take with a meal",
      color: "#f00",
      icon: "pill",
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
