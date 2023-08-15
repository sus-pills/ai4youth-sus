import React, { useEffect, useState } from "react";
import AppStack from "./routes/appStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAsyncStorage } from "./global/globalFunctions";
export default function App() {

  useEffect(() => {
    initializeAsyncStorage();
  }, []);


  return <AppStack />;
}
