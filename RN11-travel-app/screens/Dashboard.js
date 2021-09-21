import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextButton } from "../components";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";

const COUNTRY_ITEM_SIZE = SIZES.width / 3;
const PLACE_ITEM_SIZE =
  Platform.OS === "ios" ? SIZES.width / 1.25 : SIZES.width / 1.2;
const EMPTY_ITEM_SIZE = (SIZES.width - PLACE_ITEM_SIZE) / 2;

const Dashboard = ({ navigation }) => {
  const [countries, setCountries] = useState([
    { id: -1 },
    ...dummyData.countries,
    { id: -2 },
  ]);
  const [places, setPlaces] = useState([
    { id: -1 },
    ...dummyData.countries[0].places,
    { id: -2 },
  ]);
  const countryScrollX = useRef(new Animated.Value(0)).current;
  const placeScrollX = useRef(new Animated.Value(0)).current;
  const [placesScrollPos, setPlacesScrollPos] = useState(0);
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
        }}
      >
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.side_drawer}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>ASIA</Text>
        </View>
        <TouchableOpacity>
          <Image
            style={{ width: 45, height: 45, borderRadius: 30 }}
            source={images.profile_pic}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderCountries = () => {
    return (
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={COUNTRY_ITEM_SIZE}
        data={countries}
        scrollEventThrottle={16}
        decelerationRate={0}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: countryScrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          let position = (
            event.nativeEvent.contentOffset.x / COUNTRY_ITEM_SIZE
          ).toFixed(0);
          setPlaces([
            { id: -1 },
            ...dummyData.countries[position].places,
            { id: -2 },
          ]);
        }}
        renderItem={({ item, index }) => {
          const opacity = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRY_ITEM_SIZE,
              (index - 1) * COUNTRY_ITEM_SIZE,
              index * COUNTRY_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const mapSize = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRY_ITEM_SIZE,
              (index - 1) * COUNTRY_ITEM_SIZE,
              index * COUNTRY_ITEM_SIZE,
            ],
            outputRange: [25, Platform.OS === "ios" ? 80 : 60, 25],
            extrapolate: "clamp",
          });
          const fontSize = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRY_ITEM_SIZE,
              (index - 1) * COUNTRY_ITEM_SIZE,
              index * COUNTRY_ITEM_SIZE,
            ],
            outputRange: [15, 25, 15],
            extrapolate: "clamp",
          });
          if (index === 0 || index === countries.length - 1) {
            return <View style={{ width: COUNTRY_ITEM_SIZE }} />;
          }
          return (
            <Animated.View
              style={{
                opacity,
                width: COUNTRY_ITEM_SIZE,
                height: 180,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.Image
                source={item.image}
                resizeMode="contain"
                style={{
                  height: mapSize,
                  width: mapSize,
                  tintColor: COLORS.white,
                }}
              />
              <Animated.Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h1,
                  fontSize,
                  marginTop: 5,
                }}
              >
                {item.name}
              </Animated.Text>
            </Animated.View>
          );
        }}
      />
    );
  };
  const renderPlaces = () => {
    const exploreButtonHandler = () => {
      const currnetIndex = parseInt(placesScrollPos, 10) + 1;
      navigation.navigate("Place", {
        selectedPlace: places[currnetIndex],
      });
    };
    return (
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        keyExtractor={(item) => `${item.id}`}
        bounces={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        data={places}
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          let position = (
            e.nativeEvent.contentOffset.x / PLACE_ITEM_SIZE
          ).toFixed(0);
          setPlacesScrollPos(position);
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        snapToInterval={
          Platform.OS === "ios" ? PLACE_ITEM_SIZE + 28 : PLACE_ITEM_SIZE
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: placeScrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const opacity = placeScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACE_ITEM_SIZE,
              (index - 1) * PLACE_ITEM_SIZE,
              index * PLACE_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          let activeHeight = 0;
          if (Platform.OS === "ios") {
            if (SIZES.height > 800) {
              activeHeight = SIZES.height / 2;
            } else {
              activeHeight = SIZES.height / 1.65;
            }
          } else {
            activeHeight = SIZES.height / 1.9;
          }
          const height = placeScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACE_ITEM_SIZE,
              (index - 1) * PLACE_ITEM_SIZE,
              index * PLACE_ITEM_SIZE,
            ],
            outputRange: [
              SIZES.height / 2.25,
              activeHeight,
              SIZES.height / 2.25,
            ],
            extrapolate: "clamp",
          });
          if (index === 0 || index === countries.length - 1) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          } else {
            return (
              <Animated.View
                style={{
                  height,
                  opacity,
                  width: PLACE_ITEM_SIZE,
                  alignItems: "center",
                  borderRadius: 20,
                  padding: 10,
                }}
              >
                <Animated.Image
                  source={item.image}
                  resizeMode="cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginHorizontal: SIZES.padding,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      marginBottom: SIZES.radius,
                      ...FONTS.h1,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white,
                      marginBottom: SIZES.padding * 2,
                      textAlign: "center",
                      ...FONTS.body3,
                    }}
                  >
                    {item.description}
                  </Text>
                  <TextButton
                    onPress={() => {
                      exploreButtonHandler();
                    }}
                    lable="Explore"
                    customContainerStyle={{
                      position: "absolute",
                      width: 150,
                      bottom: -20,
                    }}
                  ></TextButton>
                </View>
              </Animated.View>
            );
          }
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 40 : 0,
        }}
      >
        <View style={{ height: 700 }}>
          <View>{renderCountries()}</View>
          <View
            style={{
              height: Platform.OS === "ios" ? 500 : 450,
            }}
          >
            {renderPlaces()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
