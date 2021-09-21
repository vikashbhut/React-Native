import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import { FONTS, SIZES, icons, COLORS } from "../constants/index";
import {
  HeaderBar,
  CurrencyLabel,
  TransactionHistory,
  TextButton,
} from "../components";

const Transaction = ({ navigation, route }) => {
  const [selectedCurrecy, setSelectedCurrency] = React.useState(null);
  React.useEffect(() => {
    const { currency } = route.params;
    setSelectedCurrency(currency);
  }, []);

  const renderTrade = () => {
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
        <CurrencyLabel
          icon={selectedCurrecy?.image}
          currency={selectedCurrecy?.currency}
          code={selectedCurrecy?.code}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.h2 }}>
            {selectedCurrecy?.wallet.crypto} {selectedCurrecy?.code}
          </Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
            {selectedCurrecy?.wallet.value}
          </Text>
        </View>
        <TextButton lable="Trade"></TextButton>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
      <HeaderBar />
      <ScrollView>
        <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
          {renderTrade()}
          <TransactionHistory
            customContainerStyle={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.radius,
            }}
            history={selectedCurrecy?.transactionHistory}
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

export default Transaction;
