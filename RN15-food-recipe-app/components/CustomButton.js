import React from "react";
import { TouchableOpacity, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS } from "../constants";
export default function CustomButton({
  buttonText,
  buttonContainerStyle,
  colors,
  onPress,
}) {
  if (colors.length) {
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ ...buttonContainerStyle }}
        >
          <Text
            style={{ textAlign: "center", color: COLORS.white, ...FONTS.h3 }}
          >
            {buttonText}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={{ ...buttonContainerStyle }}>
        <Text style={{ textAlign: "center", color: COLORS.white, ...FONTS.h3 }}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  }
}
