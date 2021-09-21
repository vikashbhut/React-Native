import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, icons } from "../constants/index";
import Dashboard from "../screens/Dashboard";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 100,
          elevation: 0,
          backgroundColor: COLORS.black,
          borderTopColor: "transparent",
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.blue : COLORS.gray;
          switch (route.name) {
            case "Dashboard":
              return (
                <Image
                  source={icons.maps}
                  resizeMode="contain"
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: tintColor,
                  }}
                />
              );
            case "Bookmark":
              return (
                <Image
                  source={icons.bookmark}
                  resizeMode="contain"
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: tintColor,
                  }}
                />
              );
            case "Calendar":
              return (
                <Image
                  source={icons.calendar}
                  resizeMode="contain"
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: tintColor,
                  }}
                />
              );
            case "Plane":
              return (
                <Image
                  source={icons.plane}
                  resizeMode="contain"
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: tintColor,
                  }}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Bookmark" component={Dashboard} />
      <Tab.Screen name="Calendar" component={Dashboard} />
      <Tab.Screen name="Plane" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default Tabs;
