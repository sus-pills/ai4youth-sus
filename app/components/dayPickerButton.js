import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { handleDate } from "../global/globalFunctions";
import InputTitle from "./inputTitle";
import IconButton from "./iconButton";

const DayPickerButton = ({props, currentDate}) => {
  // Day picker toggle on/off
  const [showDayPicker, setShowDayPicker] = useState(false);

  // Readable date in format of "num STRING num"
  const [readableDate, setReadableDate] = useState(
    handleDate(new Date(currentDate), "us")
  );

  return (
    <View style={styles.inputContainer}>
      <InputTitle text={"From what day?"} />
      <IconButton
        style={styles.dateButton}
        title={readableDate}
        textColor={"black"}
        communityIcons={true}
        iconName={"calendar-start"}
        onPress={() => {
          setShowDayPicker(true)}}
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
              const newDate = handleDate(new Date(value.nativeEvent.timestamp));

              const newReadableDate = handleDate(
                new Date(value.nativeEvent.timestamp),
                "us"
              );

              props.setFieldValue("startDate", newDate);
              setReadableDate(newReadableDate);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 12,
  },
  dateButton: {
    margin: 4,
    backgroundColor: "#f6f6f6",
    width: 270 + 58 + 5,
    alignSelf: "center",
  },
});

export default DayPickerButton;
