import React from "react";
import { View, Text } from "react-native";

const EntryInfo = ({route}) => {

  const entry = route.params.entry;

  const times = Object.values(entry.times);

  return (
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
  ) ; 
}

export default EntryInfo;