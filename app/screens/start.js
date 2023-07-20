import React from "react";
import { View, Text, Switch, Image } from "react-native";

// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors } from "../global/globalStyles";
import Zdjecie from "../img/logo.png";
const Start = () => {
  return <View style={Styles.container}>
    <Text style={Styles.heading}>Witaj w aplikacji Kalendarz Tabletek!</Text>
    <Text style={Styles.subheading}>
       Skorzystaj z menu znajdującego się w dolnej części aplikacji.
    </Text>
    <Text>
      {'\n'}
    </Text>
  <Image
  source={Zdjecie}
  style={Styles.image}
  />
  </View>;
};
/* W switchu jeśli tryb dla daltonistów pokażą się typy. Trinatopia i tym podobne*/

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: "32px",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  subheading: {
    fontSize: 18,
    color: '#666666',
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
});

export default Start;


