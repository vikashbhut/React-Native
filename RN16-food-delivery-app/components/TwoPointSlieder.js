import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { COLORS, FONTS, SIZES } from "../constants/index";
import { useBackButton } from "@react-navigation/native";

export default function TwoPointSlieder({
  value,
  min,
  max,
  prefix,
  postfix,
  onValuesChange,
}) {
  return (
    <MultiSlider
      values={value}
      sliderLength={SIZES.width - SIZES.padding * 2 - 50}
      min={min}
      max={max}
      step={1}
      markerOffsetY={20}
      selectedStyle={{ backgroundColor: COLORS.primary }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
      }}
      minMarkerOverlapDistance={50}
      customMarker={(e) => {
        return (
          <View
            style={{
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: COLORS.primary,
                borderWidth: 4,
                borderColor: COLORS.white,
                ...styles.shadow,
              }}
            ></View>
            <Text style={{ marginTop: 5, color: COLORS.gray, ...FONTS.body3 }}>
              {prefix}
              {e.currentValue}
              {postfix}
            </Text>
          </View>
        );
      }}
      onValuesChange={(values) => onValuesChange(values)}
    />
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
});
