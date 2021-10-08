import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Tabs from "./navigation/tabs";
import rootReducer from "./stores/rootReducer";
import { COLORS } from "./constants";
const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));
const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.black} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"MainLayout"}
        >
          <Stack.Screen name="MainLayout" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
