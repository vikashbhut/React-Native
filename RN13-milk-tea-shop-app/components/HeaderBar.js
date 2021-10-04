import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeActions";

export default function HeaderBar() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const toggleThemeHandler = () => {
    if (state.appTheme.name === "light") {
      dispatch(toggleTheme("dark"));
    } else {
      dispatch(toggleTheme("light"));
    }
  };

  return (
    <View
      style={{
        height: 150,
        width: "100%",
        backgroundColor: COLORS.purple,
        flexDirection: "row",
        paddingTop: SIZES.padding,
      }}
    >
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Vikas</Text>
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Welcome Back!</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleThemeHandler()}
        style={{
          flexDirection: "row",
          height: 40,
          backgroundColor: COLORS.lightPurple,
          marginHorizontal: SIZES.padding,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            ...(state.appTheme.name === "light"
              ? styles.selectedLightMode
              : {}),
          }}
        >
          <Image
            source={icons.sunny}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            ...(state.appTheme.name === "dark" ? styles.selectedNightMode : {}),
          }}
        >
          <Image
            source={icons.night}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedNightMode: {
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  selectedLightMode: {
    borderRadius: 20,
    backgroundColor: COLORS.yellow,
  },
});
