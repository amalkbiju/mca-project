import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Container,
  Typography,
  Separator,
} from "react-native-tillring-components";
import Display from "../utils/Display";
import { Size, Colors, Fonts } from "../constants";
import LinearGradient from "react-native-linear-gradient";

const WelcomeCards = ({ title, content, image }) => {
  return (
    <Container
      flex1
      w={Display.setWidth(100)}
      aCenter
      jCenter
      pHorizontal={Size.Padding.XLARGE}
      pVertical={Size.Padding.LARGE}
    >
      <Container w={"100%"} h={"100%"} bRadius={20}>
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.7)"]}
          locations={[0, 0.5, 1]}
          style={styles.imageOverlay}
        />
        <Separator height={Display.setHeight(3)} />
        <Typography
          size={30}
          color={Colors.DEFAULT_WHITE}
          fFamily={Fonts.BOLD}
          aSelfCenter
        >
          Hello!
        </Typography>
        <Separator height={Display.setHeight(1)} />
        <Image source={image} style={styles.image} />
        <Separator height={Display.setHeight(2)} />

        <Typography
          color={Colors.DEFAULT_COLOR}
          size={Size.Font.H2}
          w={Display.setWidth(80)}
          style={styles.contentText}
          fFamily={Fonts.BOLD}
        >
          {content}
        </Typography>
      </Container>
    </Container>
  );
};

export default WelcomeCards;

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: Display.setHeight(28),
    borderRadius: 8,
    alignSelf: "center",
  },
  contentText: {
    textAlign: "center",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 10,
  },
});
