import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { v4 as uuidv4 } from 'uuid'

// Custom Imports
import IconButton from "../components/iconButton";
import Entry from "../components/entry"

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors, CustomSpacing } from "../global/globalStyles";

const Entries = () => {
  const [entries, setEntries] = useState([
    {key: 1, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
    {key: 2, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
    {key: 3, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
    {key: 4, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
    {key: 5, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
    {key: 6, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
    {key: 7, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
    {key: 8, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
    {key: 9, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
    {key: 0, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
  ]);
  const [title, setTitle] = useState("Dodaj Wpis");

  return (
    <View style={styles.container}>
      {/* Button */}
      <IconButton title={title} iconName="add" />

      {/* Entries */}
      <ScrollView style={styles.scrollView}>
        {entries.map(entry => <Entry key={entry.key} entry={entry} />)}
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
    paddingHorizontal: 12,
    paddingTop: 0,
  }
});

export default Entries;