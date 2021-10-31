import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
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
  TextIconButton,
  TextButton,
  LineDevider,
  Ratings,
  StepperInput,
  FooterTotal,
} from "../../components";

const FoodDetail = ({ navigation, route }) => {
  const [foodItem, setFoodItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  useEffect(() => {
    const { foodItem } = route.params;
    setFoodItem(foodItem);
  }, []);
  const renderHeader = () => {
    return (
      <Header
        title="Details"
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
              borderWidth: 1,
              borderRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              borderColor: COLORS.gray2,
            }}
          />
        }
        containerStyle={{
          marginHorizontal: SIZES.padding,
          height: 50,
          marginTop: 10,
          alignItems: "center",
        }}
        rightComponent={<CartQuantityBtn quantity={3} />}
      />
    );
  };

  const renderDetails = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
        }}
      >
        {/* Food Cart */}
        <View
          style={{
            height: 190,
            borderRadius: 15,
            backgroundColor: COLORS.lightGray2,
            padding: SIZES.radius,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.calories}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={{ color: COLORS.darkGray2, ...FONTS.body4 }}>
                {foodItem?.calories} Calories
              </Text>
            </View>
            <Image
              source={icons.love}
              style={{
                width: 20,
                height: 20,
                tintColor: foodItem?.isFavourite ? COLORS.primary : COLORS.gray,
              }}
            />
          </View>
          {/* Food Image */}
          <Image
            source={foodItem?.image}
            resizeMode="contain"
            style={{
              height: 170,
              width: "100%",
            }}
          />
        </View>
        {/* Food Info */}
        <View style={{ marginTop: SIZES.padding }}>
          {/* Name & Descriptio */}
          <Text style={{ ...FONTS.h1 }}>{foodItem?.name}</Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.darkGray,
              textAlign: "justify",
              ...FONTS.body3,
            }}
          >
            {foodItem?.description}
          </Text>

          {/* Rating, Duration & Shipping */}
          <View style={{ flexDirection: "row", marginTop: SIZES.padding }}>
            <TextIconButton
              disabled={true}
              icons={icons.star}
              iconPostion={"LEFT"}
              labelStyle={{
                color: COLORS.white,
                ...FONTS.body3,
              }}
              label={4.5}
              containerStyle={{
                backgroundColor: COLORS.primary,
                paddingHorizontal: SIZES.radius,
                paddingVertical: SIZES.base,
                borderRadius: SIZES.base,
              }}
            />
            <TextIconButton
              disabled={true}
              icons={icons.clock}
              iconPostion={"LEFT"}
              labelStyle={{
                color: COLORS.black,
                ...FONTS.body3,
              }}
              label={"30 Mins"}
              containerStyle={{
                backgroundColor: null,
                paddingVertical: SIZES.base,
                borderRadius: SIZES.base,
                marginLeft: SIZES.radius,
              }}
            />
            <TextIconButton
              disabled={true}
              iconPostion={"LEFT"}
              icons={icons.dollar}
              iconStyle={{
                tintColor: COLORS.black,
              }}
              containerStyle={{
                marginLeft: SIZES.radius,
              }}
              label="Free Shipping"
            />
          </View>
          {/* Sizes */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Sizes:</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginLeft: SIZES.padding,
              }}
            >
              {dummyData.sizes.map((item, index) => {
                return (
                  <TextButton
                    onPress={() => setSelectedSize(item.id)}
                    key={index}
                    lable={item.label}
                    labelStyle={{
                      color:
                        selectedSize === item.id ? COLORS.white : COLORS.gray2,
                      ...FONTS.body3,
                    }}
                    btnContainerStyle={{
                      width: 55,
                      height: 55,
                      margin: SIZES.base,
                      borderWidth: 1,
                      borderRadius: SIZES.radius,
                      borderColor:
                        selectedSize === item.id
                          ? COLORS.primary
                          : COLORS.gray2,
                      backgroundColor:
                        selectedSize === item.id ? COLORS.primary : null,
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderRestaurant = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        <Image
          source={images.profile}
          style={{
            width: 50,
            height: 50,
            borderRadius: SIZES.radius,
          }}
        />
        {/* Info */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: "center",
          }}
        >
          <Text style={{ ...FONTS.h3 }}>Lentils Lately</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
            1.2 KM away from you
          </Text>
        </View>
        {/* Ratings */}
        <View>
          <Ratings rating={4} iconStyle={{ marginLeft: 3 }} />
        </View>
      </View>
    );
  };

  const rederFooter = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
          height: 100,
          paddingBottom: SIZES.radius,
        }}
      >
        <StepperInput
          value={qty}
          onAdd={() => setQty(qty + 1)}
          onMinus={() => {
            if (qty > 1) {
              setQty(qty - 1);
            }
          }}
        />
        <TextButton
          btnContainerStyle={{
            flex: 1,
            flexDirection: "row",
            height: 60,
            marginLeft: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
          }}
          lable={"Buy Now"}
          lable2={"$15.99"}
          onPress={() => navigation.navigate("MyCart", { foodItem })}
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
      {/* Header */}
      {renderHeader()}
      {/* Body */}
      <ScrollView>
        {/* Food Detail */}
        {renderDetails()}
        <LineDevider />
        {/* Restaurant */}
        {renderRestaurant()}
      </ScrollView>
      {/* Footer */}
      <LineDevider />
      {rederFooter()}
    </View>
  );
};

export default FoodDetail;
