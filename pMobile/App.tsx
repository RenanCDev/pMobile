import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { PersonalProvider } from './src/context/PersonalContext';

export default function App() {
  return (
    <PersonalProvider>
      <NavigationContainer>
        <StackNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </PersonalProvider>
  );
}
