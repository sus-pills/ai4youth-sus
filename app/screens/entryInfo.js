import React from "react";
import { View, Text } from "react-native";
import IconButton from "../components/iconButton";

const EntryInfo = ({ route, navigation }) => {
  const entry = route.params.entry;

  const times = Object.values(entry.times);

  return (
    <View>
      <Text>{`key: ${entry.id}`}</Text>
      <Text>{`name: ${entry.name}`}</Text>
      <Text>{`times: ${entry.times}`}</Text>
      {times.map((time, index) => (
        <Text key={Math.random()}>{`time #${index}: ${time}`}</Text>
      ))}
      <Text>{`nextIntake: ${entry.nextIntake}`}</Text>
      <Text>{`everyXthDay: ${entry.everyXthDay}`}</Text>
      <Text>{`color: ${entry.color}`}</Text>
      <IconButton
        onPress={() => {
          navigation.navigate("EntryEdit", { entry });
        }}
        iconName={"square-edit-outline"}
        communityIcons={true}
        title={"Edit"}
      />
    </View>
  );
};

export default EntryInfo;
