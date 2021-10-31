import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  FONTS,
  SIZES,
  COLORS,
  icons,
  dummyData,
  images,
} from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Header,
  IconButton,
  FormInputCheck,
  FormInput,
  RadioButton,
  TextButton,
} from "../../components";
import { utils } from "../../utils";

const AddCard = ({ navigation, route }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const [cardNumberError, setCardNumberError] = useState("");
  const [cardHolderNameError, setCardHolderNameError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [cvvError, setCvvError] = useState("");

  const isEnableAddCard = () =>
    cardNumber !== "" &&
    cardHolderName !== "" &&
    expiryDate !== "" &&
    cvv !== "" &&
    cardNumberError === "" &&
    cardHolderNameError === "" &&
    expiryDateError === "" &&
    cvvError === "";
  React.useEffect(() => {
    const { selectedCard } = route?.params;
    setSelectedCard(selectedCard);
  }, []);
  const renderHeader = () => {
    return (
      <Header
        title="ADD NEW CARD"
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
  const renderCard = () => {
    return (
      <ImageBackground
        source={images.card}
        style={{
          height: 200,
          width: "100%",
          borderRadius: SIZES.radius,
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <Image
          source={selectedCard?.icon}
          resizeMode="contain"
          style={{
            width: 40,
            height: 40,
            top: 20,
            right: 20,
            position: "absolute",
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
            {cardHolderName}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1, ...FONTS.body3, color: COLORS.white }}>
              {cardNumber}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
              {expiryDate}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TextButton
          disabled={!isEnableAddCard()}
          onPress={() => navigation.goBack()}
          lable="Add Card"
          btnContainerStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableAddCard()
              ? COLORS.primary
              : COLORS.transparentPrimary,
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
      {/* Body */}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        enableOnAndroid={true}
        extraHeight={130}
        extraScrollHeight={130}
        enableAutomaticScroll={Platform.OS === "ios"}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Card */}
        {renderCard()}
        {/* Form */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <FormInput
            label="Card Number"
            keyboardtype="number-pad"
            value={cardNumber}
            onChange={(value) => {
              setCardNumber(
                value
                  .replace(/\s/g, "")
                  .replace(/(\d{4})/g, "$1 ")
                  .trim()
              );
              utils.validateInput(value, 19, setCardNumberError);
            }}
            errorMsg={cardNumberError}
            appendComponent={
              <FormInputCheck value={cardNumber} error={cardNumberError} />
            }
          />

          <FormInput
            label="Card Holder Name"
            value={cardHolderName}
            containerStyle={{ marginTop: SIZES.radius }}
            onChange={(value) => {
              utils.validateInput(value, 4, setCardHolderNameError);
              setCardHolderName(value);
            }}
            errorMsg={cardHolderNameError}
            appendComponent={
              <FormInputCheck
                value={cardHolderName}
                error={cardHolderNameError}
              />
            }
          />

          <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
            <FormInput
              label="Expiry Date"
              placeHolder="MM/YY"
              value={expiryDate}
              maxLength={5}
              containerStyle={{
                flex: 1,
              }}
              onChange={(value) => {
                utils.validateInput(value, 5, setExpiryDateError);
                setExpiryDate(value);
              }}
              appendComponent={
                <FormInputCheck value={expiryDate} error={expiryDateError} />
              }
            />
            <FormInput
              label="CVV"
              value={cvv}
              maxLength={3}
              containerStyle={{
                flex: 1,
                marginLeft: SIZES.radius,
              }}
              onChange={(value) => {
                utils.validateInput(value, 3, setCvvError);
                setCvv(value);
              }}
              appendComponent={<FormInputCheck value={cvv} error={cvvError} />}
            />
          </View>
          <View style={{ marginTop: SIZES.padding, alignItems: "flex-start" }}>
            <RadioButton
              lable={"Remember this card details."}
              isSelected={isRemember}
              onPress={() => setIsRemember(!isRemember)}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {renderFooter()}
    </View>
  );
};

export default AddCard;
