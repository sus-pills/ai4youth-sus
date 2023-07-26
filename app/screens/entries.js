import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { v4 as uuidv4 } from "uuid";

// Custom Imports
import IconButton from "../components/iconButton";
import Entry from "../components/entry";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors, CustomSpacing } from "../global/globalStyles";

// ! DELETE THIS LATER
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Entries = ({ navigation: { navigate } }) => {
  const [entries, setEntries] = useState([
    {
      id: "1",
      name: "Vitamin C",
      remainingIntakes: 20,
      nextDate: "2023-02-15",
      times: {
        "key-0": "12:00",
        "key-1": "18:00",
      },
      dosage: "100 mg",
      information: "Take after a meal",
      color: "#f00",
      icon: "pill",
    },
    {
      id: "2",
      name: "Calcium",
      remainingIntakes: 30,
      nextDate: "2022-12-01",
      times: {
        "key-0": "08:00",
        "key-1": "14:00",
        "key-2": "20:00",
      },
      dosage: "500 mg",
      information: "Take with food",
      color: "#0f0",
      icon: "pill",
    },
    {
      id: "3",
      name: "Iron",
      remainingIntakes: 25,
      nextDate: "2022-11-17",
      times: {
        "key-0": "10:00",
        "key-1": "15:00",
      },
      dosage: "200 mg",
      information: "Take with a glass of orange juice",
      color: "#00f",
      icon: "needle",
    },
    {
      id: "4",
      name: "Zinc",
      remainingIntakes: 40,
      nextDate: "2022-10-22",
      times: {
        "key-0": "09:00",
        "key-1": "12:00",
        "key-2": "18:00",
      },
      dosage: "150 mg",
      information: "Take before a meal",
      color: "#ff0",
      icon: "bottle-tonic-plus",
    },
    {
      id: "5",
      name: "Vitamin B12",
      remainingIntakes: 50,
      nextDate: "2022-09-19",
      times: {
        "key-0": "07:00",
        "key-1": "13:00",
        "key-2": "19:00",
      },
      dosage: "500 mcg",
      information: "Take with water",
      color: "#f0f",
      icon: "pill",
    },
    {
      id: "6",
      name: "Magnesium",
      remainingIntakes: 35,
      nextDate: "2022-08-15",
      times: {
        "key-0": "06:00",
        "key-1": "12:00",
        "key-2": "20:00",
      },
      dosage: "400 mg",
      information: "Take with a meal",
      color: "#0ff",
      icon: "medical-bag",
    },
    {
      id: "7",
      name: "Omega-3",
      remainingIntakes: 60,
      nextDate: "2022-07-12",
      times: {
        "key-0": "08:00",
        "key-1": "14:00",
      },
      dosage: "1000 mg",
      information: "Take with food",
      color: "#f80",
      icon: "pill",
    },
    {
      id: "8",
      name: "Folic Acid",
      remainingIntakes: 45,
      nextDate: "2022-06-17",
      times: {
        "key-0": "09:00",
        "key-1": "16:00",
        "key-2": "22:00",
      },
      dosage: "400 mcg",
      information: "Take with a glass of water",
      color: "#8f0",
      icon: "bottle-tonic-plus",
    },
    {
      id: "9",
      name: "Vitamin D",
      remainingIntakes: 55,
      nextDate: "2022-05-22",
      times: {
        "key-0": "07:00",
        "key-1": "13:00",
        "key-2": "20:00",
      },
      dosage: "1000 IU",
      information: "Take after a meal",
      color: "#0f8",
      icon: "needle",
    },
    {
      id: "10",
      name: "Probiotic",
      remainingIntakes: 50,
      nextDate: "2022-04-19",
      times: {
        "key-0": "06:00",
        "key-1": "12:00",
        "key-2": "18:00",
      },
      dosage: "1 capsule",
      information: "Take with a glass of water",
      color: "#f08",
      icon: "medical-bag",
    },
  ]);
  const [title, setTitle] = useState("Dodaj Wpis");

  // ! DELETE THIS LATER
  const isFocused = useIsFocused()
  const [fontSize, setFontSize] = useState(16);
  useEffect(() => {
    // Load the font size setting from AsyncStorage when the component mounts
    const loadFontSize = async () => {
      try {
        const storedFontSize = await AsyncStorage.getItem('@font_size');
        if (storedFontSize) {
          console.log(typeof(JSON.parse(storedFontSize)), JSON.parse(storedFontSize))
          setFontSize(JSON.parse(storedFontSize));
        }
      } catch (error) {
        console.log('Error loading font size:', error);
      }
    };


    if (isFocused){
      loadFontSize();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>

      {/* ! DELETE THIS LATER */}
      <Text style={{ fontSize: fontSize }}>
        This is a dummy text of font size {fontSize}
      </Text>

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
