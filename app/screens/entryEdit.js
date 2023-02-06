import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import IconButton from "../components/iconButton";
import { CustomColors, GlobalStyles } from "../global/globalStyles";
import SingleModalButton from "../components/singleModalButton";

const EntryEdit = ({ route }) => {
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
  const [newColor, setNewColor] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{entry.name}</Text>

        <ScrollView>
          {/* Color Box & Modal Button */}
          <View style={styles.buttons}>
            {/* Color Box */}
            <View
              style={[
                styles.colorBox,
                { backgroundColor: newColor ? newColor : entry.color },
                GlobalStyles.customShadow,
              ]}
            ></View>

            {/* Modal Button */}
            <SingleModalButton
              buttonStyle={styles.changeColor}
              iconName={"color-lens"}
              title={"Zmień Kolor"}
              onLeave={() => setSelectedColor(null)}
              onAccept={() => setNewColor(selectedColor)}
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
                        onPress={() => setSelectedColor(color)}
                        style={[
                          styles.colorSwitch,
                          { backgroundColor: color },
                          selectedColor === color && styles.selected,
                        ]}
                      ></TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </SingleModalButton>
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
          style={[
            styles.button,
            { backgroundColor: CustomColors.customAffirmation },
          ]}
          title={"Potwierdź"}
          iconName={"check"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: CustomColors.customBackground,
  },
  colorsBoxes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  header: {
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
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
  },
  title: {
    marginTop: 8,
    padding: 8,
    fontSize: 24,
    textAlign: "center",
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
    margin: 7,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  selected: {
    width: 64,
    height: 64,
    borderRadius: 32,
    margin: 0,
    borderColor: CustomColors.customDarkGray,
    borderWidth: 7,
  },
});

export default EntryEdit;
