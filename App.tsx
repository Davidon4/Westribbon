import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from "./src/navigation";
import { NavigationContainer } from '@react-navigation/native';


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Navigation/>
      <StatusBar style="auto" />
      </NavigationContainer>
  );
}

export default App;