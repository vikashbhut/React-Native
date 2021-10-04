import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/index";
export default function CustomButton({
  containerStyle,
  labelStyle,
  isPrimary,
  isSecondary,
  onPress,
  label,
}) {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isPrimary ? COLORS.primary : COLORS.transparent,
        borderColor: isSecondary ? COLORS.primary : COLORS.transparent,
        borderWidth: isSecondary ? 1 : 0,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: isPrimary ? COLORS.white : COLORS.primary,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
