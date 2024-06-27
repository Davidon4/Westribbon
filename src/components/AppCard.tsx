import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppCardProps } from '../types';

export function AppCard({title}: AppCardProps) {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
        height: hp("10%"),
        width: wp("40%"),
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        margin: 10
    },
    title:{
        marginTop: 18,
        color: COLORS.dark,
        fontWeight: "600"
    }
})