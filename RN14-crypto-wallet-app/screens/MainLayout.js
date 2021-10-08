import React, { useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { COLORS, SIZES, icons } from "../constants";
import { IconTextButton } from "../components";
import { useSelector } from "react-redux";
export default function MainLayout({ children }) {
  const isTradeModalVisible = useSelector(
    (state) => state.tabReducers.isTradeModalVisibal
  );
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });
  return (
    <View style={{ flex: 1 }}>
      {children}
      {/* Dim Background */}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            top: 0,
            backgroundColor: COLORS.transparentBlack,
            opacity: modalAnimatedValue,
          }}
        />
      )}
      {/* Modal */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          top: modalY,
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton lable="Transfer" icon={icons.send} />
        <IconTextButton
          lable="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            marginTop: SIZES.base,
          }}
        />
      </Animated.View>
    </View>
  );
}
