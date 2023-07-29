import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const SettingsScreen = () => {

  return (
    <View>
      <Button title="Save" onPress={() => handleFontSizeChange(inputFontSize)} />
    </View>
  );
};

export default SettingsScreen;
