import React from "react";
import { View, Text, TextInput } from "react-native";
import { SIZES, FONTS, COLORS } from "../constants";

export default function FormInput({
  containerStyle,
  label,
  placeHolder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange = () => {},
  secureTextEntry,
  keyboardtype = "default",
  autoCompleteType = "off",
  autoCapitalize = "none",
  errorMsg = "",
  value,
  maxLength,
  inputContainerStyle = {},
}) {
  return (
    <View style={{ ...containerStyle }}>
      {/* Label and Error Message */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{label}</Text>
        <Text style={{ color: COLORS.red, ...FONTS.body4 }}>{errorMsg}</Text>
      </View>
      {/* TextInput */}
      <View
        style={{
          flexDirection: "row",
          height: 55,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          ...inputContainerStyle,
        }}
      >
        {prependComponent}
        <TextInput
          style={{ flex: 1, ...inputStyle }}
          value={value}
          placeholder={placeHolder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={COLORS.gray}
          keyboardType={keyboardtype}
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          onChangeText={(text) => onChange(text)}
          {...(maxLength && { maxLength: maxLength })}
        />
        {appendComponent}
      </View>
    </View>
  );
}
