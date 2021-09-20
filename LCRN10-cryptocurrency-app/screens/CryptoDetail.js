import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import {
  CurrencyLabel,
  HeaderBar,
  TextButton,
  PriceAlert,
} from "../components";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
} from "victory-native";
import { VictoryCustomTheme } from "../styles";
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";

const CryptoDetail = ({ navigation, route }) => {
  const [selectedCurrecy, setSelectedCurrency] = React.useState(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const numberOfCharts = [1, 2, 3];

  const [chartOptions, setChartOptions] = React.useState(
    dummyData.chartOptions
  );
  const [selectedOptions, setSelectedOptions] = React.useState(
    dummyData.chartOptions[0]
  );

  React.useEffect(() => {
    const { currency } = route.params;
    setSelectedCurrency(currency);
  }, []);
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          height: 30,
          marginTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {numberOfCharts.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });
            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                style={{
                  opacity,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };
  const renderChart = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            marginTop: SIZES.padding,
          }}
        >
          <View style={{ flex: 1 }}>
            <CurrencyLabel
              icon={selectedCurrecy?.image}
              currency={selectedCurrecy?.currency}
              code={selectedCurrecy?.code}
            />
          </View>
          <View>
            <Text style={{ ...FONTS.h3 }}>${selectedCurrecy?.amount}</Text>
            <Text
              style={{
                ...FONTS.body3,
                color:
                  selectedCurrecy?.type === "I" ? COLORS.green : COLORS.red,
              }}
            >
              {selectedCurrecy?.changes}
            </Text>
          </View>
        </View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        >
          {numberOfCharts.map((item, index) => (
            <View key={index} style={{ marginLeft: SIZES.base }}>
              <View style={{ marginTop: -25 }}>
                <VictoryChart
                  theme={VictoryCustomTheme}
                  height={220}
                  width={SIZES.width - 40}
                >
                  <VictoryLine
                    style={{
                      data: {
                        stroke: COLORS.secondary,
                      },
                      parent: {
                        border: "1px solid #ccc",
                      },
                    }}
                    data={selectedCurrecy?.chartData}
                    categories={{
                      x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                      y: ["15", "30", "45"],
                    }}
                  />
                  <VictoryScatter
                    data={selectedCurrecy?.chartData}
                    size={7}
                    style={{
                      data: {
                        fill: COLORS.secondary,
                      },
                    }}
                  />
                  <VictoryAxis
                    style={{
                      grid: {
                        stroke: "transparent",
                      },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    style={{
                      grid: {
                        stroke: "grey",
                      },
                      axis: {
                        stroke: "transparent",
                      },
                    }}
                  />
                </VictoryChart>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {chartOptions.map((item, index) => {
            return (
              <TextButton
                onPress={() => setSelectedOptions(item)}
                key={index}
                lable={item.label}
                customLabelStyle={{
                  color:
                    selectedOptions.id === item.id ? COLORS.white : COLORS.gray,
                  ...FONTS.body5,
                }}
                customContainerStyle={{
                  height: 30,
                  width: 60,
                  borderRadius: 15,
                  backgroundColor:
                    selectedOptions.id === item.id
                      ? COLORS.primary
                      : COLORS.lightGray,
                }}
              />
            );
          })}
        </View>
        {renderDots()}
      </View>
    );
  };
  const renderBuy = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          padding: SIZES.radius,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: SIZES.radius,
          }}
        >
          <View style={{ flex: 1 }}>
            <CurrencyLabel
              icon={selectedCurrecy?.image}
              currency={`${selectedCurrecy?.currency} Wallet`}
              code={selectedCurrecy?.code}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: SIZES.base }}>
              <Text style={{ ...FONTS.h3 }}>
                {selectedCurrecy?.wallet.value}
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  color: COLORS.gray,
                  ...FONTS.body4,
                }}
              >
                {selectedCurrecy?.wallet.crypto}
                {selectedCurrecy?.code}
              </Text>
            </View>
            <Image
              source={icons.right_arrow}
              resizeMode="cover"
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.gray,
              }}
            />
          </View>
        </View>
        <TextButton
          lable={"Buy"}
          onPress={() =>
            navigation.navigate("Transaction", { currency: selectedCurrecy })
          }
        />
      </View>
    );
  };
  const renderAbout = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          padding: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>{selectedCurrecy?.currency}</Text>
        <Text style={{ marginTop: SIZES.base, ...FONTS.body3 }}>
          {selectedCurrecy?.description}
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
      <HeaderBar right={true} />
      <ScrollView>
        <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
          {renderChart()}
          {renderBuy()}
          {renderAbout()}
          <PriceAlert
            customContainerStyle={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.radius,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default CryptoDetail;
