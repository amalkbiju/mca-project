import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ImageBackground,
} from "react-native";
import React, { useState, useRef } from "react";
import { Colors, Size, General } from "../constants";
import Display from "../utils/Display";

import {
  Container,
  Typography,
  Separator,
} from "react-native-tillring-components";
import { WelcomeCards } from "../compontents";
import LinearGradient from "react-native-linear-gradient";

const pageStyle = (isActive) =>
  isActive
    ? styles.page
    : { ...styles.page, backgroundColor: Colors.LIGHT_GREY4 };
const Pagination = ({ index }) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        )
      )}
    </View>
  );
};

const WelcomeScreenCards = ({ navigation }) => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();

  const onViewRef = useRef(({ changed }) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // const pageScroll = () => {
  //   welcomeList.current.scrollToIndex({
  //     index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
  //   });
  // };
  const pageScroll = () => {
    const nextIndex =
      welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex;

    if (Platform.OS === "android") {
      welcomeList.current.scrollToIndex({ index: nextIndex });
    } else {
      const itemWidth = Display.setWidth(100); // Adjust this value based on your item width
      const offset = nextIndex * itemWidth;
      welcomeList.current.scrollToOffset({ offset, animated: true });
    }
  };
  const navigate = () => {
    navigation.navigate("LoginOrRegisterUsingNumberScreen");
    //   StorageServices.setFirstTimeUse().then(() => {
    //     dispatch(GeneralAction.setFirstTimeUse());
    //   });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/cowImage.jpg")} // Make sure to add your image in assets folder
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.7)"]}
          locations={[0, 0.5, 1]}
          style={styles.imageOverlay}
        />

        <Separator height={StatusBar.currentHeight} />
        <Separator height={Display.setHeight(8)} />
        <View style={styles.welcomeListContainer}>
          <FlatList
            ref={welcomeList}
            data={General.WELCOME_CONTENTS}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            overScrollMode="never"
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
            renderItem={({ item }) => <WelcomeCards {...item} />}
          />
        </View>
        <Separator height={Display.setHeight(8)} />
        <Pagination index={welcomeListIndex} />
        <Separator height={Display.setHeight(8)} />
        {welcomeListIndex === 2 ? (
          <Container>
            <TouchableOpacity
              style={styles.gettingStartedButton}
              activeOpacity={0.8}
              onPress={
                () => navigation.navigate("LandingScreen")
                // navigate()
              }
            >
              <Text style={styles.gettingStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
            <Separator height={5} />
          </Container>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.skipBtn}
              activeOpacity={0.8}
              onPress={() => welcomeList.current.scrollToEnd()}
            >
              <Text style={styles.skipButtonText}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => pageScroll()}
            >
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreenCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  welcomeListContainer: {
    height: Display.setHeight(60),
  },
  pageContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 32,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Display.setWidth(90),
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,

    color: Colors.DEFAULT_WHITE,
  },
  skipBtn: {
    backgroundColor: Colors.DEFAULT_WHITE,
    width: Display.setWidth(16),
    height: Display.setWidth(16),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  skipButtonText: {
    fontSize: 16,

    color: Colors.DEFAULT_BLUE,
  },
  button: {
    backgroundColor: Colors.DEFAULT_COLOR,
    width: Display.setWidth(16),
    height: Display.setWidth(16),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  gettingStartedButton: {
    backgroundColor: Colors.DEFAULT_COLOR,
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    width: Display.setWidth(55),
    alignSelf: "center",
  },
  gettingStartedButtonText: {
    fontSize: Size.Font.H4,
    color: Colors.DEFAULT_WHITE,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 16,
  },
  ImageIcon: {
    width: Display.setWidth(40),
    height: Display.setWidth(40),
  },
});
