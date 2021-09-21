import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  LogBox,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PriceAlert, TransactionHistory } from "../components";
import {
  dummyData,
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
} from "../constants/index";

const Home = ({ navigation }) => {
  const [trending, setTrending] = React.useState(dummyData.trendingCurrencies);
  const [transactionHistory, setTransactionHistory] = React.useState(
    dummyData.transactionHistory
  );
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  const renderHeader = () => {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CryptoDetail", { currency: item })
          }
          style={{
            width: 180,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            marginRight: SIZES.base,
            marginLeft: index === 0 ? SIZES.padding : 0,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={item.image}
                resizeMode="cover"
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ marginLeft: SIZES.base }}>
              <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                {item.code}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: SIZES.radius }}>
            <Text style={{ ...FONTS.h2 }}>{item.amount}</Text>
            <Text
              style={{
                color: item.type === "I" ? COLORS.green : COLORS.red,
                ...FONTS.h3,
              }}
            >
              {item.changes}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          width: "100%",
          height: 290,
          ...styles.shadow,
        }}
      >
        <ImageBackground
          source={images.banner}
          resizeMode="cover"
          style={{ flex: 1, alignItems: "center" }}
        >
          <View
            style={{
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              alignSelf: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              Your Portfolio Balance
            </Text>
            <Text
              style={{
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.h1,
              }}
            >
              ${dummyData.portfolio.balance}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
              {dummyData.portfolio.changes} Last 24 Hours
            </Text>
          </View>
          <View style={{ position: "absolute", bottom: "-30%" }}>
            <Text
              style={{
                marginLeft: SIZES.padding,
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
              Trending
            </Text>
            <FlatList
              contentContainerStyle={{ marginTop: SIZES.base }}
              data={trending}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderAlert = () => <PriceAlert />;

  const renderNotice = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.secondary,
          ...styles.shadow,
        }}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>
          Investing Sefty
        </Text>
        <Text
          style={{
            marginTop: SIZES.base,
            color: COLORS.white,
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          It's very difficult to time an investment,espescially when the market
          is volatile.Learn how to use dollar cost averaging to your advantage.
        </Text>
        <TouchableOpacity style={{ marginTop: SIZES.base }}>
          <Text
            style={{
              textDecorationLine: "underline",
              color: COLORS.green,
              ...FONTS.h3,
            }}
          >
            Learn More
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderTransactionHistory = () => {
    return (
      <TransactionHistory
        customContainerStyle={{ ...styles.shadow }}
        history={transactionHistory}
      />
    );
  };
  return (
    <ScrollView>
      <View style={{ flex: 1, paddingBottom: 130 }}>
        {renderHeader()}
        {renderAlert()}
        {renderNotice()}
        {renderTransactionHistory()}
      </View>
    </ScrollView>
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

export default Home;
