import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants";
import { HeaderBar, CustomButton } from "../components";
import { useSelector } from "react-redux";
const Rewards = ({ navigation }) => {
  const appTheme = useSelector((state) => state.appTheme);
  const renderRewardPointSecion = () => {
    return (
      <View style={{ alignItems: "center", marginVertical: SIZES.padding }}>
        {/* Text */}
        <Text style={{ color: COLORS.primary, ...FONTS.h1, fontSize: 35 }}>
          Rewards
        </Text>
        <Text
          style={{
            color: appTheme.textColor,
            textAlign: "center",
            width: SIZES.width * 0.6,
            ...FONTS.h3,
            lineHeight: 18,
            marginTop: 10,
          }}
        >
          You are 60 points away from your next reward.
        </Text>
        {/* Image */}
        <ImageBackground
          source={icons.reward_cup}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.8,
            marginTop: SIZES.padding,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.white,
            }}
          >
            <Text style={{ ...FONTS.h1 }}>280</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomButton
          onPress={() => navigation.navigate("Location")}
          label="Scan in store"
          isPrimary={true}
          containerStyle={{
            paddingVertical: 5,
            marginRight: SIZES.radius,
            width: 130,
            borderRadius: SIZES.radius * 2,
          }}
          labelStyle={{ ...FONTS.h3 }}
        />
        <CustomButton
          onPress={() => navigation.navigate("Location")}
          label="Redeem"
          isSecondary={true}
          containerStyle={{
            width: 130,
            paddingVertical: 5,
            borderRadius: SIZES.radius * 2,
          }}
          labelStyle={{ ...FONTS.h3 }}
        />
      </View>
    );
  };
  const renderAvailableRewardsLabel = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginBottom: SIZES.radius,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text style={{ color: appTheme.textColor, ...FONTS.h2 }}>
          Available Rewards
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderBar />
      {/* Deatils */}
      <FlatList
        style={{
          flex: 1,
          backgroundColor: COLORS.secondary,
          marginTop: -48,
          borderTopLeftRadius: SIZES.radius * 4,
          borderTopRightRadius: SIZES.radius * 4,
          backgroundColor: appTheme.backgroundColor,
        }}
        ListHeaderComponent={
          <View>
            {/* Reward Point */}
            {renderRewardPointSecion()}
            {/* Buttons */}
            {renderButtons()}
            {/* HeaderLabel */}
            {renderAvailableRewardsLabel()}
          </View>
        }
        ListFooterComponent={<View style={{ marginBottom: 150 }}></View>}
        data={dummyData.availableRewards}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.base,
                paddingVertical: SIZES.base,
                borderRadius: 20,
                backgroundColor: item.eligible ? COLORS.yellow : COLORS.gray,
              }}
            >
              <Text
                style={{
                  color: item.eligible ? COLORS.black : COLORS.lightGray,
                  ...FONTS.body3,
                }}
              >
                {item.title}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Rewards;
