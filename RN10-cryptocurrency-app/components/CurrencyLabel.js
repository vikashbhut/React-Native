import React from "react";
import { Text, View, Image } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";
export default function CurrencyLabel({ icon, currency, code }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={icon}
        style={{ height: 25, width: 25, marginTop: 5 }}
        resizeMode="cover"
      />
      <View style={{ marginLeft: SIZES.base }}>
        <Text style={{ ...FONTS.h3 }}>{currency}</Text>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{code}</Text>
      </View>
    </View>
  );
}
