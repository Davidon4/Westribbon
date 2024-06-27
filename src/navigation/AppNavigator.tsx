import React, {useState, useEffect} from 'react';
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
 import { COLORS } from '../theme';
 import Dashboard from '../screens/app/Dashboard';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const [user, setUser] = useState<{ firstname: string; lastname: string; } | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const userString = await AsyncStorage.getItem('user');
            if (userString) {
              const userData = JSON.parse(userString);
              setUser(userData);
            }
          } catch (e) {
            console.error('Failed to load user details', e);
          }
        };
    
        fetchUserDetails();
      }, []);

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: user ? `Welcome back ${user.firstname} ${user.lastname}` : 'Dashboard',
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
