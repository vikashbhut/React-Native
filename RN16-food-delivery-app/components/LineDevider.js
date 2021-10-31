import React from "react";
import { View } from "react-native";
import { COLORS } from "../constants/index";

export default function LineDevider({ lineStyle }) {
  return (
    <View
      style={{
        height: 2,
        width: "100%",
        backgroundColor: COLORS.lightGray2,
        ...lineStyle,
      }}
    ></View>
  );
}
