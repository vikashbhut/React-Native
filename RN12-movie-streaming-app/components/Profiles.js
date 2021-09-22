import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

export default function Profiles({ profile }) {
  if (profile.length <= 3) {
    return (
      <View style={styles.container}>
        {profile.map((item, index) => (
          <Image
            key={index}
            resizeMode="cover"
            source={item.profile}
            style={[
              styles.profileImage,
              { marginLeft: index === 0 ? null : -15 },
            ]}
          />
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {profile.map((item, index) => {
          if (index <= 2) {
            return (
              <Image
                key={index}
                resizeMode="cover"
                source={item.profile}
                style={[
                  styles.profileImage,
                  { marginLeft: index === 0 ? null : -15 },
                ]}
              />
            );
          }
        })}
        <Text
          style={{
            color: COLORS.white,
            marginLeft: SIZES.base,
            ...FONTS.body3,
          }}
        >
          +{profile.length - 3}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.black,
  },
});
