import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import MainLayout from "./MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { SIZES, FONTS, COLORS, icons, dummyData } from "../constants";
import { useFocusEffect } from "@react-navigation/native";
import { getHoldings } from "../stores/market/marketActions";
import { BalaceInfo, Chart } from "../components";
const Portfolio = () => {
  const { myHoldings, coins, error, loading } = useSelector(
    (state) => state.marketReducer
  );
  const [selectedHolding, setSelectedHolding] = useState(null);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldings(dummyData.holdings));
    }, [])
  );
  let totalWallet = myHoldings?.reduce((a, b) => a + b.total || 0, 0);
  let valueChange = myHoldings?.reduce(
    (a, b) => a + b.holding_value_chnage_7d || 0,
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  const renderCurrentBalanceSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.lightGray,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      >
        <Text
          style={{ marginTop: 20, color: COLORS.white, ...FONTS.largeTitle }}
        >
          Portfolio
        </Text>
        <BalaceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.radius,
          }}
        />
      </View>
    );
  };

  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header - Current Balance */}
        {renderCurrentBalanceSection()}
        {/* Chart */}
        <Chart
          containerStyle={{ marginTop: SIZES.radius }}
          chartPrice={
            selectedHolding
              ? selectedHolding.sparkline_in_7d.value
              : myHoldings[0]?.sparkline_in_7d?.value
          }
        />
        {/* Your Assets */}
        <FlatList
          data={myHoldings}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                Your Assets
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                }}
              >
                <Text
                  style={{ color: COLORS.lightGray3, ...FONTS.body4, flex: 1 }}
                >
                  Asset
                </Text>
                <Text
                  style={{
                    color: COLORS.lightGray3,
                    ...FONTS.body4,
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    color: COLORS.lightGray3,
                    ...FONTS.body4,
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({ item, index }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                onPress={() => setSelectedHolding(item)}
                style={{
                  flexDirection: "row",
                  height: 55,
                }}
              >
                {/* Asset */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text
                    style={{ color: COLORS.white, marginLeft: 5, ...FONTS.h4 }}
                  >
                    {item.name}
                  </Text>
                </View>
                {/* price */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      textAlign: "right",
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}
                  >
                    ${item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alinItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        color: priceColor,
                        marginLeft: 5,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}
                    >
                      %
                      {Number(
                        item.price_change_percentage_7d_in_currency
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>
                {/* Holding */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}
                  >
                    ${Number(item.total).toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.lightGray3,
                      textAlign: "right",
                      ...FONTS.body5,
                      lineHeight: 15,
                    }}
                  >
                    {item.qty} {item.symbol}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Portfolio;
