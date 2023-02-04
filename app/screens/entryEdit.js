import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../components/iconButton";
import { CustomColors } from "../global/globalStyles";

const EntryInfo = ({route}) => {

  const entry = route.params.entry;

  const times = Object.values(entry.times);

  return (
    <View>
      <View>
        <Text>{`key: ${entry.key}`}</Text>
        <Text>{`name: ${entry.name}`}</Text>
        <Text>{`times: ${entry.times}`}</Text>
        {times.map((time, index) => (
          <Text key={Math.random()}>{`time #${index}: ${time}`}</Text>
        ))}
        <Text>{`nextIntake: ${entry.nextIntake}`}</Text>
        <Text>{`everyXthDay: ${entry.everyXthDay}`}</Text>
        <Text>{`color: ${entry.color}`}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <IconButton 
          style={[styles.button, {backgroundColor: CustomColors.customNegation}]}
          title={"Anuluj"}
          iconName={"close"}/>
        <IconButton 
          style={[styles.button, {backgroundColor: CustomColors.customAffirmation}]}
          title={"Potwierdź"}
          iconName={"check"}/>
      </View>
    </View>
  ); 
}

const styles = StyleSheet.create({
  button: {
    width: '40%',
  }
})

export default EntryInfo;