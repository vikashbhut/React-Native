import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FONTS, COLORS, SIZES, icons } from "../constants/index";

export default function RadioButton({
  containerStyle,
  lable,
  lableStyle,
  iconStyle,
  isSelected,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle,
      }}
    >
      <Image
        source={isSelected ? icons.check_on : icons.check_off}
        style={{
          marginLeft: 5,
          width: 20,
          height: 20,
          ...iconStyle,
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.radius,
          color: COLORS.gray,
          ...FONTS.body3,
          ...lableStyle,
        }}
      >
        {lable}
      </Text>
    </TouchableOpacity>
  );
}
