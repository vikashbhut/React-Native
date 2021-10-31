import React from "react";
import { View, Text, Image, BackHandler } from "react-native";
import { TextButton } from "../../components";
import { FONTS, SIZES, images, COLORS } from "../../constants/index";

const Success = ({ navigation }) => {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.padding,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={images.success}
          resizeMode="contain"
          style={{
            width: 150,
            height: 150,
          }}
        />
        <Text style={{ ...FONTS.h1, marginTop: SIZES.padding }}>
          Congratulations!
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: SIZES.base,
            color: COLORS.darkGray,
            ...FONTS.body3,
          }}
        >
          Payment was successfully made!
        </Text>
      </View>
      <TextButton
        lable="Done"
        onPress={() => navigation.navigate("DeliveryStatus")}
        btnContainerStyle={{
          height: 55,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
      />
    </View>
  );
};

export default Success;
