import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './types';
import {createStackNavigator, StackCardInterpolatedStyle, StackCardInterpolationProps } from "@react-navigation/stack";
import Signin from '../screens/auth/Signin';
import Signup from '../screens/auth/Signup';
import Dashboard from '../screens/app/Dashboard';

const Stack = createStackNavigator<RootStackParamList>();

const forFade = ({ current }: StackCardInterpolationProps): StackCardInterpolatedStyle => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function Navigation() {
  const [stateToken, setStateToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ firstname: string; lastname: string; } | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const [userToken, userString] = await Promise.all([
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('user')
        ]);

        if (userToken) {
          setStateToken(userToken);
        }

        if (userString) {
          const userData = JSON.parse(userString);
          setUser(userData);
        }
      } catch (e) {
        console.error('Failed to load user data', e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
      <Stack.Navigator>
        {user && (
                 <Stack.Screen
                 name="Dashboard"
                 component={Dashboard}
                 options={{
                   title: user ? `Welcome back ${user.firstname} ${user.lastname}` : 'Dashboard',
                   headerShown: true,
                   headerBackTitleVisible: false,
                   headerTitleAlign: 'center',
                   headerLeft: () => null,
                 }}
               />
        )}
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
}

export default Navigation;