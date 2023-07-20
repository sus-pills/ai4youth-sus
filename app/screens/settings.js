import React, {useState} from "react";
import { View, Text, Switch, TouchableOpacity} from "react-native";
import { Picker } from "@react-native-picker/picker"


// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors } from "../global/globalStyles";



const Settings = () => {
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
  const [highContrastEnabled, setHighContrastEnabled] = useState(false);

  const toggleDarkTheme = () => {
    setDarkThemeEnabled((prev) => !prev);
  };

  const toggleHighContrast = () => {
    setHighContrastEnabled((prev) => !prev);
  };

  const handleRestoreFactorySettings = () => {
    // Implement logic to restore app to factory settings
    // This could include resetting all settings to default values
  };
  const [selectedFontSize, setSelectedFontSize] = useState('medium'); 
  return (
    <View style={styles.container}>
    <View style={styles.settingItem}>
      <Text style={styles.settingText}>Wielkość czcionki</Text>
      <Picker
          selectedValue={selectedFontSize}
          onValueChange={(itemValue) => setSelectedFontSize(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Mała" value="small" />
          <Picker.Item label="Średnia" value="medium" />
          <Picker.Item label="Duża" value="large" />
        </Picker>
    </View>

    <View style={styles.settingItem}>
      <Text style={styles.settingText}>Ciemny motyw</Text>
      <Switch
        value={darkThemeEnabled}
        onValueChange={toggleDarkTheme}
        trackColor={{ true: CustomColors.customMain, false: 'grey' }}
        thumbColor={darkThemeEnabled ? '#f4f3f4' : '#f4f3f4'}
      />
    </View>

    <View style={styles.settingItem}>
      <Text style={styles.settingText}>Wysoki kontrast</Text>
      <Switch
        value={highContrastEnabled}
        onValueChange={toggleHighContrast}
        trackColor={{ true: CustomColors.customMain, false: 'grey' }}
        thumbColor={highContrastEnabled ? '#f4f3f4' : '#f4f3f4'}
      />
    </View>

    <TouchableOpacity onPress={handleRestoreFactorySettings} style={styles.restoreButton}>
      <Text style={styles.restoreButtonText}>Przywróć aplikację do ustawień fabrycznych</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#f4f3f4',
},
settingItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},
settingText: {
  fontSize: 16,
},
restoreButton: {
  backgroundColor: CustomColors.customMain,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  alignSelf: 'center',
  marginTop: 20,
},
restoreButtonText: {
  color: '#f4f3f4',
  fontSize: 16,
  textAlign: 'center',
},
picker: {
  width: 150,
},
});

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 200,
  },
});
/* W switchu jeśli tryb dla daltonistów pokażą się typy. Trinatopia i tym podobne*/

export default Settings;
