import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import MainLayout from "./MainLayout";
import { HeaderBar } from "../components";
import { FONTS, COLORS, SIZES, dummyData, icons } from "../constants/index";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}
    >
      <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>{title}</Text>
    </View>
  );
};
const Setting = ({ title, value, type, onPress }) => {
  if (type === "button") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 50,
        }}
      >
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {value !== "" && (
            <Text
              style={{
                color: COLORS.lightGray3,
                marginRight: SIZES.radius,
                ...FONTS.h3,
              }}
            >
              {value}
            </Text>
          )}
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 50,
        }}
      >
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: COLORS.lightGreen }}
          thumbColor={"#ffffff"}
          value={value}
          onValueChange={(value) => onPress(value)}
        />
      </View>
    );
  }
};
const Profile = () => {
  const [faceID, setFaceId] = React.useState(true);
  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header */}
        <HeaderBar title="Profile" />
        {/* Details */}
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: SIZES.radius,
            paddingBottom: 150,
          }}
        >
          {/* Email-User ID */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
            }}
          >
            {/* Email & ID */}
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {dummyData.profile.email}
              </Text>
              <Text style={{ color: COLORS.lightGray3, ...FONTS.body4 }}>
                ID: {dummyData.profile.id}
              </Text>
            </View>
            {/* Status */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.verified}
                style={{ height: 25, width: 25 }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  ...FONTS.body4,
                  color: COLORS.lightGreen,
                }}
              >
                Verified
              </Text>
            </View>
          </View>
          {/* APP */}
          <SectionTitle title="APP" />
          <Setting
            onPress={() => {}}
            title={"Launch Screen"}
            value={"Home"}
            type={"button"}
          />
          <Setting
            onPress={() => {}}
            title={"Apparance"}
            value={"Dark"}
            type={"button"}
          />

          {/* Account */}
          <SectionTitle title="ACCOUNT" />
          <Setting
            onPress={() => {}}
            title={"Payment Screen"}
            value={"USD"}
            type={"button"}
          />
          <Setting
            onPress={() => {}}
            title={"Language"}
            value={"English"}
            type={"button"}
          />
          {/* Security */}
          <SectionTitle title="SECURITY" />
          <Setting
            title={"FaceID"}
            value={faceID}
            type={"switch"}
            onPress={(value) => setFaceId(value)}
          />
          <Setting
            onPress={() => {}}
            title={"Password Setting"}
            value={""}
            type={"button"}
          />
          <Setting
            onPress={() => {}}
            title={"Change Password"}
            value={""}
            type={"button"}
          />
          <Setting
            onPress={() => {}}
            title={"2-Factor Authentication"}
            value={""}
            type={"button"}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
