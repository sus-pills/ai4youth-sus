import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  NativeModules,
} from "react-native";
import IconButton from "../components/iconButton";
import {
  CustomBorder,
  CustomColors,
  CustomSpacing,
  GlobalStyles,
} from "../global/globalStyles";
import SingleModalButton from "../components/singleModalButton";
import { Formik } from "formik";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { isLightColor } from "../global/globalFunctions";
import InputText from "../components/inputText";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const EntryEdit = ({ route, navigation }) => {
  // Load params
  const entry = route.params.entry;

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

  // Count times
  const [times, setTimes] = useState(`${Object.keys(entry.times).length}`);

  // // Store values of time
  // const [timesValues, setTimesValues] = useState(() => {
  //   const values = Array.from({ length: 10 }, () => "08:00");
  //   for (let i = 0; i < 10; i++) values[i] = Object.values(entry.times)[i];
  //   return values;
  // });

  // Create list of which pickers to show
  const [showTimePicker, setShowTimePicker] = useState(
    Array.from({ length: 5 }, () => false)
  );

  // Handle date
  const handleDate = (date) => {
    // Had to do it the old way
    // because the toLocaleTimeString
    // doesn't work in React Native apparently.

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Sort elements in object
  const sortObject = (object) => {
    const length = Object.keys(object).length;
    const keys = Object.keys(object);
    const values = Object.values(object).sort();

    for (let i = 0; i < length; i++) {
      object[keys[i]] = values[i];
    }
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
        sortObject(values.times);

        console.log(values);
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
                  title={"Zmień Kolor"}
                  // Clear the color picker upon leaving
                  onLeave={() => setSelectedColor(null)}
                  // Change Color on Accept
                  onAccept={() =>
                    props.setFieldValue(
                      "color",
                      // Don't change if null
                      selectedColor ? selectedColor : props.values.color
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
                <InputText text={"Nazwa"} />
                <TextInput
                  style={styles.input}
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                  placeholder={"np. Insulina"}
                />
              </View>

              {/* remainingIntakes */}
              <View style={styles.inputContainer}>
                <InputText text={"Pozostała ilość zażyć"} />
                <View style={{ flexDirection: "row" }}>
                  <IconButton
                    iconName={"chevron-double-down"}
                    communityIcons={true}
                    style={styles.downButton}
                    onPress={() =>
                      props.setFieldValue(
                        "remainingIntakes",
                        (props.values.remainingIntakes
                          ? parseInt(props.values.remainingIntakes)
                          : 5) - 5
                      )
                    }
                  />
                  <IconButton
                    iconName={"chevron-down"}
                    communityIcons={true}
                    style={styles.downButton}
                    onPress={() =>
                      props.setFieldValue(
                        "remainingIntakes",
                        (props.values.remainingIntakes
                          ? parseInt(props.values.remainingIntakes)
                          : 1) - 1
                      )
                    }
                  />
                  <TextInput
                    style={[styles.input, { width: 232, textAlign: "center" }]}
                    onChangeText={props.handleChange("remainingIntakes")}
                    onBlur={props.handleBlur("remainingIntakes")}
                    value={`${props.values.remainingIntakes}`}
                    placeholder={"np. 10"}
                    keyboardType={"numeric"}
                  />

                  <IconButton
                    iconName={"chevron-up"}
                    communityIcons={true}
                    style={styles.upButton}
                    onPress={() =>
                      props.setFieldValue(
                        "remainingIntakes",
                        (props.values.remainingIntakes
                          ? parseInt(props.values.remainingIntakes)
                          : 0) + 1
                      )
                    }
                  />
                  <IconButton
                    iconName={"chevron-double-up"}
                    communityIcons={true}
                    style={styles.upButton}
                    onPress={() =>
                      props.setFieldValue(
                        "remainingIntakes",
                        (props.values.remainingIntakes
                          ? parseInt(props.values.remainingIntakes)
                          : 0) + 5
                      )
                    }
                  />
                </View>
              </View>

              {/* At what hours? */}
              <View style={styles.inputContainer}>
                <InputText text={"O których godzinach?"} />
                <View>
                  {/* Add Hour Button */}
                  {times < 5 && (
                    <IconButton
                      style={[styles.hourButton, styles.addHourButton]}
                      title={"Dodaj Godzinę"}
                      iconName={"more-time"}
                      onPress={() => {
                        // Create new vars
                        const newIndex = parseInt(times);
                        const newTimes = {...props.values.times};

                        // Move values one place to the right
                        for (let i = 0; i < newIndex; i++) {
                          newTimes[`key-${i + 1}`] =
                            props.values.times[`key-${i}`];
                        }

                        // Add new value on top
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
                            const newValues = Object.values(
                              props.values.times
                            ).filter((num) => {
                              // Filter out the current index
                              if (num == props.values.times[`key-${index}`])
                                return false;
                              return true;
                            });

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
                              newValues[`key-${index}`] = handleDate(dateValue);
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
              <View>
                {/* <Text>{"Nazwa"}</Text>
                <TextInput
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                />
                <Text>{"Nazwa"}</Text>
                <TextInput
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                /> */}
              </View>

              {/* instructions */}
              <View>
                {/* <Text>{"Nazwa"}</Text>
                <TextInput
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                /> */}
              </View>
            </ScrollView>
          </View>

          {/* Buttons Cancel / Approve */}
          <View style={styles.buttons}>
            {/* Calncel Button */}
            <IconButton
              style={[
                styles.button,
                { backgroundColor: CustomColors.customNegation },
              ]}
              title={"Anuluj"}
              iconName={"close"}
            />

            {/* Approve Button */}
            <IconButton
              onPress={props.handleSubmit}
              style={[
                styles.button,
                { backgroundColor: CustomColors.customAffirmation },
              ]}
              title={"Potwierdź"}
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
  upButton: {
    margin: 0,
    marginLeft: 4,
    padding: 0,
    width: "9%",
    justifyContent: "center",
  },
  downButton: {
    margin: 0,
    marginRight: 4,
    padding: 0,
    width: "9%",
    justifyContent: "center",
  },
});

export default EntryEdit;
