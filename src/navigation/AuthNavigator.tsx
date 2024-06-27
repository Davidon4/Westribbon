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
      <Stack.Navigator>
          <Stack.Screen name="Signin"
           component={Signin}
           options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
           />
          <Stack.Screen name="Signup"
           component={Signup}
            options={{
            headerShown: false,
              cardStyleInterpolator: forFade,
            }}
          />
      </Stack.Navigator>
  );
};