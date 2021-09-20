import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants/index";

export default function TransactionHistory({ customContainerStyle, history }) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: SIZES.base,
        }}
      >
        <Image
          source={icons.transaction}
          style={{ width: 30, height: 30, tintColor: COLORS.primary }}
        />
        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h3 }}>{item.description}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
            {item.date}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: item.type === "B" ? COLORS.green : COLORS.black,
              ...FONTS.h3,
            }}
          >
            {item.amount} {item.currency}
          </Text>
          <Image
            source={icons.right_arrow}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.gray,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...customContainerStyle,
      }}
    >
      <Text style={{ ...FONTS.h2 }}>Transaction History</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: SIZES.radius }}
        scrollEnabled={false}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: COLORS.lightGray,
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
