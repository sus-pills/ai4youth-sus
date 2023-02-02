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
  //   {key: 1, name: "Witamina C", datetime: "2023-02-03 15:15:15", period: 86400, color: "red"},
  ]);
  const [title, setTitle] = useState("Dodaj Wpis");

  return (
    <View style={styles.container}>
      {/* Button */}
      <IconButton title={title} iconName="add" />

      {/* Entries */}
      <ScrollView>
        {entries.map(entry => <Entry entry={entry} />)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.customBackground,
    padding: CustomSpacing.customPadding,
  },
  scrollView: {
    flex: 1,
  }
});

export default Entries;