import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/index";

export default function IconTextButton({
  lable,
  onPress,
  containerStyle,
  icon,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.radius,
        height: 50,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          height: 20,
          width: 20,
        }}
      />
      <Text style={{ marginLeft: SIZES.base, ...FONTS.h3 }}>{lable}</Text>
    </TouchableOpacity>
  );
}
