import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import SingleModalButton from "./singleModalButton";
import { GlobalStyles } from "../global/globalStyles";

const ColorPicker = ({ props, inColorBox, text }) => {
  // Change color
  const colorsPalette = [
    ["#FF9999", "#ff0000", "#800000", "#964B00"],
    ["#FFFF99", "#ffff00", "#808000", "#ffa500"],
    ["#99FF99", "#00ff00", "#008000", "#00ffff"],
    ["#9999FF", "#0000ff", "#000080", "#A020F0"],
    ["#ffffff", "#999999", "#000000", "#ff00ff"],
  ];

  // Select color
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <View style={styles.buttons}>
      {/* Color Box */}
      <View
        style={[
          styles.colorBox,
          { backgroundColor: props.values.color },
          GlobalStyles.customShadow,
        ]}
      >
        {inColorBox}
      </View>

      {/* Modal Button */}
      <SingleModalButton
        buttonStyle={styles.changeColor}
        iconName={"color-lens"}
        title={text}
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
            <View key={`${indexY}-0`} style={{ flexDirection: "row" }}>
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
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  changeColor: {
    height: 60,
    marginVertical: 18,
    marginHorizontal: 9,
  },
});

export default ColorPicker;
