import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React from "react";
import { LinearGradient } from "react-native-linear-gradient";
import {
  Container,
  Separator,
  Typography,
} from "react-native-tillring-components";
import { Colors, Fonts } from "../constants";
import Display from "../utils/Display";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const nav = useNavigation();
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

        <Container flex1 aCenter jCenter>
          <Image
            source={require("../assets/images/Icon.png")}
            style={styles.ImageIcon}
            tintColor={Colors.DEFAULT_WHITE}
          />
          <Separator height={Display.setHeight(3)} />
          <Typography
            size={40}
            fFamily={Fonts.BOLD}
            color={Colors.DEFAULT_WHITE}
          >
            Welcome!
          </Typography>
          <Separator height={5} />
          <Typography
            size={40}
            fFamily={Fonts.BOLD}
            color={Colors.DEFAULT_WHITE}
          >
            Our Online Platform
          </Typography>
        </Container>
        <Container
          w={Display.setWidth(90)}
          h={Display.setHeight(6)}
          bgColor={Colors.DEFAULT_COLOR}
          bRadius={10}
          absolute
          style={{ bottom: Display.setHeight(15) }}
          aSelfCenter
          aCenter
          jCenter
          pressable
          onPress={() => nav.navigate("WelcomeScreenCards")}
        >
          <Typography h1 color={Colors.DEFAULT_WHITE} fFamily={Fonts.BOLD}>
            Get Started
          </Typography>
        </Container>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    color: "white",
    fontSize: 24,
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
