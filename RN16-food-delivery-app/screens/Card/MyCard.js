import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  FONTS,
  SIZES,
  COLORS,
  icons,
  dummyData,
  images,
} from "../../constants";
import { Header, IconButton, TextButton, CardItem } from "../../components";

const MyCard = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const renderHeader = () => {
    return (
      <Header
        title="MY CARDS"
        rightComponent={<View style={{ width: 40, height: 40 }} />}
        leftComponent={
          <IconButton
            onPress={() => navigation.goBack()}
            icon={icons.back}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            containerStyle={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
          />
        }
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 10,
        }}
      />
    );
  };
  const renderMyCards = () => {
    return (
      <View>
        {dummyData.myCards.map((item, index) => {
          return (
            <CardItem
              key={index}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ===
                `MyCard-${item.id}`
              }
              item={item}
              onPress={() => setSelectedCard({ ...item, key: "MyCard" })}
            />
          );
        })}
      </View>
    );
  };
  const renderAddNewCards = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3 }}>Add new card</Text>
        {dummyData.allCards.map((item, index) => {
          return (
            <CardItem
              key={index}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ===
                `NewCard-${item.id}`
              }
              item={item}
              onPress={() => setSelectedCard({ ...item, key: "NewCard" })}
            />
          );
        })}
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding,
          paddingTop: SIZES.radius,
        }}
      >
        <TextButton
          onPress={() => {
            if (selectedCard?.key === "NewCard") {
              navigation.navigate("AddCard", { selectedCard });
            } else {
              navigation.navigate("Checkout", { selectedCard });
            }
          }}
          disabled={selectedCard === null}
          lable={selectedCard?.key === "NewCard" ? "Add" : "Place Your Order"}
          btnContainerStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor:
              selectedCard === null
                ? COLORS.transparentPrimary
                : COLORS.primary,
          }}
        />
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
      {/* Header */}
      {renderHeader()}
      {/* Cards */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding,
        }}
      >
        {/* My Card */}
        {renderMyCards()}
        {/* Add new card */}
        {renderAddNewCards()}
      </ScrollView>
      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default MyCard;
