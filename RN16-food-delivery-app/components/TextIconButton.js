import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants/index";
export default function TextIconButton({
  containerStyle,
  label,
  labelStyle,
  onPress,
  icons,
  iconStyle,
  iconPostion = "RIGHT",
  disabled = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        containerStyle,
      ]}
    >
      {iconPostion === "LEFT" && (
        <Image
          source={icons}
          style={[{ width: 20, height: 20, marginRight: 5 }, iconStyle]}
        />
      )}
      <Text style={[{ ...FONTS.body3 }, labelStyle]}>{label}</Text>
      {iconPostion === "RIGHT" && (
        <Image
          source={icons}
          style={[{ width: 20, height: 20, marginLeft: 5 }, iconStyle]}
        />
      )}
    </TouchableOpacity>
  );
}
