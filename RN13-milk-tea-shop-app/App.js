import React from "react";
import { Location, Order, OrderDetail } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import themeReducer from "./store/themeReducers";
import Tabs from "./navigation/tabs";
import { COLORS } from "./constants";

const Stack = createStackNavigator();
const store = createStore(themeReducer, applyMiddleware(thunk));
const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar hidden />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={"Home"}
          >
            <Stack.Screen name="Home" component={Tabs} />

            <Stack.Screen name="Location" component={Location} />

            <Stack.Screen name="Order" component={Order} />

            <Stack.Screen name="OrderDetail" component={OrderDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
