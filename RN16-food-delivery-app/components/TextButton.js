import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants/index";

export default function TextButton({
  onPress,
  btnContainerStyle,
  lable,
  lable2 = "",
  labelStyle,
  label2Style,
  disabled,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.primary,
        },
        btnContainerStyle,
      ]}
      onPress={onPress}
    >
      <Text style={[{ color: COLORS.white, ...FONTS.h3 }, labelStyle]}>
        {lable}
      </Text>
      {lable2 !== "" && (
        <Text
          style={[
            { color: COLORS.white, ...FONTS.h3, textAlign: "right", flex: 1 },
            label2Style,
          ]}
        >
          {lable2}
        </Text>
      )}
    </TouchableOpacity>
  );
}
