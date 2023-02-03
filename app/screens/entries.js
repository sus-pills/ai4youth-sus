import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { v4 as uuidv4 } from "uuid";

// Custom Imports
import IconButton from "../components/iconButton";
import Entry from "../components/entry";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors, CustomSpacing } from "../global/globalStyles";

const Entries = () => {
  const [entries, setEntries] = useState([
    {
      key: 1,
      name: "Vitamin C",
      times: { 1: "12:00:00", 2: "18:00:00" },
      nextIntake: "2023-02-03 12:00:00",
      everyXthDay: 2,
      color: "#f00",
    },
    {
      key: 2,
      name: "Calcium",
      times: { 1: "08:00:00", 2: "14:00:00", 3: "20:00:00" },
      nextIntake: "2023-02-03 08:00:00",
      everyXthDay: 1,
      color: "#0f0",
    },
    {
      key: 3,
      name: "Iron",
      times: { 1: "09:00:00", 2: "15:00:00" },
      nextIntake: "2023-02-03 09:00:00",
      everyXthDay: 3,
      color: "#00f",
    },
    {
      key: 4,
      name: "Zinc",
      times: { 1: "10:00:00", 2: "16:00:00", 3: "22:00:00" },
      nextIntake: "2023-02-03 10:00:00",
      everyXthDay: 2,
      color: "#ff0",
    },
    {
      key: 5,
      name: "Magnesium",
      times: { 1: "11:00:00", 2: "17:00:00" },
      nextIntake: "2023-02-03 11:00:00",
      everyXthDay: 1,
      color: "#f0f",
    },
    {
      key: 6,
      name: "Potassium",
      times: { 1: "07:00:00", 2: "13:00:00", 3: "19:00:00" },
      nextIntake: "2023-02-03 07:00:00",
      everyXthDay: 1,
      color: "#0ff",
    },
    {
      key: 7,
      name: "Omega-3",
      times: { 1: "06:00:00", 2: "12:00:00" },
      nextIntake: "2023-02-03 06:00:00",
      everyXthDay: 3,
      color: "#f90",
    },
    {
      key: 8,
      name: "Probiotics",
      times: { 1: "05:00:00", 2: "11:00:00", 3: "17:00:00" },
      nextIntake: "2023-02-03 05:00:00",
      everyXthDay: 2,
      color: "#9f0",
    },
    {
      key: 9,
      name: "Vitamin D",
      times: { 1: "04:00:00", 2: "10:00:00" },
      nextIntake: "2023-02-03 04:00:00",
      everyXthDay: 1,
      color: "#f09",
    },
    {
      key: 10,
      name: "Turmeric",
      times: { 1: "03:00:00", 2: "09:00:00", 3: "15:00:00" },
      nextIntake: "2023-02-03 03:00:00",
      everyXthDay: 2,
      color: "#90f",
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
          <Entry key={entry.key} entry={entry} />
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
    marginHorizontal: 12,
    marginTop: 0,
  },
});

export default Entries;
