import React from 'react';
import { TransitionPresets, createStackNavigator, StackCardInterpolatedStyle, StackCardInterpolationProps } from "@react-navigation/stack";
import Signin from '../screens/auth/Signin';
import Signup from '../screens/auth/Signup';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const forFade = ({ current }: StackCardInterpolationProps): StackCardInterpolatedStyle => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function AuthNavigator(): JSX.Element {
  return (
      <Stack.Navigator
      initialRouteName="Signup"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
          <Stack.Screen name="Signin"
           component={Signin}
           options={{
            cardStyleInterpolator: forFade,
          }}
           />
          <Stack.Screen name="Signup"
           component={Signup}
            options={{
              cardStyleInterpolator: forFade,
            }}
          />
      </Stack.Navigator>
  );
};