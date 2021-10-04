import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { FONTS, COLORS, SIZES } from "../constants/index";
export default function VerticalTextButton({
  containerStyle,
  lable,
  selected,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "center",
        transform: [{ rotate: "-90deg" }],
        ...containerStyle,
      }}
    >
      <Text
        style={{
          color: selected ? COLORS.white : COLORS.lightGreen,
          ...FONTS.body2,
          fontSize: 20,
        }}
      >
        {lable}
      </Text>
    </TouchableOpacity>
  );
}
