import React, { useEffect, useState, useRef } from "react";
import { View, Text, ImageBackground, Image, Animated } from "react-native";
import { COLORS, SIZES, FONTS, images, icons } from "../constants";
import { Rating, HeaderBar, TextIconButton, TextButton } from "../components";
import SlidingUpPanel from "rn-sliding-up-panel";
import { FlatList } from "react-native-gesture-handler";
const Place = ({ navigation, route }) => {
  const [selectedPlace, setSelctedPlace] = useState(null);
  const _panel = React.useRef(null);
  useEffect(() => {
    const { selectedPlace } = route.params;
    setSelctedPlace(selectedPlace);
  }, []);

  const renderPlace = () => {
    return (
      <ImageBackground
        source={selectedPlace?.image}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <HeaderBar
          title=""
          containerStyle={{ marginTop: SIZES.padding }}
          leftOnPressed={() => navigation.goBack()}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.padding,
            justifyContent: "flex-end",
            marginBottom: 100,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...FONTS.largeTitle, color: COLORS.white }}>
              {selectedPlace?.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ color: COLORS.white, ...FONTS.h3, marginRight: 5 }}
              >
                {selectedPlace?.rate}
              </Text>
              <Image source={icons.star} style={{ width: 20, height: 20 }} />
            </View>
          </View>
          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.white,
              ...FONTS.body3,
            }}
          >
            {selectedPlace?.description}
          </Text>
          <TextIconButton
            customContainerStyle={{ marginTop: SIZES.padding }}
            icon={icons.aeroplane}
            label="Book a Flight"
          />
        </View>
      </ImageBackground>
    );
  };
  const renderMap = () => {
    return (
      <SlidingUpPanel
        ref={_panel}
        showBackdrop={false}
        height={SIZES.height + 120}
        friction={0.7}
        snappingPoints={[SIZES.height + 120]}
        draggableRange={{ top: SIZES.height + 120, bottom: 120 }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: 120,
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.up_arrow}
              style={{ width: 20, height: 20, tintColor: COLORS.white }}
            />
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              SWIPE FOR DETAILS
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.black,
            }}
          >
            <HeaderBar
              containerStyle={{ marginTop: SIZES.base }}
              title={`Hotels in ${selectedPlace?.name}`}
              right={true}
              leftOnPressed={() => _panel.current.hide()}
            />
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: SIZES.padding,
                marginTop: SIZES.padding,
              }}
              ListFooterComponent={() => <View style={{ marginBottom: 20 }} />}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      padding: SIZES.radius,
                      borderRadius: 15,
                      marginBottom: SIZES.radius,
                    }}
                  >
                    <Image
                      source={item?.image}
                      resizeMode="cover"
                      style={{
                        width: 90,
                        height: 120,
                        borderRadius: 15,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                        {item.name}
                      </Text>
                      <Rating
                        rate={item.rate}
                        containerStyle={{ marginTop: SIZES.base }}
                      />
                      <View
                        style={{ flexDirection: "row", marginTop: SIZES.base }}
                      >
                        <TextButton
                          lable="Details"
                          customLableStyle={{
                            ...FONTS.h3,
                          }}
                          customContainerStyle={{
                            width: 100,
                            height: 45,
                            marginTop: SIZES.base,
                          }}
                        />
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-end",
                          }}
                        >
                          <Text
                            style={{ color: COLORS.lightGray, ...FONTS.body5 }}
                          >
                            from $ {item.price} / night
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
              data={selectedPlace?.hotels}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        </View>
      </SlidingUpPanel>
    );
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {renderPlace()}
      {renderMap()}
    </View>
  );
};

export default Place;
