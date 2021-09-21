import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants/index";

export default function TextButton({
  lable,
  customContainerStyle,
  customLabelStyle,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.green,
        ...customContainerStyle,
      }}
    >
      <Text style={{ ...FONTS.h3, color: COLORS.white, ...customLabelStyle }}>
        {lable}
      </Text>
    </TouchableOpacity>
  );
}
