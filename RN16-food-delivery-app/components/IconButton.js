import React from "react";
import { TouchableOpacity, Image } from "react-native";

export default function IconButton({
  containerStyle,
  iconStyle,
  onPress,
  icon,
}) {
  return (
    <TouchableOpacity style={[containerStyle]} onPress={onPress}>
      <Image style={[{ width: 30, height: 30 }, iconStyle]} source={icon} />
    </TouchableOpacity>
  );
}
