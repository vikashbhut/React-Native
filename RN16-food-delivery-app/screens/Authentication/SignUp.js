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

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [unm, setUnm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [unmError, setUnmError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const isEnableSignUp = () =>
    email !== "" &&
    emailError === "" &&
    passError === "" &&
    pass !== "" &&
    unmError === "" &&
    unm !== "";
  return (
    <AuthLayout
      title="Getting Started"
      subTitle="Create an account to continue!"
      titleContainerStyle={{
        marginTop: SIZES.radius,
      }}
    >
      <View style={{ flex: 1, marginTop: SIZES.padding }}>
        <FormInput
          label="Email"
          value={email}
          errorMsg={emailError}
          keyboardtype="email-address"
          autoCompleteType="email"
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
          onChange={(value) => {
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
        />

        <FormInput
          label="Username"
          value={unm}
          containerStyle={{ marginTop: SIZES.radius }}
          errorMsg={unmError}
          appendComponent={
            <View style={{ justifyContent: "center" }}>
              <Image
                source={unmError === "" ? icons.correct : icons.cross}
                style={{
                  width: 20,
                  height: 20,
                  tintColor:
                    unmError === "" && unm !== ""
                      ? COLORS.green
                      : unmError === "" && unm === ""
                      ? COLORS.gray
                      : COLORS.red,
                }}
              />
            </View>
          }
          onChange={(value) => {
            setUnm(value);
          }}
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
        <TextButton
          lable="Sign Up"
          disabled={!isEnableSignUp()}
          onPress={() => navigation.navigate("Otp")}
          btnContainerStyle={{
            height: 55,
            borderRadius: SIZES.radius,
            marginTop: SIZES.padding,
            backgroundColor: isEnableSignUp()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
            Already have an account?
          </Text>
          <TextButton
            onPress={() => navigation.goBack()}
            lable="Sign In"
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

export default SignUp;
