import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CategoryCard, TrendingCard } from "../components";
import { FONTS, COLORS, images, icons, SIZES, dummyData } from "../constants";

const HEADER_HEIGHT = 350;

const Viewers = ({ viewersList }) => {
  if (viewersList?.length === 0) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
          Be the first one to try this
        </Text>
      </View>
    );
  } else if (viewersList?.length <= 4) {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          {viewersList?.map((item, index) => {
            return (
              <Image
                key={index}
                source={item.profilePic}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginLeft: index > 0 ? -20 : 0,
                }}
              />
            );
          })}
        </View>
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
            textAlign: "right",
            lineHeight: 15,
          }}
        >
          {viewersList?.length} Pelople
        </Text>
        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: "right",
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          Already Try this.
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          {viewersList?.map((item, index) => {
            if (index <= 2) {
              return (
                <Image
                  key={index}
                  source={item.profilePic}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginLeft: index > 0 ? -20 : 0,
                  }}
                />
              );
            } else if (index === 3) {
              return (
                <View
                  key={index}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginLeft: -20,
                    backgroundColor: COLORS.darkGreen,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
                    +{viewersList?.length - 3}
                  </Text>
                </View>
              );
            }
          })}
        </View>
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
            textAlign: "right",
            lineHeight: 15,
          }}
        >
          {viewersList?.length} Pelople
        </Text>
        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: "right",
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          Already Try this.
        </Text>
      </View>
    );
  }
};
const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
  return (
    <LinearGradient
      style={{ flex: 1, borderRadius: SIZES.radius }}
      colors={[COLORS.transparentBlack5, COLORS.transparentBlack7]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View
        style={{
          alignItems: "center",
          flex: 1,
          flexDirection: "row",
        }}
      >
        {/* Profile Photo */}
        <View
          style={{
            width: 40,
            height: 40,
            marginLeft: 20,
          }}
        >
          <Image
            source={selectedRecipe?.author?.profilePic}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </View>
        {/* Label */}
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
            Recipe by:
          </Text>
          <Text style={{ color: COLORS.white2, ...FONTS.h3 }}>
            {selectedRecipe?.author?.name}
          </Text>
        </View>
        {/* Button */}
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: COLORS.lightGreen1,
          }}
        >
          <Image
            source={icons.rightArrow}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.lightGreen1,
            }}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const Recipe = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);
  const renderHeader = () => {
    return (
      <View
        style={{
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Animated.Image
          source={selectedRecipe?.image}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: "200%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />
        {/* Recipe Creator Card */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            height: 80,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 170, 250],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
        </Animated.View>
      </View>
    );
  };

  const renderRecipeInfo = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 130,
          width: SIZES.width,
          paddingHorizontal: 30,
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
        {/* RecipeName */}
        <View style={{ flex: 1.5, justifyContent: "center" }}>
          <Text style={{ ...FONTS.h2 }}>{selectedRecipe?.name}</Text>
          <Text
            style={{ marginTop: 5, color: COLORS.lightGray2, ...FONTS.body4 }}
          >
            {selectedRecipe?.duration} | {selectedRecipe?.serving} Serving
          </Text>
        </View>
        {/* Viewers */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Viewers viewersList={selectedRecipe?.viewers} />
        </View>
      </View>
    );
  };

  const renderHeaderBar = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 70,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
        }}
      >
        {/* Screen OverLay */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />

        {/* {HeaderBar Title} */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 10,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
          }}
        >
          <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
            Recipe By:
          </Text>
          <Text style={{ ...FONTS.h3, color: COLORS.white2 }}>
            {selectedRecipe?.author?.name}
          </Text>
        </Animated.View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.transparentBlack5,
          }}
        >
          <Image
            source={icons.back}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.lightGray,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
          }}
        >
          <Image
            source={
              selectedRecipe?.isBookMark ? icons.bookmarkFilled : icons.bookmark
            }
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.darkGreen,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderIngredientHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          marginBottom: SIZES.padding,
        }}
      >
        <Text style={{ ...FONTS.h3, flex: 1 }}>Ingredients</Text>
        <Text style={{ ...FONTS.body4, color: COLORS.lightGray2 }}>
          {selectedRecipe?.ingredients?.length} Items
        </Text>
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
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}
            {/* Info */}
            {renderRecipeInfo()}
            {/* Ingredient Title */}
            {renderIngredientHeader()}
          </View>
        }
        scrollEventThrottle={16}
        ListFooterComponent={<View style={{ marginBottom: 1000 }} />}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 30,
                marginVertical: 5,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  width: 50,
                  borderRadius: 5,
                  backgroundColor: COLORS.lightGray,
                }}
              >
                <Image source={item.icon} style={{ height: 40, width: 40 }} />
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  justifyContent: "center",
                }}
              >
                <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
              </View>
              <View
                style={{ justifyContent: "center", alignItems: "flex-end" }}
              >
                <Text style={{ ...FONTS.body3 }}>{item.quantity}</Text>
              </View>
            </View>
          );
        }}
      />
      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;
