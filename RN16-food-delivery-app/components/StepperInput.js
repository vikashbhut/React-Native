import React from "react";
import { View, Text } from "react-native";
import { TextIconButton } from "../components";
import { FONTS, COLORS, SIZES, icons } from "../constants/index";

export default function StepperInput({
  containerStyle,
  value = 1,
  onAdd,
  onMinus,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        width: 130,
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
    >
      <TextIconButton
        onPress={onMinus}
        icons={icons.minus}
        containerStyle={{
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: value > 1 ? COLORS.primary : COLORS.gray,
        }}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ ...FONTS.h3 }}>{value}</Text>
      </View>
      <TextIconButton
        onPress={onAdd}
        icons={icons.plus}
        containerStyle={{
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: value > 1 ? COLORS.primary : COLORS.gray,
        }}
      />
    </View>
  );
}
