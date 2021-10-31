import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AuthLayout from "./AuthLayout";
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from "../../components";
import { SIZES, FONTS, COLORS, icons, images } from "../../constants";
import { utils } from "../../utils";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [saveMe, setSaveMe] = useState(false);

  const isEnableSignIn = () =>
    email !== "" && emailError === "" && passError === "" && pass !== "";

  return (
    <AuthLayout
      title="Let's Sign You In"
      subTitle="Welcome back, you've been missed"
    >
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}
      >
        {/* FormInput */}
        <FormInput
          label="Email"
          keyboardtype="email-address"
          autoCompleteType="email"
          errorMsg={emailError}
          value={email}
          onChange={(value) => {
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          appendComponent={
            <View style={{ justifyContent: "center" }}>
              <Image
                source={emailError === "" ? icons.correct : icons.cross}
                style={{
                  width: 20,
                  height: 20,
                  tintColor:
                    emailError === "" && email !== ""
                      ? COLORS.green
                      : emailError === "" && email === ""
                      ? COLORS.gray
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <FormInput
          label="Password"
          value={pass}
          autoCompleteType="password"
          secureTextEntry={!showPass}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          errorMsg={passError}
          onChange={(value) => {
            utils.validatePassword(value, setPassError);
            setPass(value);
          }}
          appendComponent={
            <TouchableOpacity
              onPress={() => setShowPass(!showPass)}
              style={{
                width: 40,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Image
                source={showPass ? icons.eye : icons.eye_close}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />
        {/* Save Me and Forgot pass */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "space-between",
          }}
        >
          <CustomSwitch value={saveMe} onChange={(value) => setSaveMe(value)} />
          <TextButton
            onPress={() => navigation.navigate("ForgotPassword")}
            lable="Forgot Password?"
            btnContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}
          />
        </View>
        {/* Signin */}
        <TextButton
          lable="Sign In"
          onPress={() => navigation.navigate("Home")}
          disabled={!isEnableSignIn()}
          btnContainerStyle={{
            height: 55,
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
        />
        {/* Signup */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
            Don't have an account?
          </Text>
          <TextButton
            onPress={() => navigation.navigate("SignUp")}
            lable="Sign Up"
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            btnContainerStyle={{
              backgroundColor: null,
              marginLeft: 3,
            }}
          />
        </View>
      </View>
      {/* Footer */}
      <View>
        <TextIconButton
          icons={icons.fb}
          iconPostion={"LEFT"}
          containerStyle={{
            height: 50,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.blue,
          }}
          iconStyle={{
            tintColor: COLORS.white,
          }}
          label={"Continue With Facebook"}
          labelStyle={{ color: COLORS.white, marginLeft: SIZES.radius }}
        />
        <TextIconButton
          icons={icons.google}
          iconPostion={"LEFT"}
          containerStyle={{
            height: 50,
            marginTop: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
          }}
          label={"Continue With Google"}
          labelStyle={{ marginLeft: SIZES.radius, color: COLORS.black }}
        />
      </View>
    </AuthLayout>
  );
};

export default SignIn;
