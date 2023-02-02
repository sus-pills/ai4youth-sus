import React, { useState } from "react";
import { View } from "react-native";
import IconButton from "../components/iconButton";

// Styles Import
import { StyleSheet } from "react-native";
import { CustomColors, CustomSpacing } from "../global/globalStyles";

const Detector = () => {
  const [title, setTitle] = useState("Zrób Zdjęcie");

  return (
    <View style={styles.container}>
      <IconButton title={title} iconName="photo-camera" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.customBackground,
    padding: CustomSpacing.customPadding,
  },
});

export default Detector;
