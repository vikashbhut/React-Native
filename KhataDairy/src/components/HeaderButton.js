import Icon from 'react-native-vector-icons/Entypo';
import React from 'react';
import colors from '../constants/colors';

const CustomHeaderButton = props => {
  return (
    <Icon.Button
      name={props?.iconName}
      onPress={props?.onPress}
      activeOpacity={1}
      backgroundColor={colors.headerColor}>
      {props?.title}
    </Icon.Button>
  );
};

export default CustomHeaderButton;
