import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import {
  Header,
  IconButton,
  LineDevider,
  TextButton,
  TextIconButton,
} from "../../components";
import { FONTS, COLORS, SIZES, icons, constants } from "../../constants/index";

const DeliveryStatus = ({ navigation }) => {
  const [currentState, setCurrentState] = useState(2);
  const renderHeader = () => {
    return (
      <Header
        title="DELIVERY STATUS"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 10,
        }}
      />
    );
  };
  const renderInfo = () => {
    return (
      <View style={{ marginTop: SIZES.radius }}>
        <Text
          style={{ textAlign: "center", color: COLORS.gray, ...FONTS.body4 }}
        >
          Estimated Delivery
        </Text>
        <Text style={{ textAlign: "center", ...FONTS.h2 }}>
          21 Dec 2021 / 12:30PM
        </Text>
      </View>
    );
  };

  const renderTrackOrder = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.lightGray2,
          backgroundColor: COLORS.white2,
        }}
      >
        {/* Track Order */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>Track Order</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>NY012345</Text>
        </View>

        <LineDevider lineStyle={{ backgroundColor: COLORS.lightGray2 }} />
        {/* Status */}
        <View
          style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}
        >
          {constants.track_order_status.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: -5,
                  }}
                >
                  <Image
                    source={icons.check_circle}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor:
                        index <= currentState
                          ? COLORS.primary
                          : COLORS.lightGray1,
                    }}
                  />
                  <View style={{ marginLeft: SIZES.radius }}>
                    <Text style={{ ...FONTS.h3 }}>{item.title}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                      {item.sub_title}
                    </Text>
                  </View>
                </View>
                {index < constants.track_order_status.length - 1 && (
                  <View>
                    {index < currentState && (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          backgroundColor: COLORS.primary,
                          marginLeft: 18,
                          zIndex: -1,
                        }}
                      />
                    )}
                    {index >= currentState && (
                      <Image
                        source={icons.dotted_line}
                        resizeMode="cover"
                        style={{
                          height: 50,
                          width: 4,
                          marginLeft: 17,
                        }}
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View style={{ marginTop: SIZES.radius, marginBottom: SIZES.padding }}>
        {currentState < constants.track_order_status.length - 1 && (
          <View style={{ flexDirection: "row", height: 55 }}>
            <TextButton
              onPress={() => navigation.navigate("FoodDetail")}
              lable="Cancel"
              btnContainerStyle={{
                width: "40%",
                backgroundColor: COLORS.lightGray2,
                borderRadius: SIZES.base,
              }}
              labelStyle={{
                color: COLORS.primary,
              }}
            />
            <TextIconButton
              icons={icons.map}
              containerStyle={{
                flex: 1,
                marginLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              iconPostion={"LEFT"}
              label={"Map View"}
              labelStyle={{ ...FONTS.h3, color: COLORS.white }}
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.padding,
      }}
    >
      {/* Header */}
      {renderHeader()}
      {/* Info */}
      {renderInfo()}
      {/* TripOrder */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderTrackOrder()}
      </ScrollView>
      {renderFooter()}
    </View>
  );
};

export default DeliveryStatus;
