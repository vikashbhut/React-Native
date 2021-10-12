import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import { SIZES, COLORS, FONTS, icons } from "../constants";
import LinearGradient from "react-native-linear-gradient";
const RecipeCardInfo = ({ recipeItem }) => {
  return (
    <LinearGradient
      style={styles.recipeCardContainer}
      colors={[COLORS.transparentBlack5, COLORS.transparentBlack9]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {/* Name & BookMark */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Text
          style={{
            width: "70%",
            color: COLORS.white,
            ...FONTS.h3,
            fontSize: 18,
          }}
        >
          {recipeItem.name}
        </Text>
        <Image
          source={recipeItem.isBookmark ? icons.bookmarkFilled : icons.bookmark}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.darkGreen,
          }}
        />
      </View>
      {/* Duration & Serving */}
      <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>
        {recipeItem.duration} | {recipeItem.serving} Serving
      </Text>
    </LinearGradient>
  );
};
export default function TrendingCard({ containerStyle, recipeItem, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 350,
        width: 250,
        marginTop: SIZES.radius,
        borderRadius: SIZES.radius,
        marginRight: SIZES.radius,
        ...containerStyle,
      }}
    >
      {/* Background Image  */}
      <Image
        source={recipeItem.image}
        resizeMode="cover"
        style={{
          width: 250,
          height: 350,
          borderRadius: SIZES.radius,
        }}
      />
      {/* Category */}
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 15,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 5,
          backgroundColor: COLORS.transparentGray,
          borderRadius: SIZES.radius,
        }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
          {recipeItem.category}
        </Text>
      </View>

      {/* Card Info */}
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recipeCardContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});
