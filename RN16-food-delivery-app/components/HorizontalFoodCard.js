import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants/index";

export default function HorizontalFoodCard({
  containerStyle,
  imageStyle,
  item,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          backgroundColor: COLORS.lightGray2,
          borderRadius: SIZES.radius,
          alignItems: "center",
        },
        containerStyle,
      ]}
      onPress={onPress}
    >
      {/* Image */}
      <Image source={item.image} style={imageStyle} />
      {/* Info */}
      <View style={{ flex: 1 }}>
        <Text style={{ ...FONTS.h3, fontSize: 17 }}>{item.name}</Text>
        <Text style={{ color: COLORS.darkGray2, ...FONTS.body4 }}>
          {item.description.slice(0, 30)}
        </Text>
        <Text style={{ marginTop: SIZES.base, ...FONTS.h2 }}>
          ${item.price}
        </Text>
      </View>
      {/* Calories */}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 5,
          right: SIZES.radius,
        }}
      >
        <Image source={icons.calories} style={{ width: 30, height: 30 }} />
        <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
          {item.calories} Calories
        </Text>
      </View>
    </TouchableOpacity>
  );
}
