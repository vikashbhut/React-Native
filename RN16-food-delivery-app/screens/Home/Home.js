import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants/index";
import {
  HorizontalFoodCard,
  VerticalFoodCard,
  FilterModal,
} from "../../components";
import { useNavigation } from "@react-navigation/native";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginBottom: 20,
          marginTop: 30,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity>
          <Text style={{ ...FONTS.body3, color: COLORS.primary }}>
            Show All
          </Text>
        </TouchableOpacity>
      </View>
      {/* Content */}
      {children}
    </View>
  );
};

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const [selectedMenutype, setSelectedMenutype] = useState(1);

  const [menuList, setMenuList] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [populars, setPopulars] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenutype);
  }, []);

  const handleChangeCategory = (categoryId, menuTypeId) => {
    //Retrive recommended menu
    let selectedRecommended = dummyData.menu.find(
      (a) => a.name === "Recommended"
    );
    //Retrive popular menu
    let selcetedPopular = dummyData.menu.find((a) => a.name === "Popular");
    //Find the menu based on menuTypeId
    let selectedMenu = dummyData.menu.find((a) => a.id === menuTypeId);
    //Set the popular menu based on the category Id
    setPopulars(
      selcetedPopular?.list.filter((a) => a.categories.includes(categoryId))
    );
    //Set the recommended menu based on the category Id
    setRecommends(
      selectedRecommended?.list.filter((a) => a.categories.includes(categoryId))
    );
    //Set menu based on categoryId
    setMenuList(
      selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
    );
  };
  const renderSearch = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: SIZES.base,
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          padding: SIZES.radius,
        }}
      >
        {/* Icon */}
        <Image
          source={icons.search}
          resizeMode="contain"
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />
        {/* TextInput */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
            paddingVertical: 2,
          }}
          placeholder="search food..."
        />
        {/* FilterButton */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{ height: 20, width: 20, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderMenuTypes = () => {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginBottom: 20,
          marginTop: 30,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedMenutype(item.id);
                handleChangeCategory(selectedCategoryId, item.id);
              }}
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index === dummyData.menu.length - 1 ? SIZES.padding : 0,
              }}
            >
              <Text
                style={{
                  color:
                    selectedMenutype === item.id
                      ? COLORS.primary
                      : COLORS.black,
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderRecommendedSection = () => {
    return (
      <Section title="Recommended" onPress={() => {}}>
        <FlatList
          data={recommends}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <HorizontalFoodCard
                item={item}
                onPress={() =>
                  navigation.navigate("FoodDetail", { foodItem: item })
                }
                imageStyle={{
                  width: 150,
                  height: 150,
                  marginTop: 35,
                }}
                containerStyle={{
                  height: 180,
                  paddingRight: SIZES.radius,
                  width: SIZES.width * 0.85,
                  backgroundColor: COLORS.lightGray2,
                  marginLeft: index === 0 ? SIZES.padding : 18,
                  marginRight:
                    index === recommends.length - 1 ? SIZES.padding : 0,
                }}
              />
            );
          }}
        />
      </Section>
    );
  };
  const renderPopularSection = () => {
    return (
      <Section title="Popular Near You" onPress={() => {}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={populars}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <VerticalFoodCard
                containerStyle={{
                  marginLeft: index === 0 ? SIZES.padding : 18,
                  marginRight:
                    index === populars.length - 1 ? SIZES.padding : 0,
                }}
                item={item}
                onPress={() =>
                  navigation.navigate("FoodDetail", { foodItem: item })
                }
              />
            );
          }}
        />
      </Section>
    );
  };
  const renderFoodCategories = () => {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategoryId(item.id);
                handleChangeCategory(item.id, selectedMenutype);
              }}
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                borderRadius: SIZES.radius,
                backgroundColor:
                  selectedCategoryId === item.id
                    ? COLORS.primary
                    : COLORS.lightGray2,
                marginTop: SIZES.padding,
                marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index === dummyData.categories.length - 1 ? SIZES.padding : 0,
              }}
            >
              <Image
                source={item.icon}
                style={{
                  marginTop: 5,
                  height: 50,
                  width: 50,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  marginRight: SIZES.base,
                  color:
                    selectedCategoryId === item.id
                      ? COLORS.white
                      : COLORS.darkGray,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  const renderDeliveryTo = () => {
    return (
      <View
        style={{ marginHorizontal: SIZES.padding, marginTop: SIZES.padding }}
      >
        <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
          DELIVERY TO
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>{dummyData.myProfile.address}</Text>
          <Image
            source={icons.down_arrow}
            style={{ marginLeft: SIZES.base, width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* SearchBar */}
      {renderSearch()}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}
      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View
            style={{
              height: 200,
            }}
          />
        }
        ListHeaderComponent={
          <View>
            {renderDeliveryTo()}
            {renderFoodCategories()}
            {renderPopularSection()}
            {renderRecommendedSection()}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 110,
              }}
              containerStyle={{
                height: 130,
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              item={item}
              onPress={() =>
                navigation.navigate("FoodDetail", { foodItem: item })
              }
            />
          );
        }}
      />
    </View>
  );
};

export default Home;
