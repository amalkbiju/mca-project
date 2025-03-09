import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Navigator from "./src/navigators";
import * as Font from "expo-font";
import { CustomeFonts } from "./src/constants";
import { Provider } from "react-redux";
import Store from "./src/redux/Store";

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const appStart = async () => {
    await Font.loadAsync(CustomeFonts);
    setIsAppReady(true);
  };
  useEffect(() => {
    appStart();
  }, []);
  return isAppReady ? (
    <Provider store={Store}>
      <Navigator />
    </Provider>
  ) : null;
};

export default App;
