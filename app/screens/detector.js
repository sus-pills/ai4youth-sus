import React, { useState } from "react";
import { View } from 'react-native'
import EntryButton from "../components/entryButton"

const Detector = () => {
  const [title, setTitle] = useState("Zrób zdjęcie");

  return (
    // Button
    <View className="bg-custom-background flex-1 p-5">
      <EntryButton title={ title } />
    </View>
  );
}

export default Detector;