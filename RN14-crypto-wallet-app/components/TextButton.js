import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS, FONTS } from "../constants/index";

export default function TextButton({ label, containerStyle, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        ...containerStyle,
      }}
    >
      <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{label}</Text>
    </TouchableOpacity>
  );
}
