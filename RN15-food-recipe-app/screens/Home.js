import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StatusBar,
} from "react-native";
import { CategoryCard, TrendingCard } from "../components";
import { FONTS, COLORS, images, icons, SIZES, dummyData } from "../constants";

const Home = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          alignItems: "center",
          height: 80,
        }}
      >
        {/* Text */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: COLORS.darkGreen, ...FONTS.h2 }}>
            Hello Vikas,
          </Text>
          <Text style={{ marginTop: 3, color: COLORS.gray, ...FONTS.body3 }}>
            What you want to cook today?
          </Text>
        </View>
        {/* ProfileImage */}
        <TouchableOpacity>
          <Image
            source={images.profile}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderSearchBar = () => {
    return (
      <View
        style={{
          borderRadius: 10,
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray,
        }}
      >
        <Image
          source={icons.search}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.gray,
          }}
        />
        <TextInput
          style={{
            marginLeft: SIZES.radius,
            ...FONTS.body3,
            flex: 1,
          }}
          placeholder="Search"
          placeholderTextColor={COLORS.gray}
        />
      </View>
    );
  };
  const renderSeeRecipeCard = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          backgroundColor: COLORS.lightGreen,
          borderRadius: 10,
        }}
      >
        <View
          style={{ width: 100, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={images.recipe}
            style={{
              width: 80,
              height: 80,
            }}
          />
        </View>
        <View style={{ flex: 1, paddingVertical: SIZES.radius }}>
          <Text style={{ ...FONTS.body4, width: "70%" }}>
            You have 12 recipes that you haven't tried yet.
          </Text>
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text
              style={{
                color: COLORS.darkGreen,
                textDecorationLine: "underline",
                ...FONTS.h4,
              }}
            >
              See Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderTrendingSection = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>
          Trending Recipe
        </Text>
        <FlatList
          horizontal
          data={dummyData.trendingRecipes}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TrendingCard
                key={index}
                recipeItem={item}
                onPress={() => navigation.navigate("Recipe", { recipe: item })}
                containerStyle={{
                  marginLeft: index === 0 ? SIZES.padding : 0,
                }}
              />
            );
          }}
        />
      </View>
    );
  };
  const renderCategoryHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h2 }}>Categories</Text>
        <TouchableOpacity>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}
            {/* SearchBar */}
            {renderSearchBar()}
            {/* See Recipe Card */}
            {renderSeeRecipeCard()}
            {/* Trending */}
            {renderTrendingSection()}
            {/* Category Header */}
            {renderCategoryHeader()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <CategoryCard
              categoryItem={item}
              onPress={() => navigation.navigate("Recipe", { recipe: item })}
              key={index}
              containerStyle={{
                marginHorizontal: SIZES.padding,
              }}
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 100,
            }}
          />
        }
      />
    </View>
  );
};

export default Home;
