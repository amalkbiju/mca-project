// CustomCheckbox.js
import React from "react";
import { TouchableOpacity, View, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomCheckbox = ({
  value,
  onValueChange,
  disabled = false,
  activeColor = "#4A90E2",
  inactiveColor = "#ced4da",
  size = 24,
  checkIcon = "checkmark",
  boxStyle = {},
}) => {
  // Animation value for the check mark
  const [scaleAnim] = React.useState(new Animated.Value(value ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: value ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [value, scaleAnim]);

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.checkboxContainer,
        {
          width: size,
          height: size,
          borderColor: value ? activeColor : inactiveColor,
          backgroundColor: value ? activeColor : "transparent",
        },
        boxStyle,
        disabled && styles.disabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      {value && (
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          }}
        >
          <Icon name={checkIcon} size={size * 0.7} color="#FFFFFF" />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 4,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomCheckbox;
