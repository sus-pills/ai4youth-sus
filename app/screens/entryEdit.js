import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Alert,
} from "react-native";
import IconButton from "../components/iconButton";
import {
  CustomBorder,
  CustomColors,
  GlobalStyles,
} from "../global/globalStyles";
import SingleModalButton from "../components/singleModalButton";
import { Formik } from "formik";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { isLightColor, handleDate } from "../global/globalFunctions";
import InputTitle from "../components/inputTitle";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { HeaderBackButton } from "@react-navigation/elements";
import TrashHeaderButton from "../components/trashHeaderButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DayPicker from "../components/dayPicker";
import HourManager from "../components/hourManager";

// TODO: Look for other TODOs in this file!
// ! A lot of lines here share code with entryAdd.js

const EntryEdit = ({ route, navigation }) => {
  // Load params
  const entry = route.params.entry;

  // Exit Without Changes Alert
  const exitWithoutChanges = () => {
    Alert.alert(
      "Exit this window?",
      "All unsaved changes will be lost.",
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigation.goBack(),
        },
      ],
      {
        cancelable: true,
      }
    );
    return true;
  };

  // Exit With Changes Alert
  const exitSave = (saveFunction) => {
    Alert.alert(
      "Save changes?",
      "This entry's data will be overwritten.",
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => saveFunction(),
        },
      ],
      {
        cancelable: true,
      }
    );
    return true;
  };

  // Handle the updated entry
  const handleEntryUpdate = async (updatedEntry) => {
    try {
      // Load all entries
      const fetchedData = await AsyncStorage.getItem("@entries");
      const data = fetchedData ? JSON.parse(fetchedData) : [];

      // Find the index
      const entryIndex = data.findIndex(
        (oldEntry) => oldEntry.id === updatedEntry.id
      );

      //  If the entry exists and is in fact different...
      if (
        entryIndex !== -1 &&
        JSON.stringify(data[entryIndex]) !== JSON.stringify(updatedEntry)
      ) {
        // Update the AsyncStorage
        data[entryIndex] = updatedEntry;
        const processedData = JSON.stringify(data);
        await AsyncStorage.setItem("@entries", processedData);

        // Update the route params
        navigation.setParams({ entry: updatedEntry });
      }

      // Go back
      navigation.navigate({
        name: "EntryInfo",
        params: { entry: updatedEntry },
        merge: true,
      });
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  // Delete the entry Alert
  const exitDelete = (deleteFunction) => {
    Alert.alert(
      "Delete this entry?",
      "The entry will be lost forever.",
      [
        {
          text: "Back",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteFunction(),
        },
      ],
      {
        cancelable: true,
      }
    );
    return true;
  };

  // Handle the deleted entry
  const handleEntryDelete = async () => {
    try {
      // Remove the subsequent entry
      const fetchedData = await AsyncStorage.getItem("@entries");
      const data = fetchedData ? JSON.parse(fetchedData) : [];
      const filteredData = data.filter((oldEntry) => oldEntry.id !== entry.id);

      // Update the AsyncStorage
      const processedData = JSON.stringify(filteredData);
      await AsyncStorage.setItem("@entries", processedData);

      // Go back to 'Entries'
      navigation.popToTop();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // Listen for system exit
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      exitWithoutChanges()
    );
    return () => backHandler.remove();
  }, []);

  // Change goBack button function
  navigation.setOptions({
    headerLeft: () => (
      <HeaderBackButton
        tintColor="white"
        onPress={() => exitWithoutChanges()}
      />
    ),
    headerRight: () => (
      <TrashHeaderButton onPress={() => exitDelete(handleEntryDelete)} />
    ),
  });

  // Change color
  const colorsPalette = [
    ["#FF9999", "#ff0000", "#800000", "#964B00"],
    ["#FFFF99", "#ffff00", "#808000", "#ffa500"],
    ["#99FF99", "#00ff00", "#008000", "#00ffff"],
    ["#9999FF", "#0000ff", "#000080", "#A020F0"],
    ["#ffffff", "#999999", "#000000", "#ff00ff"],
  ];
  const [selectedColor, setSelectedColor] = useState(null);

  // Choose icons
  const icons = ["pill", "needle", "bottle-tonic-plus", "medical-bag"];

  // Handle remaining intakes
  const handleRemainingIntakes = (value, num) => {
    const newValue = value + num;

    // Return a new value
    if (newValue >= 0 && !isNaN(newValue)) return parseInt(newValue);

    // handle new bad values
    return 0;
  };

  // Sorts and deletes duplicates from the given object
  const handleObject = (object) => {
    const keys = Object.keys(object);
    const values = [...new Set(Object.values(object))].sort();
    const length = values.length;

    const newObject = {};

    for (let i = 0; i < length; i++) {
      newObject[keys[i]] = values[i];
    }

    return newObject;
  };

  return (
    <Formik
      style={styles.container}
      initialValues={entry}
      onSubmit={(values) => {
        values.hours = handleObject(values.hours);

        // Handle the entry update and exit
        handleEntryUpdate(values);
        console.log("New object: ", values)
      }}
    >
      {(props) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <ScrollView>
              {/* Color Box & Modal Button */}
              <View style={styles.buttons}>
                {/* Color Box */}
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: props.values.color },
                    GlobalStyles.customShadow,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={props.values.icon}
                    size={40}
                    color={isLightColor(props.values.color) ? "black" : "white"}
                  />
                </View>

                {/* Modal Button */}
                <SingleModalButton
                  buttonStyle={styles.changeColor}
                  iconName={"color-lens"}
                  title={"Change color"}
                  // Clear the color picker upon leaving
                  onLeave={() => setSelectedColor(null)}
                  // Change Color on Accept
                  onAccept={() =>
                    props.setFieldValue(
                      "color",
                      // Don't change if null
                      selectedColor || props.values.color
                    )
                  }
                >
                  {/* Color Palette */}
                  <View style={styles.colorPickerContaier}>
                    {colorsPalette.map((row, indexY) => (
                      // Create rows
                      <View
                        key={`${indexY}-0`}
                        style={{ flexDirection: "row" }}
                      >
                        {row.map((color, indexX) => (
                          // Create a single cell
                          <TouchableOpacity
                            activeOpacity={0.6}
                            key={`${indexY}-${indexX}`}
                            // Assign a new selected color upon press
                            onPress={() => setSelectedColor(color)}
                            style={[
                              styles.colorSwitch,
                              { backgroundColor: color },
                              // Assign 'selected' style on press
                              selectedColor === color && styles.selectedColor,
                            ]}
                          ></TouchableOpacity>
                        ))}
                      </View>
                    ))}
                  </View>
                </SingleModalButton>
              </View>

              {/* Icons */}
              <View style={styles.icons}>
                {icons.map((icon) => (
                  <TouchableOpacity
                    style={[
                      styles.iconSwitch,
                      props.values.icon === icon && styles.selectedIcon,
                    ]}
                    activeOpacity={0.6}
                    key={icon}
                    onPress={() => props.setFieldValue("icon", icon)}
                  >
                    <MaterialCommunityIcons
                      name={icon}
                      size={30}
                      color={"black"}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* name */}
              <View style={styles.inputContainer}>
                <InputTitle text={"Name"} />
                <TextInput
                  style={styles.input}
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                  placeholder={"e.g. Insuline"}
                />
              </View>

              {/* remainingIntakes */}
              <View style={styles.inputContainer}>
                <InputTitle text={"Remaining intakes"} />
                <View style={styles.upDownInputButtons}>
                  {/* Decrease by 5 */}
                  <IconButton
                    iconName={"chevron-double-down"}
                    communityIcons={true}
                    style={[styles.upDownButton, styles.upDownButtonLeft]}
                    onPress={() =>
                      props.setFieldValue(
                        "remainingIntakes",
                        handleRemainingIntakes(
                          props.values.remainingIntakes,
                          -5
                        )
                      )
                    }
                  />

                  {/* Decrease the number by 1 */}
                  <IconButton
                    iconName={"chevron-down"}
                    communityIcons={true}
                    style={[styles.upDownButton, styles.upDownButtonLeft]}
                    onPress={() =>
                      props.setFieldValue(
                        "remainingIntakes",
                        handleRemainingIntakes(
                          props.values.remainingIntakes,
                          -1
                        )
                      )
                    }
                  />

                  {/* Show Remaining intakes */}
                  <TextInput
                    style={[styles.input, { width: 184, textAlign: "center" }]}
                    onChangeText={props.handleChange("remainingIntakes")}
                    onBlur={props.handleBlur("remainingIntakes")}
                    value={`${props.values.remainingIntakes}`}
                    placeholder={"np. 10"}
                    keyboardType={"numeric"}
                  />

                  {/* Increase the number by 1 */}
                  <IconButton
                    iconName={"chevron-up"}
                    communityIcons={true}
                    style={styles.upDownButton}
                    onPress={() =>
                      props.setFieldValue(
                        "remainingIntakes",
                        handleRemainingIntakes(props.values.remainingIntakes, 1)
                      )
                    }
                  />

                  {/* Increase by 5 */}
                  <IconButton
                    iconName={"chevron-double-up"}
                    communityIcons={true}
                    style={styles.upDownButton}
                    onPress={() =>
                      props.setFieldValue(
                        "remainingIntakes",
                        handleRemainingIntakes(props.values.remainingIntakes, 5)
                      )
                    }
                  />
                </View>
              </View>

              {/* From what day? */}
              <DayPicker
                props={props}
                currentDate={entry.startDate}
                text={"From what day?"}
              />

              {/* At what hours? */}
              <HourManager
                props={props}
                currentHours={entry.hours}
                text={"At what hours?"}
              />

              {/* dosage & dosageUnit */}
              <View style={styles.inputContainer}>
                <InputTitle text={"Dosage"} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "space-between",
                    width: "100%",
                  }}
                >
                  <TextInput
                    onChangeText={props.handleChange("dosage")}
                    onBlur={props.handleBlur("dosage")}
                    value={props.values.dosage}
                    placeholder={"(optional) e.g. 2 pills"}
                    style={[styles.input]}
                  />
                </View>
              </View>

              {/* instructions */}
              <View style={styles.inputContainer}>
                <InputTitle text={"Additional information"} />
                <TextInput
                  multiline
                  style={styles.input}
                  onChangeText={props.handleChange("information")}
                  onBlur={props.handleBlur("information")}
                  value={props.values.information}
                  placeholder={"(optional) e.g. Take after a meal"}
                />
              </View>
            </ScrollView>
          </View>

          {/* Buttons Cancel / Approve */}
          <View style={styles.buttons}>
            {/* Cancel Button */}
            <IconButton
              onPress={() => exitWithoutChanges()}
              style={[
                styles.button,
                { backgroundColor: CustomColors.customNegation },
              ]}
              title={"Cancel"}
              iconName={"close"}
            />

            {/* Approve Button */}
            <IconButton
              onPress={() => exitSave(props.handleSubmit)}
              style={[
                styles.button,
                { backgroundColor: CustomColors.customAffirmation },
              ]}
              title={"Save"}
              iconName={"check"}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: CustomColors.customBackground,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 8,
  },
  header: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "40%",
  },
  changeColor: {
    height: 60,
    marginVertical: 18,
    marginHorizontal: 9,
  },
  colorBox: {
    height: 50,
    width: 50,
    marginVertical: 18,
    marginHorizontal: 9,
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  colorPickerContaier: {
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  colorSwitch: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#aaa",
    margin: 7,
  },
  selectedColor: {
    width: 64,
    height: 64,
    borderRadius: 32,
    margin: 0,
  },
  iconSwitch: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#aaa",
    margin: 5,
  },
  selectedIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: CustomColors.customDarkGray,
    margin: 0,
  },
  inputContainer: {
    margin: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: CustomColors.customDarkGray,
    borderRadius: CustomBorder.customRadius,
    padding: 8,
    marginTop: 4,
    fontSize: 20,
    width: "100%",
  },
  upDownButton: {
    margin: 0,
    marginLeft: 4,
    marginTop: 4,
    padding: 0,
    width: "12%",
    justifyContent: "center",
    alignContent: "center",
  },
  upDownButtonLeft: {
    marginLeft: 0,
    marginRight: 4,
  },
  upDownInputButtons: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "flex-start",
  },
});

export default EntryEdit;
