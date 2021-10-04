import React from "react";
import {
  Image,
  Platform,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import Svg, { Path } from "react-native-svg";
import { Home, Rewards } from "../screens";
import { COLORS, SIZES, icons } from "../constants";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ containerStyle, isFloat, onPress, children }) => {
  if (isFloat) {
    return (
      <TouchableOpacity
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ position: "absolute", top: 0 }}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={90}
            height={61}
            viewBox="0 0 90 61"
          >
            <Path
              d="M0 0a38.742 38.742 0 0113 7c5.313 4.4 6.7 8.593 12 13 5.993 4.98 12.987 8 20 8s14.007-3.02 20-8c5.3-4.408 6.687-8.6 12-13a38.742 38.742 0 0113-7v61H0V0z"
              fill={COLORS.gray}
              fillRule="evenodd"
            />
          </Svg>
        </View>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
            position: "absolute",
            top: -40,
            borderRadius: 30,
          }}
        >
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.gray,
            ...containerStyle,
          }}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => {
        return (
          <View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: 30,
                backgroundColor: COLORS.gray3,
              }}
            />
            <BottomTabBar {...props} />
          </View>
        );
      }}
      screenOptions={({ route }) => ({
        tabBarButton: (props) => (
          <CustomTabBarButton
            {...props}
            isFloat={route.name === "AddOrder" ? true : false}
            containerStyle={{
              borderTopLeftRadius: route.name === "Home" ? SIZES.radius * 2 : 0,
              borderTopRightRadius:
                route.name === "Profile" ? SIZES.radius * 2 : 0,
              marginLeft: route.name === "Favourite" ? 6 : 0,
              marginRight: route.name === "Rewards" ? 6 : 0,
            }}
          />
        ),
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "transparent",
          borderTopColor: "transparent",
          height: Platform.OS == "android" ? 60 : 80,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={Rewards}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.bubbleTea}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddOrder"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.add}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: COLORS.white,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.heart}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.profile}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
