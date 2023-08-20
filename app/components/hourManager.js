import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "./iconButton";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { CustomColors } from "../global/globalStyles";
import InputTitle from "./inputTitle";

const HourManager = ({ props, currentHours, text }) => {
  // Count hours
  const [hours, setHours] = useState(`${Object.keys(currentHours).length}`);

  // Create list of which hour pickers to show
  const [showTimePicker, setShowTimePicker] = useState(
    Array.from({ length: 5 }, () => false)
  );

  // Handle date
  const handleHour = (hour) => {
    // toLocaleTimeString does not work!
    const hours = hour.getHours().toString().padStart(2, "0");
    const minutes = hour.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Remove first occurence from array
  const removeFirstOccurrence = (array, value) => {
    const index = array.indexOf(value);
    if (index === -1) {
      return array;
    }
    array.splice(index, 1);
    return array;
  };

  return (
    <View style={styles.inputContainer}>
      {/* Button title */}
      {text && <InputTitle text={text} />}

      <View>
        {/* Add Hour Button */}
        {hours < 5 && (
          <IconButton
            style={[styles.hourButton, styles.addHourButton]}
            title={"Add hour"}
            iconName={"more-time"}
            onPress={() => {
              // Create new vars
              const newIndex = parseInt(hours);
              const newHours = { ...props.values.hours };

              // Move values one place to the right
              for (let i = 0; i < newIndex; i++) {
                newHours[`hour-${i + 1}`] = props.values.hours[`hour-${i}`];
              }

              // Add new value on the left
              newHours["hour-0"] = "08:00";
              setHours(newIndex + 1);
              props.setFieldValue("hours", newHours);
            }}
          />
        )}

        {/* Show the list of hour pickers */}
        {Array.from({ length: parseInt(hours) }, (_, index) => (
          
          // Create a view with hours
          <View key={`hour-${index}-time`}>
            {/* Hour Picker */}
            <View style={styles.hourButtons}>
              <IconButton
                textColor={"black"}
                style={[styles.hourButton, { backgroundColor: "#f6f6f6" }]}
                title={props.values.hours[`hour-${index}`]}
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
                  const inherentValues = [...Object.values(props.values.hours)];

                  // Remove the first occurrence
                  // In case there are multiple exact hours
                  const newValues = removeFirstOccurrence(
                    inherentValues,
                    inherentValues[index]
                  );

                  // Assign values to keys
                  const newHours = {};
                  for (let i = 0; i < newValues.length; i++) {
                    newHours[`hour-${i}`] = newValues[i];
                  }

                  // Update variables
                  setHours(newValues.length);
                  props.setFieldValue("hours", newHours);
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
                    const dateValue = new Date(value.nativeEvent.timestamp);

                    // Change the value
                    const newValues = { ...props.values.hours };
                    newValues[`hour-${index}`] = handleHour(dateValue);
                    props.setFieldValue("hours", newValues);
                  }
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 12,
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
});

export default HourManager;
