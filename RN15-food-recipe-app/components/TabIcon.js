import React from "react";
import { View, Text, Image } from "react-native";
import { COLORS } from "../constants";

export default function TabIcon({ focused, icon }) {
  return (
    <View
      style={{
        width: 50,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
          tintColor: focused ? COLORS.darkGreen : COLORS.lightLime,
        }}
      />
      {focused && (
        <View
          style={{
            position: "absolute",
            height: 5,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.darkGreen,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />
      )}
    </View>
  );
}
