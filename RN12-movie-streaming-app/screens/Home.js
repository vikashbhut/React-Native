import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Profiles, ProgressBar } from "../components";

import { COLORS, dummyData, SIZES, FONTS, icons, images } from "../constants";

const Home = ({ navigation }) => {
  const newSeasonScrollX = useRef(new Animated.Value(0)).current;
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Profile */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
        >
          <Image
            source={images.profile_photo}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
        {/* Screen Mirror */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
        >
          <Image
            source={icons.airplay}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderNewSeasonSection = () => {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToInterval={SIZES.width}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        data={dummyData.newSeason}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: newSeasonScrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("MovieDetail", { selectedMovie: item })
              }
            >
              <View
                style={{
                  width: SIZES.width,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Thumbnail */}
                <ImageBackground
                  source={item.thumbnail}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 40 }}
                  style={{
                    width: SIZES.width * 0.85,
                    height: SIZES.width * 0.85,
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: 60,
                      width: "100%",
                      marginBottom: SIZES.radius,
                      paddingHorizontal: SIZES.radius,
                    }}
                  >
                    {/* Play Now */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: COLORS.transparentWhite,
                        }}
                      >
                        <Image
                          source={icons.play}
                          resizeMode="contain"
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.white,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginLeft: SIZES.base,
                          color: COLORS.white,
                          ...FONTS.h3,
                        }}
                      >
                        Play Now
                      </Text>
                    </View>
                    {/* Still Watching */}
                    {item.stillWatching.length > 0 && (
                      <View style={{ justifyContent: "center" }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                          Still Watching
                        </Text>
                        <Profiles profile={item.stillWatching} />
                      </View>
                    )}
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  };
  const renderDots = () => {
    const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {dummyData.newSeason.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: "clamp",
          });
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={{
                borderRadius: SIZES.radius,
                opacity,
                width: dotWidth,
                height: 6,
                marginHorizontal: 3,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };
  const renderContinueWatchingSection = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
            Continue Watching
          </Text>
          <Image
            source={icons.right_arrow}
            style={{ width: 20, height: 20, tintColor: COLORS.primary }}
          />
        </View>
        {/* List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
          }}
          data={dummyData.continueWatching}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  navigation.navigate("MovieDetail", {
                    selectedMovie: item,
                  });
                }}
              >
                <View
                  style={{
                    marginLeft: index === 0 ? SIZES.padding : 20,
                    marginRight:
                      index === dummyData.continueWatching.length - 1
                        ? SIZES.padding
                        : 0,
                  }}
                >
                  {/* Thumbnail  */}
                  <Image
                    source={item.thumbnail}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width / 3,
                      height: SIZES.width / 3 + 60,
                      borderRadius: 20,
                    }}
                  />
                  {/* name */}
                  <Text
                    style={{
                      marginTop: SIZES.base,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    {item.name}
                  </Text>
                  {/* Progressbar */}
                  <ProgressBar
                    containerStyle={{
                      marginTop: SIZES.radius,
                      borderRadius: 2,
                    }}
                    barPercentage={item.overallProgress}
                    barStyle={{ height: 3, borderRadius: 2 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      {renderHeader()}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {renderNewSeasonSection()}
        {renderDots()}
        {renderContinueWatchingSection()}
      </ScrollView>
    </View>
  );
};

export default Home;
