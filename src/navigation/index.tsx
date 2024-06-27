import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
// import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
// import useTokenStore from "../store";

function Navigation() {
  const [user, setUser] = useState(null);


  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default Navigation;