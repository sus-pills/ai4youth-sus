import React, { useState } from "react";
import { View, Textt } from "react-native";
import IconButton from "../components/iconButton";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors, CustomSpacing } from "../global/globalStyles";

const Entries = () => {
  const [title, setTitle] = useState("Dodaj Wpis");

  return (
    <View style={styles.container}>
      <IconButton title={title} iconName="add" />
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

export default Entries;