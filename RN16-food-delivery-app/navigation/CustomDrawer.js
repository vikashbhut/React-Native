import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StatusBar } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MainLayout, Search } from "../screens/index";
import {
  COLORS,
  constants,
  dummyData,
  FONTS,
  icons,
  SIZES,
} from "../constants";
import Animated from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { setSelctedTab } from "../store/tab/tabActions";

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icons, isFocus, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SIZES.base,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.base,
        height: 40,
        backgroundColor: isFocus ? COLORS.transparentBlack1 : null,
      }}
    >
      <Image
        source={icons}
        style={{ tintColor: COLORS.white, width: 20, height: 20 }}
      />
      <Text style={{ marginLeft: 15, color: COLORS.white, ...FONTS.h3 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation, setSelctedTab, selectedTab }) => {
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingHorizontal: SIZES.radius }}>
        {/* Close */}
        <View
          style={{
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{
                height: 35,
                width: 35,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Profile */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
        >
          <Image
            source={dummyData.myProfile.profile_image}
            style={{
              width: 50,
              height: 50,
              borderRadius: SIZES.radius,
            }}
          />
          <View style={{ marginLeft: SIZES.radius }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {dummyData.myProfile.name}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
              View Your Profile
            </Text>
          </View>
        </TouchableOpacity>
        {/* Drawer Item */}
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          <CustomDrawerItem
            isFocus={selectedTab === constants.screens.home}
            onPress={() => {
              setSelctedTab(constants.screens.home);
              navigation.navigate("MainLayout");
            }}
            label={constants.screens.home}
            icons={icons.home}
          />
          <CustomDrawerItem
            label={constants.screens.my_wallet}
            icons={icons.wallet}
          />
          <CustomDrawerItem
            isFocus={selectedTab === constants.screens.notification}
            onPress={() => {
              setSelctedTab(constants.screens.notification);
              navigation.navigate("MainLayout");
            }}
            label={constants.screens.notification}
            icons={icons.notification}
          />
          <CustomDrawerItem
            isFocus={selectedTab === constants.screens.favourite}
            onPress={() => {
              setSelctedTab(constants.screens.favourite);
              navigation.navigate("MainLayout");
            }}
            label={constants.screens.favourite}
            icons={icons.favourite}
          />
          <View
            style={{
              marginVertical: SIZES.radius,
              height: 1,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          ></View>
          <CustomDrawerItem
            label={"Track Your Oreder"}
            icons={icons.location}
          />
          <CustomDrawerItem label={"Coupons"} icons={icons.coupon} />
          <CustomDrawerItem label={"Settings"} icons={icons.setting} />
          <CustomDrawerItem label={"Invite a Freind"} icons={icons.profile} />
          <CustomDrawerItem label={"Help Center"} icons={icons.help} />
        </View>
        <View style={{ marginBottom: SIZES.padding }}>
          <CustomDrawerItem label={"Logout"} icons={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
const CustomDrawer = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state) => state.tabReducers);
  const setTab = (tab) => {
    dispatch(setSelctedTab(tab));
  };
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 29],
  });

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <StatusBar backgroundColor={COLORS.primary} />
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{
          flex: 1,
          backgroundColor: "transparent",
          paddingRight: 20,
          width: "65%",
        }}
        sceneContainerStyle={{
          backgroundColor: "transparent",
        }}
        initialRouteName="MainLayout"
        drawerContent={(props) => {
          setTimeout(() => setProgress(props.progress));
          return (
            <CustomDrawerContent
              navigation={props.navigation}
              selectedTab={selectedTab}
              setSelctedTab={setTab}
            />
          );
        }}
      >
        <Drawer.Screen name="MainLayout">
          {(props) => <MainLayout {...props} animationStyle={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;
