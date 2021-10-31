import React, { useState } from "react";
import { View, Text, ScrollView, Platform, Image } from "react-native";
import {
  FONTS,
  SIZES,
  COLORS,
  icons,
  dummyData,
  images,
} from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Header,
  IconButton,
  FormInput,
  CardItem,
  FooterTotal,
} from "../../components";
const Checkout = ({ navigation, route }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  React.useEffect(() => {
    const { selectedCard } = route?.params;
    setSelectedCard(selectedCard);
  }, []);
  const renederHeader = () => {
    return (
      <Header
        title="CHECKOUT"
        rightComponent={<View style={{ width: 40, height: 40 }} />}
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
  const renderMyCards = () => {
    return (
      <View>
        {selectedCard !== null &&
          dummyData.myCards.map((item, index) => {
            return (
              <CardItem
                key={index}
                item={item}
                isSelected={
                  `${selectedCard?.key}-${selectedCard?.id}` ===
                  `MyCard-${item.id}`
                }
                onPress={() => setSelectedCard({ ...item, key: `MyCard` })}
              />
            );
          })}
      </View>
    );
  };
  const renderDeliveryAddress = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3 }}>Delivery Address</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.radius,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderWidth: 1,
            borderColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
          }}
        >
          <Image
            source={icons.location1}
            style={{
              width: 40,
              height: 40,
              tintColor: COLORS.black,
            }}
          />
          <Text
            style={{ marginLeft: SIZES.radius, ...FONTS.body3, width: "85%" }}
          >
            Rajkot-360003 , Gujrat
          </Text>
        </View>
      </View>
    );
  };
  const renderCoupon = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3 }}>Add Coupon</Text>
        <FormInput
          inputContainerStyle={{
            paddingRight: 0,
            overflow: "hidden",
            paddingLeft: SIZES.padding,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            borderWidth: 2,
            borderColor: COLORS.lightGray2,
            marginTop: 0,
          }}
          appendComponent={
            <View
              style={{
                width: 60,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
              }}
            >
              <Image
                source={icons.discount}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
          }
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {renederHeader()}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        enableOnAndroid={true}
        extraHeight={130}
        extraScrollHeight={130}
        enableAutomaticScroll={Platform.OS === "ios"}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 20,
        }}
      >
        {/* My Card */}
        {renderMyCards()}
        {/* Delivery Address */}
        {renderDeliveryAddress()}
        {/* Coupon */}
        {renderCoupon()}
      </KeyboardAwareScrollView>
      <FooterTotal
        subTotal={37.97}
        total={37.97}
        shippingFee={0}
        onPress={() => navigation.replace("Success")}
      />
    </View>
  );
};

export default Checkout;
