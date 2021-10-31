import React from "react";
import { View, Text, Image } from "react-native";
import { COLORS, icons } from "../constants/index";

export default function FormInputCheck({ value, error }) {
  return (
    <View style={{ justifyContent: "center" }}>
      <Image
        source={
          (value === "" || value !== "") && error === ""
            ? icons.correct
            : icons.cancel
        }
        style={{
          height: 20,
          width: 20,
          tintColor:
            value === ""
              ? COLORS.gray
              : (value === "" || value !== "") && error === ""
              ? COLORS.green
              : COLORS.red,
        }}
      />
    </View>
  );
}
