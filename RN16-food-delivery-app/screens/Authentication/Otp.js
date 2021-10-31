import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AuthLayout from "./AuthLayout";
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from "../../components";
import { SIZES, FONTS, COLORS, icons, images } from "../../constants";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const Otp = ({ navigation }) => {
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <AuthLayout
      title="OTP Auhtentication"
      subTitle="An authentication code has been sent to your email"
      titleContainerStyle={{
        marginTop: SIZES.padding * 2,
      }}
    >
      {/* OTP Input */}
      <View style={{ flex: 1, marginTop: SIZES.padding * 2 }}>
        <OTPInputView
          pinCount={4}
          codeInputFieldStyle={{
            width: 65,
            height: 65,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            color: COLORS.black,
            ...FONTS.h3,
          }}
          style={{
            width: "100%",
            height: 50,
          }}
          onCodeFilled={(code) => {
            console.log(code);
          }}
        />
        {/* Count Down Timer */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
            Didn't Receive Code
          </Text>
          <TextButton
            lable={`Resend (${timer}s)`}
            onPress={() => setTimer(60)}
            disabled={timer === 0 ? false : true}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            btnContainerStyle={{
              backgroundColor: null,
              marginLeft: SIZES.base,
            }}
          />
        </View>
      </View>
      {/* Footer */}
      <View>
        <TextButton
          onPress={() => navigation.navigate("Home")}
          lable="Continue"
          btnContainerStyle={{
            height: 50,
            borderRadius: SIZES.radius,
          }}
        />
        <View style={{ marginTop: SIZES.padding, alignItems: "center" }}>
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
            By signing up, you agree to our.
          </Text>
          <TextButton
            lable="Terms and Conditions"
            labelStyle={{ color: COLORS.primary, ...FONTS.body3 }}
            btnContainerStyle={{ backgroundColor: null }}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default Otp;
