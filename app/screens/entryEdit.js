import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import IconButton from "../components/iconButton";
import {
  CustomBorder,
  CustomColors,
  CustomSpacing,
  GlobalStyles,
} from "../global/globalStyles";
import SingleModalButton from "../components/singleModalButton";
import { Formik } from "formik";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { isLightColor } from "../global/globalFunctions";
import InputText from "../components/inputTitle";

const EntryEdit = ({ route, navigation }) => {
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

  // Choose icons
  const icons = ["pill", "needle", "bottle-tonic-plus", "medical-bag"];

  // Count times
  const [times, setTimes] = useState(`${Object.keys(entry.times).length}`);

  // Create a new object that will be filled with hours.
  const [newObject, setNewObject] = useState({});

  return (
    <Formik
      style={styles.container}
      initialValues={entry}
      onSubmit={(values) => {
        console.log(values);
        navigation.goBack();
      }}
    >
      {(props) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <ScrollView>
              {/* Color Box & Modal Button */}
              <View style={styles.buttons}>
                {/* Color Box */}
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: props.values.color },
                    GlobalStyles.customShadow,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={props.values.icon}
                    size={40}
                    color={isLightColor(props.values.color) ? "black" : "white"}
                  />
                </View>

                {/* Modal Button */}
                <SingleModalButton
                  buttonStyle={styles.changeColor}
                  iconName={"color-lens"}
                  title={"Zmień Kolor"}
                  // Clear the color picker upon leaving
                  onLeave={() => setSelectedColor(null)}
                  // Change Color on Accept
                  onAccept={() =>
                    props.setFieldValue(
                      "color",
                      // Don't change if null
                      selectedColor ? selectedColor : props.values.color
                    )
                  }
                >
                  {/* Color Palette */}
                  <View style={styles.colorPickerContaier}>
                    {colorsPalette.map((row, indexY) => (
                      // Create rows
                      <View
                        key={`${indexY}-0`}
                        style={{ flexDirection: "row" }}
                      >
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

              {/* Icons */}
              <View style={styles.icons}>
                {icons.map((icon) => (
                  <TouchableOpacity
                    style={[
                      styles.iconSwitch,
                      props.values.icon === icon && styles.selectedIcon,
                    ]}
                    activeOpacity={0.6}
                    key={icon}
                    onPress={() => props.setFieldValue("icon", icon)}
                  >
                    <MaterialCommunityIcons
                      name={icon}
                      size={30}
                      color={"black"}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* name */}
              <View style={styles.inputContainer}>
                <InputText text={"Nazwa"} />
                <TextInput
                  style={styles.input}
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                  placeholder={"np. Insulina"}
                />
              </View>

              {/* remainingIntakes */}
              <View style={styles.inputContainer}>
                <InputText text={"Pozostała ilość zażyć"} />
                <TextInput
                  style={styles.input}
                  onChangeText={props.handleChange("remainingIntakes")}
                  onBlur={props.handleBlur("remainingIntakes")}
                  value={props.values.remainingIntakes}
                  placeholder={"np. 10"}
                  keyboardType={"numeric"}
                />
              </View>

              {/* times */}
              <View style={styles.inputContainer}>
                <InputText text={"Ile razy dziennie?"} />
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => {
                    // Handle the number of times the person takes their pills in one day
                    setTimes(value <= 10 && value >= 1 ? value : 0);
                    const newTimes = {};
                    const values = Object.values(props.values.times);
                    for (let i = 0; i < value; i++) {
                      newTimes[`key-${i}`] = values[i] ? values[i] : "00:00";
                    }
                    console.log(props.values.times, newTimes);
                    props.setFieldValue("times", newTimes);
                    // props.handleChange("times")(newTimes);
                  }}
                  // onBlur={() => console.log(times)}
                  value={times}
                  placeholder={"np. 2"}
                  keyboardType={"numeric"}
                />
              </View>

              {/* At what hour(s)? */}
              {times > 0 ? (
                <View style={styles.inputContainer}>
                  <InputText
                    text={
                      times == 1 ? "O której godzinie?" : "O których godzinach?"
                    }
                  />
                  <View>
                    {Array.from({ length: parseInt(times) }, (_, index) => (
                      <TextInput
                        key={`key-${index}-1`}
                        value={props.values.times[`key-${index}`]}
                        placeholder={
                          times == 1 ? "np. 12:00" : `np. 1${index}:00`
                        }
                        style={[styles.input, { marginBottom: 8 }]}
                        onChangeText={(value) => {
                          const newValues = { ...props.values.times };
                          newValues[`key-${index}`] = value;
                          props.setFieldValue("times", newValues);
                        }}
                      />
                    ))}
                  </View>
                </View>
              ) : null}

              {/* dosage */}
              <View>
                {/* <Text>{"Nazwa"}</Text>
                <TextInput
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                /> */}
              </View>

              {/* dosageUnit */}
              <View>
                {/* <Text>{"Nazwa"}</Text>
                <TextInput
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                /> */}
              </View>

              {/* instructions */}
              <View>
                {/* <Text>{"Nazwa"}</Text>
                <TextInput
                  onChangeText={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                  value={props.values.name}
                /> */}
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
              onPress={props.handleSubmit}
              style={[
                styles.button,
                { backgroundColor: CustomColors.customAffirmation },
              ]}
              title={"Potwierdź"}
              iconName={"check"}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: CustomColors.customBackground,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 8,
  },
  header: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
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
  iconSwitch: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#aaa",
    margin: 5,
  },
  selectedIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: CustomColors.customDarkGray,
    margin: 0,
  },
  inputContainer: {
    margin: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: CustomColors.customDarkGray,
    borderRadius: CustomBorder.customRadius,
    padding: 8,
    fontSize: 20,
    width: "100%",
  },
});

export default EntryEdit;
