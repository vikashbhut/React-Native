import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FONTS, SIZES, COLORS } from "../constants";
export default function CategoryCard({
  containerStyle,
  onPress,
  categoryItem,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray2,
        padding: 10,
        ...containerStyle,
      }}
    >
      {/* Image */}
      <Image
        source={categoryItem.image}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: SIZES.radius,
        }}
      />
      {/* Details */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        {/* Name */}
        <Text style={{ ...FONTS.h2 }}>{categoryItem.name}</Text>
        {/* Servings */}
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
          {categoryItem.duration} | {categoryItem.serving} Serving
        </Text>
      </View>
    </TouchableOpacity>
  );
}
