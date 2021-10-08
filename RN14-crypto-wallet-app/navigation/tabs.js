import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabIcon } from "../components";
import { Home, Portfolio, Market, Profile } from "../screens";
import { COLORS, icons } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setTradeModalVisibility } from "../stores/tab/tabActions";
const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {children}
    </TouchableOpacity>
  );
};
const Tabs = () => {
  const dispatch = useDispatch();
  const isTradeModalVisible = useSelector(
    (state) => state.tabReducers.isTradeModalVisibal
  );

  const tradeTabButtonOnClickHandler = () => {
    dispatch(setTradeModalVisibility(!isTradeModalVisible));
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: COLORS.primary,
          height: 140,
          borderTopColor: "transparent",
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case "Home":
              if (!isTradeModalVisible)
                return (
                  <TabIcon focused={focused} icon={icons.home} label={"Home"} />
                );
              else return <></>;
            case "Portfolio":
              if (!isTradeModalVisible)
                return (
                  <TabIcon
                    focused={focused}
                    icon={icons.briefcase}
                    label={"Portfolio"}
                  />
                );
              else return <></>;
            case "Trade":
              return (
                <TabIcon
                  focused={focused}
                  icon={isTradeModalVisible ? icons.close : icons.trade}
                  label={"Trade"}
                  iconStyle={
                    isTradeModalVisible ? { width: 15, height: 15 } : {}
                  }
                  isTrade={true}
                />
              );
            case "Market":
              if (!isTradeModalVisible)
                return (
                  <TabIcon
                    focused={focused}
                    icon={icons.market}
                    label={"Market"}
                  />
                );
              else return <></>;

            case "Profile":
              if (!isTradeModalVisible)
                return (
                  <TabIcon
                    focused={focused}
                    icon={icons.profile}
                    label={"Profile"}
                  />
                );
              else return <></>;
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
              onPress={tradeTabButtonOnClickHandler}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
