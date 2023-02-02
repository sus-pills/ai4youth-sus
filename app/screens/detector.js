import React, { useState } from "react";
import { View } from "react-native";
import IconButton from "../components/iconButton";

// Styles Import
import { StyleSheet } from "react-native";
import { HexColors } from "../global/globalStyles";

const Detector = () => {
  const [title, setTitle] = useState("Zrób zdjęcie");

  return (
    // Button
    <View style={styles.container}>
      <IconButton title={title} iconName="photo-camera" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HexColors.customBackground,
    padding: 5,
  },
});

export default Detector;
