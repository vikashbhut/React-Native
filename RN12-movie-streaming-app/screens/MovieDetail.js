import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import { ProgressBar } from "../components";
import LinearGradient from "react-native-linear-gradient";

const MovieDetail = ({ navigation, route }) => {
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  React.useEffect(() => {
    const { selectedMovie } = route.params;
    setSelectedMovie(selectedMovie);
  }, []);
  const renderHeader = () => {
    return (
      <ImageBackground
        source={selectedMovie?.details?.image}
        resizeMode="cover"
        style={{
          width: SIZES.width,
          height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: SIZES.padding,
              alignItems: "center",
              marginTop: Platform.OS === "ios" ? 40 : 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.transparentWhite,
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 20,
              }}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={icons.left_arrow}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.transparentWhite,
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 20,
              }}
            >
              <Image
                source={icons.upload}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["transparent", "black"]}
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
                {selectedMovie?.details?.season}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  marginTop: SIZES.base,
                  ...FONTS.h1,
                }}
              >
                {selectedMovie?.name}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  };
  const renderCategoryAndRatings = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.base,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={[styles.categoryContainer, { marginLeft: 0 }]}>
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            {selectedMovie?.details?.age}
          </Text>
        </View>
        <View
          style={[
            styles.categoryContainer,
            { paddingHorizontal: SIZES.padding },
          ]}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            {selectedMovie?.details?.genre}
          </Text>
        </View>
        <View style={[styles.categoryContainer]}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text
            style={{ color: COLORS.white, marginLeft: SIZES.base, ...FONTS.h4 }}
          >
            {selectedMovie?.details?.ratings}
          </Text>
        </View>
      </View>
    );
  };

  const renderMovieDetails = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          justifyContent: "space-around",
        }}
      >
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
              {selectedMovie?.details?.currentEpisode}
            </Text>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>
              {selectedMovie?.details?.runningTime}
            </Text>
          </View>
          <ProgressBar
            containerStyle={{ marginTop: SIZES.radius }}
            barStyle={{
              height: 5,
              borderRadius: 3,
            }}
            barPercentage={selectedMovie?.details?.progress}
          />
        </View>
        <TouchableOpacity
          style={{
            marginTop: SIZES.base,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
            borderRadius: 15,
            marginBottom: SIZES.padding * 2,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
            {selectedMovie?.details?.progress === 0
              ? "Watch Now"
              : "Continue Watch"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView
      style={{ backgroundColor: COLORS.black }}
      contentContainerStyle={{ flex: 1, backgroundColor: COLORS.black }}
    >
      {renderHeader()}
      {renderCategoryAndRatings()}
      {renderMovieDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
});

export default MovieDetail;
