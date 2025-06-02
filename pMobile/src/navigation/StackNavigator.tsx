import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StaffScreen from '../screens/StaffScreen';
import StudentScreen from '../screens/StudentScreen';
import colors from '../constants/colors';
import HeaderMenu from '../components/HeaderMenu'; // 👈 Importa o componente

export type RootStackParamList = {
  Home: undefined;
  Staff: undefined;
  Student: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryPurple,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        headerRight: () => <HeaderMenu />, // 👈 Usa seu menu personalizado
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'TraininSync' }}
      />
      <Stack.Screen
        name="Staff"
        component={StaffScreen}
        options={{ title: 'Equipe' }}
      />
      <Stack.Screen
        name="Student"
        component={StudentScreen}
        options={{ title: 'Alunos' }}
      />
    </Stack.Navigator>
  );
}
