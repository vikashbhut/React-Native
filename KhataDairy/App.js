/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/**
 * My workaround issue on RN 0.62.2 + react-native-material-textfield 0.16.1
I fixed the error by edit code in node_modules/react-native-material-textfield.

import { Animated } => import { Animated,Text } in all /index.js
Animated.Text.propTypes.style => Text.propTypes.style in all /index.js
 */

import React from 'react';
import {LogBox, Text, View, Image,StatusBar} from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import khatabook from './src/store/reducers/khatabook';
import NavigationContainer from './src/navigation/navigator';
import {useNetInfo} from '@react-native-community/netinfo';
import colors from './src/constants/colors';

LogBox.ignoreAllLogs(true);
const rootReducer = combineReducers({khatabook});
const store = createStore(rootReducer);

const App = () => {
  const netInfo = useNetInfo();
  if (!netInfo.isConnected) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('./src/assets/images/nointernet.png')}
          resizeMode="contain"
          style={{
            width: 240,
            height: 240,
          }}
        />
        <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 24}}>
          No Internet Connection
        </Text>
      </View>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
