import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS, COLORS, images, icons, SIZES } from "../constants";
import { CustomButton } from "../components";

const Login = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View style={{ height: SIZES.height > 700 ? "65%" : "60%" }}>
        <ImageBackground
          source={images.loginBackground}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: "flex-end",
              padding: SIZES.padding,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
                width: "80%",
              }}
            >
              Cooking a Delicious Food Easily
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };
  const renderDetail = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Description */}
        <Text
          style={{
            marginTop: SIZES.radius,
            width: "75%",
            color: COLORS.gray,
            ...FONTS.body3,
          }}
        >
          Discover more than 1200 food recipes in your hands and cooking it
          easily!
        </Text>
        {/* Buttons */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          {/* Login */}
          <CustomButton
            buttonText={"Login"}
            colors={[COLORS.darkGreen, COLORS.lime]}
            onPress={() => navigation.navigate("Home")}
            buttonContainerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
            }}
          />
          {/* SignUp */}
          <CustomButton
            buttonText={"SignUp"}
            colors={[]}
            onPress={() => navigation.navigate("Home")}
            buttonContainerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLORS.darkLime,
              marginTop: SIZES.radius,
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      {/* Header */}
      {renderHeader()}
      {/* Detail */}
      {renderDetail()}
    </View>
  );
};

export default Login;
