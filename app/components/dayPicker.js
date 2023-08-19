import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import InputTitle from "./inputTitle";
import IconButton from "./iconButton";

const DayPicker = ({ props, currentDate, text }) => {
  const handleDate = (date, mode) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    const monthFullNames = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    switch (mode) {
      case "us":
        return `${monthFullNames[month]} ${day}, ${year}`;
      case "eu":
        return `${day} ${monthFullNames[month]} ${year}`;
      default:
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  };

  // Day picker toggle on/off
  const [showDayPicker, setShowDayPicker] = useState(false);

  // Readable date in format of "num STRING num"
  const [readableDate, setReadableDate] = useState(
    handleDate(new Date(currentDate), "us")
  );

  return (
    <View style={styles.inputContainer}>
      {/* Title of the button */}
      {text && <InputTitle text={text} />}

      {/* Button */}
      <IconButton
        style={styles.dateButton}
        title={readableDate}
        textColor={"black"}
        communityIcons={true}
        iconName={"calendar-start"}
        onPress={() => {
          setShowDayPicker(true);
        }}
      />

      {/* Built-in modal */}
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
              const newDate = new Date(value.nativeEvent.timestamp);

              const newReadableDate = handleDate(newDate, "us");

              props.setFieldValue("startDate", `${newDate}`);
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

export default DayPicker;
