import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import IconButton from "../components/iconButton";
import uuid from "react-native-uuid";
import { TextInput } from "react-native-gesture-handler";
import { HeaderBackButton } from "@react-navigation/elements";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { handleDate } from "../global/globalFunctions";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DayPicker from "../components/dayPicker";

// TODO: Look for other TODOs in this file!
// ! A lot of lines here share code with entryEdit.js

const EntryAdd = ({ route, navigation }) => {
  
  // Default entry data
  const entry = {
    id: uuid.v4(),
    name: null,
    remainingIntakes: null,
    startDate: new Date(),
    times: {},
    dosage: null,
    information: null,
    color: `#${Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, "0")}`,
    icon: "pill",
  }

  // Current Step
  const [currentStep, setCurrentStep] = useState(0);

  // TODO: Put this in a separate component
  // Count times
  const [times, setTimes] = useState(0);

  // TODO: Put this in a separate component
  // Create list of which hour pickers to show
  const [showTimePicker, setShowTimePicker] = useState(
    Array.from({ length: 5 }, () => false)
  );

  // Handle Previous / Continue
  const handleStepChange = (stepInterval) => {
    setCurrentStep(currentStep + stepInterval);
  };

  // Handle Submit
  const handleEntrySubmit = async (submittedEntry) => {
    try {
      // Fetch the data
      const fetchedData = await AsyncStorage.getItem("@entries");
      const data = fetchedData ? JSON.parse(fetchedData) : [];

      // Add to @entries
      data.unshift(submittedEntry)
      const processedData = JSON.stringify(data);

      console.log("Processed Data EntryAdd", processedData)
      await AsyncStorage.setItem("@entries", processedData);

      // Exit the screen
      navigation.popToTop();
    } catch (error) {
      console.error("Error submitting entry:", error);
    }
  };

  // Exit without saving
  const cancelExitAlert = () => {
    Alert.alert(
      "Cancel adding the entry?",
      "All unsaved data will be lost.",
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigation.popToTop(),
        },
      ],
      {
        cancelable: true,
      }
    );
    return true;
  };

  // TODO: Put this in a separate component
  // Remove first occurence from array
  const removeFirstOccurrence = (array, value) => {
    const index = array.indexOf(value);
    if (index === -1) {
      return array;
    }
    return array.slice(0, index).concat(array.slice(index + 1));
  };

  // Add cancel button
  navigation.setOptions({
    headerLeft: () => (
      <HeaderBackButton
        backImage={() => <MaterialIcons name="close" size={24} color="white" />}
        tintColor="white"
        onPress={() => cancelExitAlert()}
      />
    ),
  });

  return (
    <Formik
      initialValues={entry}
      onSubmit={(values) => {
        // Handle the entry submit and exit
        handleEntrySubmit(values);

        console.log("submit", values);
      }}
    >
      {(props) => (
        <ScrollView>
          {/* Name */}
          {currentStep === 0 && (
            <View>
              <Text>Medication name</Text>
              <TextInput
                value={props.values.name}
                onChangeText={(text) => (props.values.name = text)}
              />
            </View>
          )}

          {/* Remaining Intakes */}
          {currentStep === 1 && (
            <View>
              <Text>Number of intakes</Text>
              <TextInput
                value={props.values.remainingIntakes}
                onChangeText={(text) =>
                  (props.values.remainingIntakes = parseInt(text))
                }
                keyboardType="numeric"
              />
            </View>
          )}

          {/* Time */}
          {currentStep === 2 && (
            <View>
              {/* Start Date */}
              <Text>
                Start date
              </Text>
              <DayPicker
                props={props}
                currentDate={entry.startDate}
              />
              
              {/* Times */}
              <Text>At what hours?</Text>
              <View>
                {/* // TODO: Put this in a separate component */}
                {/* Add Hour Button */}
                {times < 5 && (
                  <IconButton
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
                {/* // TODO: Put this in a separate component */}
                {/* Show the list of time pickers */}
                {Array.from({ length: parseInt(times) }, (_, index) => (
                  // Create the view with times
                  <View key={`key-${index}-time`}>
                    {/* Hour Picker */}
                    <View>
                      <IconButton
                        textColor={"black"}
                        title={props.values.times[`key-${index}`]}
                        iconName={"access-time"}
                        onPress={() => {
                          const newShow = [...showTimePicker];
                          newShow[index] = true;
                          setShowTimePicker(newShow);
                        }}
                      />
                      {/* // TODO: Put this in a separate component */}
                      {/* Delete Hour Picker */}
                      <IconButton
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
                    {/* // TODO: Put this in a separate component */}
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
          )}

          {/* Miscellaneous */}
          {currentStep === 3 && (
            <View>
              {/* Dosage */}
              <Text>Intake dosage</Text>
              <TextInput
                value={props.values.dosage}
                onChangeText={(text) => (props.values.dosage = text)}
              />

              {/* Additional Information */}
              <Text>Additional Informaion</Text>
              <TextInput
                value={props.values.information}
                onChangeText={(text) => (props.values.information = text)}
              />
            </View>
          )}

          {/* Icons */}
          {currentStep === 4 && (
            <View>
              <Text>Pick the icon for your medication</Text>
              {/* COMPLETE IT LATER */}
            </View>
          )}

          {/* Back */}
          {currentStep > 0 && (
            <IconButton
              title=""
              iconName="chevron-left"
              textColor="white"
              communityIcons={false}
              onPress={() => handleStepChange(-1)}
            />
          )}

          {/* Continue */}
          {currentStep < 4 && (
            <IconButton
              title=""
              iconName="chevron-right"
              textColor="white"
              communityIcons={false}
              onPress={() => handleStepChange(1)}
            />
          )}

          {/* Submit */}
          {currentStep === 4 && (
            <IconButton
              title="Submit"
              iconName="save-alt"
              textColor="white"
              communityIcons={false}
              onPress={props.handleSubmit}
            />
          )}
        </ScrollView>
      )}
    </Formik>
  );
};

export default EntryAdd;
