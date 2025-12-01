import React from 'react';
import {Modal,View,ActivityIndicator} from 'react-native';
import colors from '../constants/colors';

const LoadingIndicator = ({visible=false}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="none">
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <ActivityIndicator size={'large'} color={colors.headerColor}/>
      </View>
      </Modal>
  );
};

export default LoadingIndicator;
