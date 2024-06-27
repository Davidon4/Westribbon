import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppButtonProps } from "../types";
import { COLORS } from "../theme";

export function AppButton ({ title, onPress, buttonStyle, containerStyle, titleStyle }: AppButtonProps) {
  return (
    <View style={containerStyle}>
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.buttonContainer, buttonStyle]}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 15,
    width: wp('60%'),
    height: hp('5.5%'),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
}); 