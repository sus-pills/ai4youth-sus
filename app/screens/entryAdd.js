import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import IconButton from "../components/iconButton";
import uuid from "react-native-uuid";
import { TextInput } from "react-native-gesture-handler";
import { HeaderBackButton } from "@react-navigation/elements";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import DayPicker from "../components/dayPicker";
import HourManager from "../components/hourManager";
import { createDateTimes } from "../global/globalFunctions";

// TODO: Look for other TODOs in this file!
// ! A lot of lines here share code with entryEdit.js

const EntryAdd = ({ route, navigation }) => {
  
  // Default entry data
  const entry = {
    id: uuid.v4(),
    name: null,
    remainingIntakes: null,
    startDate: new Date(),
    hours: [],
    dates: [],
    dosage: null,
    information: null,
    color: `#${Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, "0")}`,
    icon: "pill",
  }

  // Current Step
  const [currentStep, setCurrentStep] = useState(0);

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
        values.dates = createDateTimes(
          values.startDate,
          values.hours,
          values.remainingIntakes
        );
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
              <HourManager
                props={props}
                currentHours={entry.hours}
              />
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
