import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Custom Imports
import IconButton from "../components/iconButton";
import Entry from "../components/entry";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors, CustomSpacing } from "../global/globalStyles";

const Entries = ({ navigation: { navigate } }) => {
  const [title, setTitle] = useState("Add Entry");

  // Entries array
  const [entries, setEntries] = useState([]);

  // Fetch Data
  const fetchDataFromStorage = async () => {
    try {
      const fetchedData = await AsyncStorage.getItem("@entries");
      const processedData = fetchedData ? JSON.parse(fetchedData) : [];
      setEntries(processedData);
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  // All effects on the screen
  useEffect(() => {
    // Check for data
    fetchDataFromStorage();
  }, [fetchDataFromStorage]);

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
