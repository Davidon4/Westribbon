import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from "./src/navigation";


function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Navigation/>
      <StatusBar style="auto" />
      </SafeAreaProvider>
  );
}

export default App;