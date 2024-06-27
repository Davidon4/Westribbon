import React from 'react';
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
 import { COLORS } from '../theme';
 import Dashboard from '../screens/app/Dashboard';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {

  return (
      <Stack.Navigator
      initialRouteName='Dashboard'
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: "Dashboard",
            headerShown: true,
            headerLeft: () => (
                <Ionicons
                  name="chevron-back"
                  size={26}
                  color={COLORS.secondary}
                />
            ),
            headerBackTitleVisible: true,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    )
};
