import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ColorPropType,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { COLORS, FONTS, dummyData, icons, SIZES } from "../constants";
import { IconButton, TabButton, VerticalTextButton } from "../components";
import { useSelector } from "react-redux";
const Order = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Snack");
  const [menu, setMenu] = useState(null);
  const appTheme = useSelector((state) => state.appTheme);
  useEffect(() => {
    const { selectedLocation } = route.params;
    setSelectedLocation(selectedLocation);
  }, []);

  useEffect(() => {
    let menulist = dummyData.menuList.filter(
      (menu) => menu.category === selectedCategory
    );
    setMenu(menulist);
  }, [selectedCategory]);
  const renderHeader = () => {
    return (
      <View
        style={{
          height: 160,
          backgroundColor: COLORS.primary,
          alignItems: "center",
        }}
      >
        {/* Nav Bar */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}>
              {"Pick-Up Order"}
            </Text>
          </View>
          <View style={{ width: 25 }} />
        </View>
        {/* Location */}
        <View
          style={{
            backgroundColor: COLORS.white,
            marginTop: SIZES.radius,
            borderRadius: SIZES.padding,
            paddingVertical: 5,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
            {selectedLocation?.title}
          </Text>
        </View>
      </View>
    );
  };

  const renderTopTabBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          paddingRight: SIZES.padding,
          paddingLeft: SIZES.padding * 2,
        }}
      >
        {/* Tab Buttons */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TabButton
            containerStyle={{ width: 60 }}
            label="Menu"
            selected={selectedTab === 0}
            onPress={() => setSelectedTab(0)}
          />
          <TabButton
            containerStyle={{ width: 90 }}
            label="Previous"
            selected={selectedTab === 1}
            onPress={() => setSelectedTab(1)}
          />
          <TabButton
            containerStyle={{ width: 90 }}
            label="Favourite"
            selected={selectedTab === 2}
            onPress={() => setSelectedTab(2)}
          />
        </View>
        {/* Oreder Number    */}
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>0</Text>
        </View>
      </View>
    );
  };
  const renderSideBar = () => {
    return (
      <>
        {/* <Svg width="65" height="65" viewBox="0 0 65 65">
          <Circle cy="60" cx="5" r="60" fill={COLORS.primary} />
        </Svg> */}
        <View
          style={{
            marginTop: 10,
            width: 65,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: 70,
            borderBottomRightRadius: 70,
            marginBottom: 10,
          }}
        >
          <VerticalTextButton
            lable="Snack"
            selected={selectedCategory === "Snack"}
            onPress={() => setSelectedCategory("Snack")}
          />
          <VerticalTextButton
            lable="Coffee"
            selected={selectedCategory === "Coffee"}
            onPress={() => setSelectedCategory("Coffee")}
            containerStyle={{ marginTop: 50 }}
          />
          <VerticalTextButton
            lable="Smoothie"
            selected={selectedCategory === "Smoothie"}
            onPress={() => setSelectedCategory("Smoothie")}
            containerStyle={{ marginTop: 70, width: 100 }}
          />
          <VerticalTextButton
            lable="Specialtea"
            selected={selectedCategory === "Specialtea"}
            onPress={() => setSelectedCategory("Specialtea")}
            containerStyle={{ marginTop: 90, width: 100 }}
          />
          <VerticalTextButton
            lable="Milk Tea"
            selected={selectedCategory === "Milk Tea"}
            onPress={() => setSelectedCategory("Milk Tea")}
            containerStyle={{ marginTop: 80, width: 80 }}
          />
        </View>
        {/* <Svg width="65" height="65" viewBox="0 0 65 65">
          <Circle cy="0" cx="5" r="60" fill={COLORS.primary} />
        </Svg> */}
      </>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      {renderHeader()}
      {/* Details */}
      <View
        style={{
          flex: 1,
          backgroundColor: appTheme.backgroundColor,
          marginTop: -45,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        {/* Tab Bar */}
        {renderTopTabBar()}
        {/* Side Bar & Listing */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          {/* Side Bar */}
          {renderSideBar()}
          {/* Listing */}
          <FlatList
            contentContainerStyle={{
              marginTop: SIZES.padding,
              paddingBottom: 120,
            }}
            data={menu}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    navigation.navigate("OrderDetail", { selectedItem: item })
                  }
                >
                  <View
                    style={{
                      height: 150,
                      paddingHorizontal: SIZES.padding,
                      marginTop: index > 0 ? SIZES.padding : 0,
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* Thumbnail */}
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        left: SIZES.padding,
                        backgroundColor: COLORS.lightYellow,
                        width: 130,
                        height: 140,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                      }}
                    >
                      <Image
                        source={item.thumbnail}
                        resizeMode="contain"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </View>

                    {/* Details */}
                    <View
                      style={{
                        width: "70%",
                        height: "85%",
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius,
                        paddingLeft: "22%",
                        paddingRight: SIZES.base,
                        paddingVertical: SIZES.base,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h2,
                          fontSize: 18,
                          lineHeight: 25,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.lightYellow,
                          ...FONTS.h2,
                          fontSize: 15,
                        }}
                      >
                        {item.price}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Order;
