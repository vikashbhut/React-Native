import React from "react";
import { Image, View } from "react-native";
import { icons } from "../constants";

export default function Rating({ containerStyle, rate }) {
  const starComponents = [];
  for (let i = 0; i < rate; i++) {
    starComponents.push(
      <Image
        key={i}
        source={icons.star}
        resizeMode="cover"
        style={{
          marginLeft: i == 0 ? 0 : 5,
          width: 15,
          height: 15,
        }}
      />
    );
  }
  return (
    <View style={{ flexDirection: "row", ...containerStyle }}>
      {starComponents}
    </View>
  );
}
