import React from "react";
import { View, StyleSheet } from "react-native";
import InputTitle from "./inputTitle";
import IconButton from "./iconButton";
import { TextInput } from "react-native-gesture-handler";
import { CustomColors, CustomBorder } from "../global/globalStyles";

const NumberInput = ({ props, text, propsValue }) => {
  // Direct integer value from the props object
  const directValue = parseInt(props.values[propsValue]);

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
              propsValue,
              directValue > 0 ? directValue - 5 : 0
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
              propsValue,
              directValue > 0 ? directValue - 1 : 0
            )
          }
        />

        {/* Show Remaining intakes */}
        <TextInput
          style={[styles.input, { width: 184, textAlign: "center" }]}
          onChangeText={props.handleChange(propsValue)}
          onBlur={props.handleBlur(propsValue)}
          value={`${props.values[propsValue]}`}
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
              propsValue,
              directValue + 1 || 0
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
              propsValue,
              directValue + 5 || 0
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
  input: {
    borderWidth: 1,
    borderColor: CustomColors.customDarkGray,
    borderRadius: CustomBorder.customRadius,
    padding: 8,
    marginTop: 4,
    fontSize: 20,
    width: "100%",
  },
});

export default NumberInput;
