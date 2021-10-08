import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import MainLayout from "./MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { SIZES, COLORS, FONTS, icons, dummyData } from "../constants/index";
import { getHoldings, getCoinMarket } from "../stores/market/marketActions";
import { BalaceInfo, IconTextButton, Chart } from "../components";
const Home = () => {
  const { myHoldings, coins, error, loading } = useSelector(
    (state) => state.marketReducer
  );
  const [selectedCoin, setSelectedCoin] = useState(null);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldings(dummyData.holdings));
      dispatch(getCoinMarket());
    }, [])
  );

  let totalWallet = myHoldings?.reduce((a, b) => a + b.total || 0, 0);
  let valueChange = myHoldings?.reduce(
    (a, b) => a + b.holding_value_chnage_7d || 0,
    0
  );

  let percChange = (valueChange / (totalWallet - valueChange)) * 100;
  const renderWalletInfo = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/* Balance Info */}
        <BalaceInfo
          title="Your Wallet"
          displayAmount={totalWallet?.toFixed(2)}
          changePct={percChange}
          containerStyle={{
            marginTop: 50,
          }}
        />
        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            marginBottom: -15,
            marginTop: 30,
          }}
        >
          <IconTextButton
            lable="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
          />
          <IconTextButton
            lable="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              height: 40,
              flex: 1,
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header - Wallet Info */}
        {renderWalletInfo()}
        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrice={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }
        />
        {/* Top Cryptocurrency */}
        <FlatList
          data={coins}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h2, fontSize: 18 }}>
                Top Cryptocurrency
              </Text>
            </View>
          }
          ListFooterComponent={<View style={{ marginBottom: 50 }} />}
          renderItem={({ item, index }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 55,
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* LOGO */}
                <View style={{ width: 35 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                </View>
                {/* Name */}
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {item.name}
                  </Text>
                </View>
                {/* Figures */}
                <View>
                  <Text style={{ color: COLORS.white, textAlign: "right" }}>
                    ${item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
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
                        marginLeft: 5,
                        ...FONTS.body5,
                        lineHeight: 15,
                        color: priceColor,
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Home;
