import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import MainLayout from "./MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { getCoinMarket } from "../stores/market/marketActions";
import { useFocusEffect } from "@react-navigation/native";
import { constants, COLORS, FONTS, icons, SIZES } from "../constants/index";
import { HeaderBar, TextButton } from "../components";
import { LineChart } from "react-native-chart-kit";
const marketTabs = constants.marketTabs.map((marketTab) => {
  return {
    ...marketTab,
    ref: React.createRef(),
  };
});

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = marketTabs.map((_, index) => index * SIZES.width);
  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((item) => item.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((item) => item.x),
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        width: tabIndicatorWidth,
        transform: [{ translateX }],
        height: "100%",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray3,
      }}
    />
  );
};
const Tab = ({ onTabButtonPress, scrollX }) => {
  const containerRef = useRef();
  const [measureLayout, setMeasureLayout] = useState([]);

  useEffect(() => {
    let ml = [];
    marketTabs.forEach((marketTab) => {
      marketTab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({ x, y, width, height });
          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View style={{ flexDirection: "row" }} ref={containerRef}>
      {measureLayout.length > 0 && (
        <TabIndicator scrollX={scrollX} measureLayout={measureLayout} />
      )}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => onTabButtonPress(index)}
            key={index}
            style={{
              flex: 1,
            }}
          >
            <View
              ref={item.ref}
              style={{
                height: 40,
                paddingHorizontal: SIZES.padding,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const Market = () => {
  const { myHoldings, coins, error, loading } = useSelector(
    (state) => state.marketReducer
  );
  const [selectedCoin, setSelectedCoin] = useState(null);
  const dispatch = useDispatch();
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef();

  const onTabButtonPress = useCallback((tabIndex) => {
    listRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    });
  }, []);
  useFocusEffect(
    useCallback(() => {
      dispatch(getCoinMarket());
    }, [])
  );
  const renderTabBar = () => {
    return (
      <View
        style={{
          marginHorizontal: SIZES.radius,
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tab onTabButtonPress={onTabButtonPress} scrollX={scrollX} />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton label={"USD"} />
        <TextButton
          label={"% (7d)"}
          containerStyle={{ marginLeft: SIZES.base }}
        />
        <TextButton label={"Top"} containerStyle={{ marginLeft: SIZES.base }} />
      </View>
    );
  };
  const renderList = () => {
    return (
      <Animated.FlatList
        data={marketTabs}
        ref={listRef}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEnabled
        scrollEventThrottle={16}
        decelerationRate={0}
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}
            >
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency === 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}
                    >
                      {/* Coin */}
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{ height: 10, width: 10 }}
                        />
                        <Text
                          style={{
                            ...FONTS.h3,
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      {/* Chart */}
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withOuterLines={false}
                          withVerticalLines={false}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{ paddingRight: 0 }}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                        />
                      </View>
                      {/* Figure */}
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "flex-end",
                        }}
                      >
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                          ${item.current_price}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {item.price_change_percentage_7d_in_currency !==
                            0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                height: 10,
                                width: 10,
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency >
                                  0
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
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  };
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* HeaderBar */}
        <HeaderBar title={"Market"} />
        {/* TabBar */}
        {renderTabBar()}
        {/* Buttons */}
        {renderButtons()}
        {/* MarketList */}
        {renderList()}
      </View>
    </MainLayout>
  );
};

export default Market;
