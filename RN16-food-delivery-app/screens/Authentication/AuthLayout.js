import React from "react";
import { View, Text, Image, Platform, ScrollView } from "react-native";
import { constants, SIZES, FONTS, images, COLORS } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function AuthLayout({
  title,
  subTitle,
  titleContainerStyle,
  children,
}) {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        enableOnAndroid={true}
        extraHeight={130}
        extraScrollHeight={130}
        enableAutomaticScroll={Platform.OS === "ios"}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* AppIcon */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={images.logo_02}
            resizeMode="contain"
            style={{
              height: 100,
              width: 200,
            }}
          />
        </View>
        {/* Title */}
        <View style={[{ marginTop: SIZES.padding }, titleContainerStyle]}>
          <Text style={{ textAlign: "center", ...FONTS.h2 }}>{title}</Text>
          <Text
            style={{
              color: COLORS.darkGray2,
              marginTop: SIZES.base,
              ...FONTS.body3,
              textAlign: "center",
            }}
          >
            {subTitle}
          </Text>
        </View>
        {/* Children */}
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
}
