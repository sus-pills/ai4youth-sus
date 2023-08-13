import React from "react";
import { View, StyleSheet } from "react-native";
import InputTitle from "./inputTitle";
import IconButton from "./iconButton";
import { TextInput } from "react-native-gesture-handler";

const NumberInput = ({ props, text }) => {
  // // Handle remaining intakes
  // const handleRemainingIntakes = (value, num) => {
  //   const newValue = value + num;

  //   // Return a new value
  //   if (newValue >= 0 && !isNaN(newValue)) return parseInt(newValue);

  //   // handle new bad values
  //   return 0;
  // };

  return (
    <View style={styles.inputContainer}>
      {/* Title of number input */}
      {text && <InputTitle text={text} />}

      <View style={styles.upDownInputButtons}>
        {/* Decrease by 5 */}
        <IconButton
          iconName={"chevron-double-down"}
          communityIcons={true}
          style={[styles.upDownButton, styles.upDownButtonLeft]}
          onPress={() =>
            props.setFieldValue(
              "remainingIntakes",
              // handleRemainingIntakes(props.values.remainingIntakes, -5)
              props.values.remainingIntakes - 5 || 0
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
              // handleRemainingIntakes(props.values.remainingIntakes, -1)
              props.values.remainingIntakes - 1 || 0
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
              // handleRemainingIntakes(props.values.remainingIntakes, 1)
              props.values.remainingIntakes + 1 || 0
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
              // handleRemainingIntakes(props.values.remainingIntakes, 5)
              props.values.remainingIntakes + 5 || 0
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 12,
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

export default NumberInput;
