import React from "react";
import { View } from "react-native";
import { COLORS, SIZES } from "../constants";

export default function ProgressBar({
  containerStyle,
  barStyle,
  barPercentage,
}) {
  return (
    <View style={{ ...containerStyle }}>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: COLORS.gray,
          ...barStyle,
          width: "100%",
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: barPercentage,
          backgroundColor: COLORS.primary,
          ...barStyle,
        }}
      ></View>
    </View>
  );
}
