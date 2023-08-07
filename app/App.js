// Imports
import React, { useEffect } from "react";
import AppStack from "./routes/appStack";
import { initializeAsyncStorage } from "./global/globalFunctions";

export default function App() {
  useEffect(() => {
    initializeAsyncStorage();
  }, []);

  return <AppStack />;
}
