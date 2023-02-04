import React from "react";
import { View, Text } from "react-native";
import IconButtonCommunity from "../components/iconButtonCommunity";

const EntryInfo = ({route, navigation: { navigate }}) => {

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
      <IconButtonCommunity onPress={() => {
        navigate("EntryEdit", {entry})
      }}
      iconName={'square-edit-outline'}
      title={'Edytuj'} />
    </View>
  ) ; 
}

export default EntryInfo;