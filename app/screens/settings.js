import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [inputFontSize, setInputFontSize] = useState('16'); // Default font size

  const handleFontSizeChange = async (newFontSize) => {
    // Save the new font size to AsyncStorage
    try {
      await AsyncStorage.setItem('@font_size', JSON.stringify(parseInt(newFontSize)));
    } catch (error) {
      console.log('Error saving:', error);
    }
  };

  return (
    <View>
      <TextInput
        value={inputFontSize}
        onChangeText={setInputFontSize}
      />
      <Button title="Save" onPress={() => handleFontSizeChange(inputFontSize)} />
    </View>
  );
};

export default SettingsScreen;
