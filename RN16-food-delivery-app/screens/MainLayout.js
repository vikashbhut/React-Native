import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
} from "../constants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { setSelctedTab } from "../store/tab/tabActions";
import { Home, Search, CartTab, Favourite, Notification } from "./index";
import { Header } from "../components";
import LinearGradient from "react-native-linear-gradient";
import { useIsDrawerOpen } from "@react-navigation/drawer";
const MainLayout = ({ animationStyle, navigation }) => {
  const { selectedTab } = useSelector((state) => state.tabReducers);
  const [prevSelectedTab, setPrevSelectedTab] = useState("");
  const dispatch = useDispatch();
  const flatListRef = useRef();
  const isDrawerOpen = useIsDrawerOpen();

  // Reanimated Shared Value

  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);

  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(COLORS.white);

  const cartTabFlex = useSharedValue(1);
  const cartTabColor = useSharedValue(COLORS.white);

  const favouriteTabFlex = useSharedValue(1);
  const favouriteTabColor = useSharedValue(COLORS.white);

  const notificationTabFlex = useSharedValue(1);
  const notificationTabColor = useSharedValue(COLORS.white);

  //Reanimated Animated Style

  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });

  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });

  const searchFlexStyle = useAnimatedStyle(() => {
    return {
      flex: searchTabFlex.value,
    };
  });

  const searchColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: searchTabColor.value,
    };
  });

  const cartFlexStyle = useAnimatedStyle(() => {
    return {
      flex: cartTabFlex.value,
    };
  });

  const cartColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: cartTabColor.value,
    };
  });

  const favouriteFlexStyle = useAnimatedStyle(() => {
    return {
      flex: favouriteTabFlex.value,
    };
  });

  const favouriteColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: favouriteTabColor.value,
    };
  });

  const notificationFlexStyle = useAnimatedStyle(() => {
    return {
      flex: notificationTabFlex.value,
    };
  });

  const notificationColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: notificationTabColor.value,
    };
  });

  useEffect(() => {
    if (isDrawerOpen) {
      setPrevSelectedTab(selectedTab);
      dispatch(setSelctedTab(""));
    } else if (selectedTab === "" && !isDrawerOpen)
      dispatch(setSelctedTab(prevSelectedTab));
  }, [isDrawerOpen]);

  useEffect(() => {
    dispatch(setSelctedTab(constants.screens.home));
  }, []);
  useEffect(() => {
    if (selectedTab === constants.screens.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      });
      homeTabFlex.value = withTiming(4, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      homeTabFlex.value = withTiming(1, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab === constants.screens.search) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      searchTabFlex.value = withTiming(4, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      searchTabFlex.value = withTiming(1, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab === constants.screens.cart) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
        animated: false,
      });
      cartTabFlex.value = withTiming(4, { duration: 500 });
      cartTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      cartTabFlex.value = withTiming(1, { duration: 500 });
      cartTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab === constants.screens.favourite) {
      flatListRef?.current?.scrollToIndex({
        index: 3,
        animated: false,
      });
      favouriteTabFlex.value = withTiming(4, { duration: 500 });
      favouriteTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      favouriteTabFlex.value = withTiming(1, { duration: 500 });
      favouriteTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab === constants.screens.notification) {
      flatListRef?.current?.scrollToIndex({
        index: 4,
        animated: false,
      });
      notificationTabFlex.value = withTiming(4, { duration: 500 });
      notificationTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      notificationTabFlex.value = withTiming(1, { duration: 500 });
      notificationTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
  }, [selectedTab]);
  const TabButton = ({
    lable,
    icon,
    isFocused,
    onPress,
    outerContainerStyle,
    innerContainerStyle,
  }) => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            },
            outerContainerStyle,
          ]}
        >
          <Animated.View
            style={[
              {
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                borderRadius: 25,
              },
              innerContainerStyle,
            ]}
          >
            <Image
              source={icon}
              style={{
                width: 20,
                height: 20,
                tintColor: isFocused ? COLORS.white : COLORS.gray,
              }}
            />
            {isFocused && (
              <Text
                numberOfLines={1}
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  marginLeft: SIZES.base,
                }}
              >
                {lable}
              </Text>
            )}
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        ...animationStyle,
      }}
    >
      {/* Header */}
      <Header
        title={selectedTab.toUpperCase()}
        leftComponent={
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              borderRadius: SIZES.radius,
              borderColor: COLORS.lightGray1,
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderWidth: 1,
            }}
          >
            <Image source={icons.menu} />
          </TouchableOpacity>
        }
        rightComponent={
          <Image
            source={dummyData.myProfile.profile_image}
            style={{
              width: 40,
              height: 40,
              borderRadius: SIZES.radius,
            }}
          />
        }
        containerStyle={{
          height: 50,
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
          marginTop: 10,
        }}
      />
      {/* Content */}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width,
                }}
              >
                {item.label === constants.screens.home && <Home />}
                {item.label === constants.screens.search && <Search />}
                {item.label === constants.screens.cart && <CartTab />}
                {item.label === constants.screens.favourite && <Favourite />}
                {item.label === constants.screens.notification && (
                  <Notification />
                )}
              </View>
            );
          }}
        />
      </View>
      {/* Footer */}
      <View
        style={{
          height: 100,
          justifyContent: "flex-end",
        }}
      >
        {/* Shadow */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.transparentBlack7]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: -20,
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        ></LinearGradient>
        {/* Tabs */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.radius,
            paddingBottom: 10,
            flexDirection: "row",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 26,
            backgroundColor: COLORS.white,
          }}
        >
          <TabButton
            lable={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab === constants.screens.home}
            outerContainerStyle={homeFlexStyle}
            innerContainerStyle={homeColorStyle}
            onPress={() => dispatch(setSelctedTab(constants.screens.home))}
          />
          <TabButton
            lable={constants.screens.search}
            icon={icons.search}
            isFocused={selectedTab === constants.screens.search}
            outerContainerStyle={searchFlexStyle}
            innerContainerStyle={searchColorStyle}
            onPress={() => dispatch(setSelctedTab(constants.screens.search))}
          />
          <TabButton
            lable={constants.screens.cart}
            icon={icons.cart}
            outerContainerStyle={cartFlexStyle}
            innerContainerStyle={cartColorStyle}
            isFocused={selectedTab === constants.screens.cart}
            onPress={() => dispatch(setSelctedTab(constants.screens.cart))}
          />
          <TabButton
            lable={constants.screens.favourite}
            icon={icons.favourite}
            outerContainerStyle={favouriteFlexStyle}
            innerContainerStyle={favouriteColorStyle}
            isFocused={selectedTab === constants.screens.favourite}
            onPress={() => dispatch(setSelctedTab(constants.screens.favourite))}
          />
          <TabButton
            lable={constants.screens.notification}
            icon={icons.notification}
            outerContainerStyle={notificationFlexStyle}
            innerContainerStyle={notificationColorStyle}
            isFocused={selectedTab === constants.screens.notification}
            onPress={() =>
              dispatch(setSelctedTab(constants.screens.notification))
            }
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default MainLayout;
