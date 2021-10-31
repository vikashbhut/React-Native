import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants/index";
import {
  IconButton,
  TwoPointSlieder,
  TextButton,
  TextIconButton,
} from "../components";
import constants from "../constants/constants";

const Section = ({ containerStyle, title, children }) => {
  return (
    <View style={{ marginTop: SIZES.padding, ...containerStyle }}>
      <Text style={{ ...FONTS.h3 }}>{title}</Text>
      {children}
    </View>
  );
};

export default function FilterModal({ isVisible, onClose }) {
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [deliveryTime, setdeliveryTime] = useState("");
  const [ratings, setratinge] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });
  const renderDistance = () => {
    return (
      <Section title="Distance">
        <View style={{ alignItems: "center" }}>
          <TwoPointSlieder
            value={[3, 10]}
            min={1}
            max={20}
            postfix="km"
            onValuesChange={(value) => console.log(value)}
          />
        </View>
      </Section>
    );
  };
  const renderDeliveryTime = () => {
    return (
      <Section
        title="Delivery Time"
        containerStyle={{
          marginTop: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: SIZES.radius,
          }}
        >
          {constants.delivery_time.map((item, index) => {
            return (
              <TextButton
                key={index}
                onPress={() => setdeliveryTime(item.id)}
                btnContainerStyle={{
                  width: "30%",
                  height: 50,
                  margin: 5,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id === deliveryTime
                      ? COLORS.primary
                      : COLORS.lightGray2,
                }}
                lable={item.label}
                labelStyle={{
                  color: item.id === deliveryTime ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
              />
            );
          })}
        </View>
      </Section>
    );
  };

  const renderPricingRange = () => {
    return (
      <Section title="Pricing Range">
        <View style={{ alignItems: "center" }}>
          <TwoPointSlieder
            value={[10, 20]}
            min={1}
            max={100}
            prefix={"$"}
            postfix={""}
            onValuesChange={(values) => console.log(values)}
          />
        </View>
      </Section>
    );
  };

  const renderRatings = () => {
    return (
      <Section
        title="Ratings"
        containerStyle={{
          marginTop: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: SIZES.base,
          }}
        >
          {constants.ratings.map((item, index) => {
            return (
              <TextIconButton
                onPress={() => setratinge(item.id)}
                key={index}
                icons={icons.star}
                iconStyle={{
                  tintColor: item.id === ratings ? COLORS.white : COLORS.gray,
                }}
                labelStyle={{
                  color: item.id === ratings ? COLORS.white : COLORS.gray,
                }}
                containerStyle={{
                  flex: 1,
                  height: 50,
                  margin: 5,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id === ratings ? COLORS.primary : COLORS.lightGray2,
                }}
                label={item.label}
              ></TextIconButton>
            );
          })}
        </View>
      </Section>
    );
  };
  const renderTags = () => {
    return (
      <Section title="Tags">
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: SIZES.base,
          }}
        >
          {constants.tags.map((item, index) => {
            return (
              <TextButton
                onPress={() => setTags(item.id)}
                key={index}
                labelStyle={{
                  color: item.id === tags ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
                btnContainerStyle={{
                  width: "30%",
                  height: 50,
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id === tags ? COLORS.primary : COLORS.lightGray2,
                  margin: 5,
                }}
                lable={item.label}
              />
            );
          })}
        </View>
      </Section>
    );
  };
  return (
    <Modal isVisible={isVisible} animationType="fade" transparent={true}>
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        {/* Transparent Background */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: "100%",
            right: 0,
            top: modalY,
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
            opacity: modalY,
          }}
        >
          {/* Header Section */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
              Filter Your Search
            </Text>
            <IconButton
              onPress={() => setShowFilterModal(false)}
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}
          >
            {renderDistance()}
            {renderDeliveryTime()}
            {renderPricingRange()}
            {renderRatings()}
            {renderTags()}
            <View style={{ marginTop: SIZES.radius }}>
              <TextButton
                lable="Apply Filters"
                btnContainerStyle={{
                  height: 50,
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.radius,
                }}
              />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
