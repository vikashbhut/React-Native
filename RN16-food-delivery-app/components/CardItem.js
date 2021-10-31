import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FONTS, SIZES, COLORS, icons } from "../constants/index";

export default function CardItem({ item, isSelected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        borderWidth: 2,
        borderRadius: SIZES.radius,
        borderColor: isSelected ? COLORS.primary : COLORS.lightGray2,
      }}
    >
      <View
        style={{
          width: 60,
          height: 45,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderRadius: SIZES.radius,
          borderColor: COLORS.lightGray2,
        }}
      >
        <Image
          style={{ width: 35, height: 35 }}
          resizeMode="center"
          source={item.icon}
        />
      </View>
      <Text style={{ marginLeft: SIZES.radius, ...FONTS.h3, flex: 1 }}>
        {item.name}
      </Text>
      <Image
        source={isSelected ? icons.check_on : icons.check_off}
        style={{
          width: 25,
          height: 25,
        }}
      />
    </TouchableOpacity>
  );
}
