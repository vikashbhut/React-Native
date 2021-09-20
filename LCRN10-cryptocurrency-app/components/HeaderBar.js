import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons } from "../constants/index";

export default function HeaderBar({ right }) {
  const naviagation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        flexDirection: "row",
        marginTop: SIZES.padding,
      }}
    >
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <TouchableOpacity
          onPress={() => naviagation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.back_arrow}
            resizeMode="contain"
            style={{ width: 25, height: 25, tintColor: COLORS.gray }}
          />
          <Text style={{ marginLeft: SIZES.base, ...FONTS.h2 }}>Back</Text>
        </TouchableOpacity>
      </View>
      {right && (
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity>
            <Image
              source={icons.star}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
