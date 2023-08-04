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
import InputText from "../components/inputText";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { HeaderBackButton } from "@react-navigation/elements";
import TrashHeaderButton from "../components/trashHeaderButton";

const EntryEdit = ({ route, navigation }) => {
  // Load params
  const entry = route.params.entry;

  // Exit Without Changes Alert
  const exitWithoutChanges = () => {
    Alert.alert(
      "Exit 'Edit Entry' screen?",
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
      <TrashHeaderButton onPress={() => console.log("delete")} />
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

  // Count times
  const [times, setTimes] = useState(`${Object.keys(entry.times).length}`);

  // Create list of which hour pickers to show
  const [showTimePicker, setShowTimePicker] = useState(
    Array.from({ length: 5 }, () => false)
  );

  // Create day picker show on/off
  const [showDayPicker, setShowDayPicker] = useState(false);

  // Handle date
  const handleHour = (hour) => {
    // Had to do it the old way
    // because the toLocaleTimeString
    // doesn't work in React Native apparently.

    const hours = hour.getHours().toString().padStart(2, "0");
    const minutes = hour.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Readable date in format of "21 MARCA 2023"
  const [readableDate, setReadableDate] = useState(
    handleDate(new Date(entry.nextDate), "r")
  );

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

  // Remove first occurence from array
  const removeFirstOccurrence = (array, value) => {
    const index = array.indexOf(value);
    if (index === -1) {
      return array;
    }
    return array.slice(0, index).concat(array.slice(index + 1));
  };

  return (
    <Formik
      style={styles.container}
      initialValues={entry}
      onSubmit={(values) => {
        values.times = handleObject(values.times);

        console.log("INITIAL", entry);
        console.log("CHANGED", values);
        navigation.goBack();
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
                <InputText text={"Name"} />
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
                <InputText text={"Remaining intakes"} />
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
              <View style={styles.inputContainer}>
                <InputText text={"From what day?"} />
                <IconButton
                  style={[styles.dateButton]}
                  title={readableDate}
                  textColor={"black"}
                  communityIcons={true}
                  iconName={"calendar-start"}
                  onPress={() => setShowDayPicker(true)}
                />

                {showDayPicker && (
                  <RNDateTimePicker
                    value={new Date()}
                    mode={"date"}
                    positiveButtonLabel={"Ok"}
                    negativeButtonLabel={"Cancel"}
                    onChange={(value) => {
                      // Hide the picker
                      setShowDayPicker(false);

                      // Check if value is set
                      if (value.type === "set") {
                        // Convert the value
                        const newDate = handleDate(
                          new Date(value.nativeEvent.timestamp)
                        );

                        const newReadableDate = handleDate(
                          new Date(value.nativeEvent.timestamp),
                          "r"
                        );

                        props.setFieldValue("nextDate", newDate);
                        setReadableDate(newReadableDate);
                      }
                    }}
                  />
                )}
              </View>

              {/* At what hours? */}
              <View style={styles.inputContainer}>
                <InputText text={"At what hours?"} />
                <View>
                  {/* Add Hour Button */}
                  {times < 5 && (
                    <IconButton
                      style={[styles.hourButton, styles.addHourButton]}
                      title={"Add time"}
                      iconName={"more-time"}
                      onPress={() => {
                        // Create new vars
                        const newIndex = parseInt(times);
                        const newTimes = { ...props.values.times };

                        // Move values one place to the right
                        for (let i = 0; i < newIndex; i++) {
                          newTimes[`key-${i + 1}`] =
                            props.values.times[`key-${i}`];
                        }

                        // Add new value on the left
                        newTimes["key-0"] = "08:00";
                        setTimes(newIndex + 1);
                        props.setFieldValue("times", newTimes);
                      }}
                    />
                  )}
                  {/* Show the list of time pickers */}
                  {Array.from({ length: parseInt(times) }, (_, index) => (
                    // Create the view with times
                    <View key={`key-${index}-time`}>
                      {/* Hour Picker */}
                      <View style={styles.hourButtons}>
                        <IconButton
                          textColor={"black"}
                          style={[
                            styles.hourButton,
                            { backgroundColor: "#f6f6f6" },
                          ]}
                          title={props.values.times[`key-${index}`]}
                          iconName={"access-time"}
                          onPress={() => {
                            const newShow = [...showTimePicker];
                            newShow[index] = true;
                            setShowTimePicker(newShow);
                          }}
                        />

                        {/* Delete Hour Picker */}
                        <IconButton
                          style={styles.deleteHourButton}
                          iconName={"delete-forever"}
                          onPress={() => {
                            // Create a set of current values without the current index.
                            const inherentValues = [
                              ...Object.values(props.values.times),
                            ];

                            // Remove the first occurrence
                            // In case there are multiple exact times
                            const newValues = removeFirstOccurrence(
                              inherentValues,
                              inherentValues[index]
                            );

                            // Assign values to keys
                            const newTimes = {};
                            for (let i = 0; i < newValues.length; i++) {
                              newTimes[`key-${i}`] = newValues[i];
                            }

                            // Update variables
                            setTimes(newValues.length);
                            props.setFieldValue("times", newTimes);
                          }}
                        />
                      </View>

                      {/* Time Picker */}
                      {showTimePicker[index] && (
                        <RNDateTimePicker
                          value={new Date()}
                          mode={"time"}
                          positiveButtonLabel={"Ok"}
                          negativeButtonLabel={"Cancel"}
                          onChange={(value) => {
                            // Hide the picker
                            const newShow = [...showTimePicker];
                            newShow[index] = false;
                            setShowTimePicker(newShow);

                            // Check if value is set
                            if (value.type === "set") {
                              // Convert the value
                              const dateValue = new Date(
                                value.nativeEvent.timestamp
                              );

                              // Change the value
                              const newValues = { ...props.values.times };
                              newValues[`key-${index}`] = handleHour(dateValue);
                              props.setFieldValue("times", newValues);
                            }
                          }}
                        />
                      )}
                    </View>
                  ))}
                </View>
              </View>

              {/* dosage & dosageUnit */}
              <View style={styles.inputContainer}>
                <InputText text={"Dosage"} />
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
                <InputText text={"Additional information"} />
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
  hourButtons: {
    flexDirection: "row",
    marginHorizontal: "7%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hourButton: {
    marginVertical: 4,
    marginHorizontal: 0,
    width: 270,
  },
  deleteHourButton: {
    marginVertical: 4,
    marginHorizontal: 0,
    width: 58,
    alignSelf: "center",
    backgroundColor: CustomColors.customNegation,
  },
  addHourButton: {
    width: 270 + 58 + 5,
    alignSelf: "center",
  },
  dateButton: {
    margin: 4,
    backgroundColor: "#f6f6f6",
    width: 270 + 58 + 5,
    alignSelf: "center",
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
