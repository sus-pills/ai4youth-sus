import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "./iconButton";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { CustomColors } from "../global/globalStyles";
import InputTitle from "./inputTitle";

const HourManager = ({ props, currentHours, text }) => {
  // Count hours
  const [numHours, setNumHours] = useState(currentHours.length);

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

  // Remove first occurrence from array
  const removeFirstOccurrence = (array, value) => {
    const index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
    }
  };

  return (
    <View style={styles.inputContainer}>
      {/* Button title */}
      {text && <InputTitle text={text} />}

      <View>
        {/* Hour Add Button */}
        {numHours < 5 && (
          <IconButton
            style={[styles.hourButton, styles.hourAddButton]}
            title={"Add hour"}
            iconName={"more-time"}
            onPress={() => {
              const newHours = props.values.hours;
              newHours.unshift("08:00");

              setNumHours(numHours + 1);
              props.setFieldValue("hours", newHours);
            }}
          />
        )}

        {/* Show the list of hour pickers */}
        {Array.from({ length: numHours }, (_, index) => (
          // Create a view with hours
          <View key={`hour-${index}-time`}>
            {/* Hour Picker */}
            <View style={styles.hourButtons}>
              <IconButton
                textColor={"black"}
                style={[styles.hourButton, { backgroundColor: "#f6f6f6" }]}
                title={props.values.hours[index]}
                iconName={"access-time"}
                onPress={() => {
                  const newShow = [...showTimePicker];
                  newShow[index] = true;
                  setShowTimePicker(newShow);
                }}
              />

              {/* Hour Delete Button */}
              <IconButton
                style={styles.hourDeleteButton}
                iconName={"delete-forever"}
                onPress={() => {
                  const newHours = props.values.hours;

                  removeFirstOccurrence(newHours, newHours[index]);

                  // Update variables
                  setNumHours(newHours.length);
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
                    const newDate = new Date(value.nativeEvent.timestamp);

                    const newHours = props.values.hours;
                    newHours[index] = handleHour(newDate);

                    props.setFieldValue("hours", newHours);
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
  hourDeleteButton: {
    marginVertical: 4,
    marginHorizontal: 0,
    width: 58,
    alignSelf: "center",
    backgroundColor: CustomColors.customNegation,
  },
  hourAddButton: {
    width: 270 + 58 + 5,
    alignSelf: "center",
  },
});

export default HourManager;
