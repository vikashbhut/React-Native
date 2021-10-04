import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FONTS, icons, SIZES, dummyData, COLORS } from "../constants/index";
import { IconButton } from "../components";
import { useSelector } from "react-redux";
const OrderDetail = ({ navigation, route }) => {
  const appTheme = useSelector((state) => state.appTheme);
  const [selectedItem, setSelctedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(32);
  const [selectedMilkIndex, setSelectedMilkIndex] = useState(0);
  const [selectedSweetnessLevel, setSelectedSweetnessLevel] = useState(0);
  useEffect(() => {
    const { selectedItem } = route.params;
    setSelctedItem(selectedItem);
  }, []);

  const sweetnessLevelButtonHandler = (action) => {
    console.log(selectedSweetnessLevel);
    if (action === "next" && selectedSweetnessLevel < 100) {
      setSelectedSweetnessLevel(selectedSweetnessLevel + 25);
    } else if (action === "prev" && selectedSweetnessLevel > 0) {
      setSelectedSweetnessLevel(selectedSweetnessLevel - 25);
    }
  };
  const milkButtonHandler = (action) => {
    if (
      action === "next" &&
      selectedMilkIndex < dummyData.milkList.length - 1
    ) {
      setSelectedMilkIndex(selectedMilkIndex + 1);
    } else if (action === "prev" && selectedMilkIndex > 0) {
      setSelectedMilkIndex(selectedMilkIndex - 1);
    }
  };

  const renderHeaderSection = () => {
    return (
      <View
        style={{
          width: "100%",
          height: "55%",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 40,
            right: 0,
            borderBottomLeftRadius: 100,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={selectedItem?.thumbnail}
            resizeMode="contain"
            style={{
              width: SIZES.width * 0.7,
              height: SIZES.width * 0.7,
            }}
          />
        </View>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={icons.leftArrow}
          containerStyle={{
            position: "absolute",
            left: 20,
            top: 45,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.black,
            padding: 10,
          }}
        />
      </View>
    );
  };
  const renderDetailSection = () => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
          justifyContent: "space-between",
          paddingHorizontal: 30,
        }}
      >
        {/* Name And Description */}
        <View>
          <Text
            style={{ color: appTheme.headerColor, ...FONTS.h1, fontSize: 25 }}
          >
            {selectedItem?.name}
          </Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: appTheme.textColor,
              ...FONTS.body3,
            }}
          >
            {selectedItem?.description}
          </Text>
        </View>
        {/* SIZE */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.radius,
          }}
        >
          {/* Label */}
          <Text
            style={{
              flex: 1,
              color: appTheme.headerColor,
              ...FONTS.h2,
              fontSize: 20,
            }}
          >
            Pick A Size
          </Text>
          {/* Cup */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setSelectedSize(20)}
              style={{
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 80,
                  height: 80,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                imageStyle={{
                  tintColor:
                    selectedSize === 20 ? COLORS.primary : COLORS.gray2,
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                  20oz
                </Text>
              </ImageBackground>
              <Text
                style={{ marginTop: 3, color: COLORS.white, ...FONTS.body3 }}
              >
                $4.50
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedSize(32)}
              style={{ alignItems: "center", justifyContent: "flex-end" }}
            >
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 100,
                  height: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                imageStyle={{
                  tintColor:
                    selectedSize === 32 ? COLORS.primary : COLORS.gray2,
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                  32oz
                </Text>
              </ImageBackground>
              <Text
                style={{ marginTop: 3, color: COLORS.white, ...FONTS.body3 }}
              >
                $5.00
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Milk,Sweetness and Ice */}
        <View style={{ flexDirection: "row", marginTop: SIZES.padding }}>
          {/* Milk */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{ color: appTheme.headerColor, ...FONTS.h2, fontSize: 20 }}
            >
              {dummyData.milkList[selectedMilkIndex].name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: 100,
                height: 100,
                marginTop: SIZES.base,
                alignItems: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
            >
              <IconButton
                onPress={() => milkButtonHandler("prev")}
                icon={icons.leftArrow}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.black,
                }}
                containerStyle={{
                  marginLeft: -15,
                  width: 25,
                  height: 25,
                  borderRadius: 3,
                  backgroundColor: COLORS.white,
                  zIndex: 1,
                }}
              />
              <Image
                source={dummyData.milkList[selectedMilkIndex].image}
                resizeMode="contain"
                style={{
                  tintColor: COLORS.white,
                  flex: 1,
                  width: 70,
                  height: 70,
                }}
              />
              <IconButton
                onPress={() => milkButtonHandler("next")}
                icon={icons.rightArrow}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.black,
                }}
                containerStyle={{
                  marginRight: -15,
                  width: 25,
                  height: 25,
                  borderRadius: 3,
                  backgroundColor: COLORS.white,
                  zIndex: 1,
                }}
              />
            </View>
            <Text
              style={{
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.body3,
              }}
            >
              {dummyData.milkList[selectedMilkIndex].name}
            </Text>
          </View>
          {/* Sweetness & Ice */}
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            {/* Milk */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                  color: appTheme.headerColor,
                  ...FONTS.h2,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Sweetness
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 60,
                  backgroundColor: COLORS.primary,
                  borderRadius: 15,
                }}
              >
                <IconButton
                  icon={icons.leftArrow}
                  onPress={() => sweetnessLevelButtonHandler("prev")}
                  containerStyle={{
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white,
                    marginLeft: -8,
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {selectedSweetnessLevel}%
                  </Text>
                </View>
                <IconButton
                  icon={icons.rightArrow}
                  onPress={() => sweetnessLevelButtonHandler("next")}
                  containerStyle={{
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white,
                    marginRight: -8,
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black,
                  }}
                />
              </View>
            </View>
            {/* Ice */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                  color: appTheme.headerColor,
                  ...FONTS.h2,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Ice
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 60,
                  backgroundColor: COLORS.primary,
                  borderRadius: 15,
                }}
              >
                <IconButton
                  icon={icons.leftArrow}
                  onPress={() => sweetnessLevelButtonHandler("prev")}
                  containerStyle={{
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white,
                    marginLeft: -8,
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>15%</Text>
                </View>
                <IconButton
                  icon={icons.rightArrow}
                  onPress={() => sweetnessLevelButtonHandler("next")}
                  containerStyle={{
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white,
                    marginRight: -8,
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: appTheme.backgroundColor }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 150,
          flex: 1,
        }}
      >
        {/* Header */}
        {renderHeaderSection()}
        {/* Detail */}
        {renderDetailSection()}
      </ScrollView>
    </View>
  );
};

export default OrderDetail;
