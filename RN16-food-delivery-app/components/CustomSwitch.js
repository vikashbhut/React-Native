import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { SIZES, FONTS, COLORS } from "../constants";

export default function CustomSwitch({ value, onChange }) {
  return (
    <TouchableWithoutFeedback onPress={() => onChange(!value)}>
      <View style={{ flexDirection: "row" }}>
        <View style={value === true ? styles.switchOn : styles.switchOf}>
          <View
            style={{
              ...styles.dot,
              backgroundColor: value === true ? COLORS.white : COLORS.gray,
            }}
          />
        </View>
        <Text
          style={{
            color: value === true ? COLORS.primary : COLORS.gray,
            marginLeft: SIZES.base,
            ...FONTS.body4,
          }}
        >
          Save Me
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  switchOn: {
    width: 40,
    height: 20,
    paddingRight: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  switchOf: {
    width: 40,
    height: 20,
    paddingLeft: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
