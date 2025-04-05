import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Animated, {
  Layout,
  SlideInRight,
  SlideOutLeft,
  FadeIn,
  FadeOut,
  withTiming,
} from "react-native-reanimated";
import { GeneralAction } from "../redux/GeneralAction";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, General } from "../constants";
import {
  Container,
  Separator,
  Typography,
} from "react-native-tillring-components";

const MessageBox = ({
  id,
  message,
  type = General.ALERT_MESSAGE_TYPE.AUTO_CLOSER,
  duration = 3000,
  level = General.ALERT_MESSAGE_LEVEL.SUCCESS,
  action = () => {},
  onBlur = () => {},
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === General.ALERT_MESSAGE_TYPE.AUTO_CLOSER) {
      const timer = setTimeout(() => {
        removeMessage(id);
        onBlur();
      }, duration);

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, []);

  const removeMessage = (messageId) => {
    dispatch(GeneralAction.removeAlertMessage(messageId));
  };

  const retryAction = () => {
    action();
    removeMessage(id);
  };

  let primaryColor = Colors.DEFAULT_BLUE;
  let secondaryColor = Colors.DEFAULT_RED;
  let textColor = Colors.DEFAULT_WHITE;
  let icon = "checkmark-circle";

  switch (level) {
    case General.ALERT_MESSAGE_LEVEL.SUCCESS:
      primaryColor = Colors.DEFAULT_BLUE;
      secondaryColor = Colors.DEFAULT_WHITE;
      break;
    case General.ALERT_MESSAGE_LEVEL.WARNING:
      primaryColor = Colors.ORANGE;
      secondaryColor = Colors.DEFAULT_WHITE;
      icon = "warning";
      break;
    case General.ALERT_MESSAGE_LEVEL.DANGER:
      primaryColor = Colors.DEFAULT_RED;
      secondaryColor = Colors.DEFAULT_WHITE;
      icon = "warning";
      break;
  }

  return (
    <Animated.View
      style={[styles.messageContainer, { backgroundColor: primaryColor }]}
      //   layout={Layout}
      entering={SlideInRight.springify().stiffness(60)}
      exiting={SlideOutLeft.duration(400)}
    >
      <Container row aCenter w={"85%"}>
        <Ionicons name={icon} color={secondaryColor} size={22} />
        <Separator width={5} />
        <Typography h5 semibold color={textColor} flex1>
          {message}
        </Typography>
      </Container>
      <Container row aCenter>
        {type === General.ALERT_MESSAGE_TYPE.NORMAL && (
          <Ionicons
            name="close-circle"
            color={secondaryColor}
            size={22}
            onPress={() => removeMessage(id)}
          />
        )}

        <Ionicons
          name="close-circle"
          color={secondaryColor}
          size={22}
          onPress={() => removeMessage(id)}
        />
      </Container>
    </Animated.View>
  );
};

const AlertMessage = () => {
  const alertMessages = useSelector(
    (state) => state?.generalState?.alertMessages
  );
  console.log("alertMessages", alertMessages);
  return (
    <Animated.View
      style={styles.messagesArea}
      layout={Layout}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(400)}
    >
      {alertMessages?.map((message) => (
        <MessageBox {...message} key={message?.id} />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  messagesArea: {
    position: "absolute",
    top: 100,
    width: "100%",
    zIndex: 100,
  },
  messageContainer: {
    backgroundColor: Colors.DARK_GREEN,
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
  },
});

export default AlertMessage;
