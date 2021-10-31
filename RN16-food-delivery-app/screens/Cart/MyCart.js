import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  FONTS,
  SIZES,
  COLORS,
  icons,
  dummyData,
  images,
} from "../../constants";
import {
  Header,
  IconButton,
  CartQuantityBtn,
  StepperInput,
  FooterTotal,
} from "../../components";
import { SwipeListView } from "react-native-swipe-list-view";

const MyCart = ({ navigation }) => {
  const [myCartList, setMyCartList] = useState(dummyData.myCart);

  const updateQtyHandler = (newQty, id) => {
    const newMyCartList = myCartList
      .concat()
      .map((item, index) => (item.id === id ? { ...item, qty: newQty } : item));
    setMyCartList(newMyCartList);
  };

  const removeMyCartHandler = (id) => {
    const newMyCartList = myCartList.concat().filter((item) => item.id !== id);
    setMyCartList(newMyCartList);
  };
  const renderHeader = () => {
    return (
      <Header
        title="MY CART"
        rightComponent={<CartQuantityBtn quantity={3} />}
        leftComponent={
          <IconButton
            onPress={() => navigation.goBack()}
            icon={icons.back}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            containerStyle={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
          />
        }
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 10,
        }}
      />
    );
  };
  const renderCartList = () => {
    return (
      <SwipeListView
        data={myCartList}
        keyExtractor={(item) => `${item?.id}`}
        disableRightSwipe={true}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingBottom: SIZES.padding * 2,
          paddingHorizontal: SIZES.padding,
        }}
        rightOpenValue={-70}
        renderItem={(data, rowMap) => (
          <View
            style={{
              height: 100,
              backgroundColor: COLORS.lightGray2,
              ...styles.cartItemContainer,
            }}
          >
            <View style={{ width: 90, height: 100, marginLeft: -10 }}>
              <Image
                source={data?.item?.image}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 10,
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...FONTS.body3 }}>{data?.item?.name}</Text>
              <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
                ${data?.item?.price}
              </Text>
            </View>
            <StepperInput
              containerStyle={{
                backgroundColor: COLORS.white,
                width: 125,
                height: 50,
              }}
              value={data?.item?.qty}
              onAdd={() =>
                updateQtyHandler(data?.item?.qty + 1, data?.item?.id)
              }
              onMinus={() => {
                if (data.item.qty > 1) {
                  updateQtyHandler(data?.item?.qty - 1, data?.item?.id);
                }
              }}
            />
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <IconButton
            onPress={() => removeMyCartHandler(data.item.id)}
            icon={icons.delete_icon}
            iconStyle={{ marginRight: 20 }}
            containerStyle={{
              backgroundColor: COLORS.primary,
              flex: 1,
              borderRadius: SIZES.radius,
              marginTop: SIZES.radius,
              justifyContent: "flex-end",
              flexDirection: "row",
              alignItems: "center",
            }}
          />
        )}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Header */}
      {renderHeader()}
      {/* Cart List */}
      {renderCartList()}
      {/* Footer */}
      <FooterTotal
        subTotal={37.97}
        shippingFee={0.0}
        total={37.97}
        onPress={() => navigation.navigate("MyCard")}
      />
    </View>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});
