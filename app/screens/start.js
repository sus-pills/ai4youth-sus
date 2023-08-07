import React, {useState, useEffect} from "react";
import { View, Text, Switch, Image } from "react-native";
import { useIsFocused } from '@react-navigation/native';
// Styles Imports
import { StyleSheet } from "react-native";
import { CustomColors } from "../global/globalStyles";
import Settings from "./settings"; 
import Zdjecie from "../img/logo.png";
// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
var Start = () => {
  const isFocused = useIsFocused() // Sprawdzasz czy strona ma focusa
  const [fontSize, setFontSize] = useState(18);
  useEffect(() => {
    const loadFontSize = async () => {
      try {
        const storedFontSize = await AsyncStorage.getItem('@selected_value_key');
        //  Ladujesz item ze storage ^^^^^^^^^^^^^^^^^^^^
        if (storedFontSize) {
          console.log(typeof(JSON.parse(storedFontSize)), JSON.parse(storedFontSize))
          setFontSize(JSON.parse(storedFontSize));
          console.log(fontSize)
        }
      } catch (error) {
        console.log('Error loading font size:', error);
      }
    };


    if (isFocused){ // Refreshujesz gdy ma focusa
      loadFontSize();
    }
  }, [isFocused]);
  const isFocused2 = useIsFocused() // Sprawdzasz czy strona ma focusa
  const [darkTheme, setDarkTheme] = useState("0");
  useEffect(() => {
    const loadDarkTheme = async () => {
      try {
        const storedDarkTheme = await AsyncStorage.getItem('@dark_theme');
        //  Ladujesz item ze storage ^^^^^^^^^^^^^^^^^^^^
        if (storedDarkTheme) {
          console.log(typeof(JSON.parse(storedDarkTheme)), JSON.parse(storedDarkTheme))
          setDarkTheme(JSON.parse(storedDarkTheme));
          console.log(darkTheme)
        }
      } catch (error) {
        console.log('Error loading font size:', error);
      }
    };


    if (isFocused2){ // Refreshujesz gdy ma focusa
      loadDarkTheme();
    }
  }, [isFocused]);

  return (
    
  <View style={Styles.container}>
    <Text style={[Styles.heading, {fontSize: fontSize }]}>Witaj w aplikacji Kalendarz Tabletek!</Text>
    <Text style={[Styles.subheading, { fontSize: fontSize }]}>
       Skorzystaj z menu znajdującego się w dolnej części aplikacji.
    </Text>
    <Text>
      {'\n'}
    </Text>
  <Image
  source={Zdjecie}
  style={Styles.image}
  />
  </View>
  );
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
  nic: {
  },
  test:
  {
    opacity: 100,
  }
});

export default Start;


