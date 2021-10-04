import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { HeaderBar } from "../components";
import { useSelector } from "react-redux";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  images,
  dummyData,
  constants,
} from "../constants";
import { CustomButton } from "../components";

const promoTabs = constants.promoTabs.map((promotabs) => ({
  ...promotabs,
  ref: React.createRef(),
}));
const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = promoTabs.map((_, index) => index * SIZES.width);
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
        height: "100%",
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        transform: [{ translateX }],
      }}
    ></Animated.View>
  );
};
const Tabs = ({ appTheme, scrollX, onPromTabPress }) => {
  const containerRef = useRef();
  const [measureLayout, setMeasureLayout] = useState([]);
  const tabPosition = Animated.divide(scrollX, SIZES.width);

  React.useEffect(() => {
    let ml = [];
    promoTabs.forEach((promo, index) => {
      promo.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({ x, y, width, height });
          if (promoTabs.length - 1 === index) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);
  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: SIZES.radius,
        backgroundColor: appTheme.tabBackgroundColor,
        marginTop: SIZES.padding,
      }}
    >
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {/* Tabs */}
      {promoTabs.map((item, index) => {
        const textColor = tabPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.lightGray2, COLORS.white, COLORS.lightGray2],
          extrapolate: "clamp",
        });
        return (
          <TouchableOpacity
            key={`PromoTab-${index}`}
            onPress={() => onPromTabPress(index)}
          >
            <View
              ref={item.ref}
              style={{
                height: 40,
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.Text style={{ color: textColor, ...FONTS.h3 }}>
                {item.title}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Home = ({ navigation }) => {
  const state = useSelector((state) => state);
  const scrollX = useRef(new Animated.Value(0)).current;
  const promoListRef = useRef();

  const onPromTabPress = React.useCallback((promoTabIndex) => {
    promoListRef?.current?.scrollToOffset({
      offset: promoTabIndex * SIZES.width,
    });
  }, []);
  const renderAvailableRewards = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Rewards")}
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          height: 100,
        }}
      >
        {/* Reward Cup */}
        <View
          style={{
            width: 100,
            height: "100%",
            backgroundColor: COLORS.pink,
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        >
          <ImageBackground
            source={icons.reward_cup}
            resizeMode="contain"
            style={{
              width: 85,
              height: 85,
              marginLeft: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.transparentBlack,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>280</Text>
            </View>
          </ImageBackground>
        </View>
        {/* Reward Details */}
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightPink,
            marginLeft: -10,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.primary, ...FONTS.h2, fontSize: 20 }}>
            Available Rewards
          </Text>
          <View
            style={{
              backgroundColor: COLORS.primary,
              marginTop: 5,
              padding: SIZES.base,
              borderRadius: SIZES.radius * 2,
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
              150 points - $2.50 off
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderPromoDeals = () => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* Header - Tabs */}
        <Tabs
          appTheme={state.appTheme}
          scrollX={scrollX}
          onPromTabPress={onPromTabPress}
        />
        {/* Details */}
        <Animated.FlatList
          ref={promoListRef}
          horizontal
          data={dummyData.promos}
          snapToAlignment={"center"}
          scrollEventThrottle={16}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={SIZES.width}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingTop: SIZES.padding,
                  width: SIZES.width,
                }}
              >
                {/* image */}
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={{
                    width: "100%",
                  }}
                />
                {/* name */}
                <Text style={{ color: COLORS.red, ...FONTS.h1, fontSize: 27 }}>
                  {item.name}
                </Text>
                {/* description */}
                <Text
                  style={{
                    marginTop: 3,
                    color: state.appTheme.textColor,
                    ...FONTS.body4,
                  }}
                >
                  {item.description}
                </Text>
                {/* calories */}
                <Text
                  style={{
                    marginTop: 3,
                    color: state.appTheme.textColor,
                    ...FONTS.body4,
                  }}
                >
                  Calories : {item.calories}
                </Text>
                {/* button */}
                <CustomButton
                  label="Order Now"
                  isPrimary={true}
                  labelStyle={{ ...FONTS.h3 }}
                  containerStyle={{
                    marginTop: 10,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.base,
                    borderRadius: SIZES.radius * 2,
                  }}
                  onPress={() => navigation.navigate("Location")}
                />
              </View>
            );
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderBar />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.secondary,
          marginTop: -48,
          borderTopLeftRadius: SIZES.radius * 4,
          borderTopRightRadius: SIZES.radius * 4,
          backgroundColor: state.appTheme.backgroundColor,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        {/* Rewards */}
        {renderAvailableRewards()}
        {/* Promo */}
        {renderPromoDeals()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
