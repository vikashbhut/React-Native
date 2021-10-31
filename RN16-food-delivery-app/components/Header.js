import React from "react";
import { View, Text } from "react-native";
import { FONTS } from "../constants/index";

export default function Header({
  containerStyle,
  title,
  leftComponent,
  rightComponent,
  titleStyle,
}) {
  return (
    <View style={{ flexDirection: "row", ...containerStyle }}>
      {leftComponent}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={[{ ...FONTS.h3 }, titleStyle]}>{title}</Text>
      </View>
      {rightComponent}
    </View>
  );
}
