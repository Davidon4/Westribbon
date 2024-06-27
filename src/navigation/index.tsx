import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AppNavigator from "./AppNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from "./AuthNavigator";

function Navigation() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
          setUser(userToken);
        }
      } catch (e) {
        console.error('Failed to load user token', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserToken();
  }, []);

  if (isLoading) {
    // You can render a loading spinner here if you want
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;