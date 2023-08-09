import React, { useEffect, useState } from "react";
import AppStack from "./routes/appStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchDarkModeSetting = async () => {
    try {
      const darkModeSetting = await AsyncStorage.getItem("@darkModeEnabled");
      setIsDarkMode(JSON.parse(darkModeSetting));
    } catch (error) {
      console.log("Error fetching dark mode setting:", error);
    }
  };

  useEffect(() => {
    fetchDarkModeSetting();
  }, []);

  return <AppStack isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
}
