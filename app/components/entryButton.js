import React, { useState } from "react";
import { View, TouchableOpacity, Text } from 'react-native';

const EntryButton = ({ title }) => {
  return (
    // Button
      <TouchableOpacity className="bg-custom-main rounded-md px-4 py-2 mx-10 ">
        <Text className="text-center text-white text-xl">{ title }</Text>
      </TouchableOpacity>
  );
}

export default EntryButton;