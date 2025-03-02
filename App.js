import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Navigator from "./src/navigators";
import * as Font from "expo-font";
import { CustomeFonts } from "./src/constants";

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const appStart = async () => {
    await Font.loadAsync(CustomeFonts);
    setIsAppReady(true);
  };
  useEffect(() => {
    appStart();
  }, []);
  return isAppReady ? <Navigator /> : null;
};

export default App;
