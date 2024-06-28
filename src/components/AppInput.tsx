import React, {useState} from 'react';
import {TextInput, Pressable, View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppInputProps } from '../types';
import { COLORS } from '../theme';

export function AppInput (props: AppInputProps): JSX.Element {
  const { label, isPassword, value, keyboardType, onChangeText, ...rest } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onEyePress = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}<Text style={{color: COLORS.red}}>*</Text></Text>
      <TextInput
        onChangeText={onChangeText}
        // onBlur={onBlur}
        value={value}
        keyboardType={keyboardType}
        placeholderTextColor={COLORS.darkGrey}
        secureTextEntry={isPassword && !isPasswordVisible}
        style={[styles.input]}
        {...rest}
      />
      {isPassword ? (
        <Pressable onPress={onEyePress}>
          {
          isPasswordVisible ? <Ionicons style={styles.eye} name="eye" size={22} color={COLORS.darkGrey} />
          : <Ionicons style={styles.eye} name="eye-off" size={22} color={COLORS.darkGrey} />
            }
        </Pressable>
      ) : null}
    </View>
  );
};

 const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    backgroundColor: COLORS.secondary,
    position: 'relative',
    borderWidth: 1.5,
    borderRadius: 6,
    flex: 1
  },
  inputContainer:{
    marginTop: 15,
  },
  eye: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 1,
    bottom: -19,
    marginHorizontal: 5,
    marginVertical: 26,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.secondary
  },
});

