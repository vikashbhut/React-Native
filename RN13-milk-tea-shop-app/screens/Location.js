import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants";
import { CustomButton, IconButton, TabButton } from "../components";
import { useSelector } from "react-redux";

const Location = ({ navigation }) => {
  const appTheme = useSelector((state) => state.appTheme);
  const [selectedTab, setSelctedTab] = useState(0);
  const renderHeader = () => {
    return (
      <View
        style={{
          height: 120,
          backgroundColor: COLORS.primary,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.radius * 2,
            alignItems: "center",
            marginTop: SIZES.radius,
          }}
        >
          {/* Back Icon */}
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
          {/* Title */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}>
              Location
            </Text>
          </View>
          {/* {Empty View} */}
          <View style={{ width: 25 }} />
        </View>
      </View>
    );
  };
  const renderTopBarSection = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {/* NearBy */}
        <TabButton
          label="Nearby"
          onPress={() => setSelctedTab(0)}
          selected={selectedTab === 0}
          containerStyle={{
            width: 80,
          }}
        />
        {/* Previous */}
        <TabButton
          label="Previous"
          onPress={() => setSelctedTab(1)}
          selected={selectedTab === 1}
          containerStyle={{
            width: 100,
          }}
        />
        {/* Favourite */}
        <TabButton
          label="Favourite"
          onPress={() => setSelctedTab(2)}
          selected={selectedTab === 2}
          containerStyle={{
            width: 100,
          }}
        />
      </View>
    );
  };
  const renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          height: 50,
          borderRadius: 25,
          backgroundColor: COLORS.lightGreen2,
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 50,
            color: COLORS.black,
            ...FONTS.body3,
          }}
          placeholder="Enter your city, state or zip code"
          placeholderTextColor={COLORS.lightGray2}
        />
        <Image
          source={icons.search}
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.lightGray2,
          }}
        />
      </View>
    );
  };
  const renderLoactionList = () => {
    return (
      <FlatList
        style={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
        }}
        data={dummyData.locations}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Order", { selectedLocation: item })
              }
              style={{
                marginBottom: SIZES.radius,
                borderRadius: SIZES.radius * 2,
                backgroundColor: appTheme.cardBackgroundColor,
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
              }}
            >
              {/* Name & Bookmark */}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ flex: 1, color: appTheme.textColor, ...FONTS.h2 }}
                >
                  {item.title}
                </Text>
                <Image
                  source={
                    item.bookmarked ? icons.bookmarkFilled : icons.bookmark
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: item.bookmarked ? COLORS.red2 : COLORS.white,
                  }}
                />
              </View>
              {/* Address */}
              <View style={{ marginTop: SIZES.base, width: "80%" }}>
                <Text
                  style={{
                    color: appTheme.textColor,
                    ...FONTS.body3,
                    lineHeight: 21,
                  }}
                >
                  {item.address}
                </Text>
              </View>
              {/* Operation Hours */}
              <View
                style={{
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    color: appTheme.textColor,
                    ...FONTS.body5,
                    lineHeight: 16,
                  }}
                >
                  {item.operation_hours}
                </Text>
              </View>
              {/* Services */}
              <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
                <View
                  style={{
                    borderColor: appTheme.textColor,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                  }}
                >
                  <Text style={{ color: appTheme.textColor, ...FONTS.body3 }}>
                    Pick-Up
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: appTheme.textColor,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                    marginLeft: 5,
                  }}
                >
                  <Text style={{ color: appTheme.textColor, ...FONTS.body3 }}>
                    Delivery
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
          marginTop: -20,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          padding: SIZES.padding,
        }}
      >
        {renderTopBarSection()}
        {renderSearchBar()}
        {renderLoactionList()}
      </View>
    </View>
  );
};

export default Location;
