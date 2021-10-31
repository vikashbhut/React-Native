import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AuthLayout from "./AuthLayout";
import { FormInput, TextButton, TextIconButton } from "../../components";
import { SIZES, FONTS, COLORS, icons, images } from "../../constants";
import { utils } from "../../utils";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const isEnableContinue = () => email !== "" && emailError === "";
  return (
    <AuthLayout
      title="Password Recovery"
      subTitle="Please enter your email address to recover your password."
      titleContainerStyle={{
        marginTop: SIZES.padding * 2,
      }}
    >
      <View style={{ flex: 1, marginTop: SIZES.padding * 2 }}>
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
        <TextButton
          onPress={() => navigation.goBack()}
          disabled={!isEnableContinue()}
          lable="Send Email"
          btnContainerStyle={{
            height: 55,
            borderRadius: SIZES.radius,
            marginTop: SIZES.padding,
            backgroundColor: isEnableContinue()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
        />
      </View>
    </AuthLayout>
  );
};

export default ForgotPassword;
