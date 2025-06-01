import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PersonalListScreen from '../screens/PersonalListScreen';
import PersonalFormScreen from '../screens/PersonalFormScreen';
// import PersonalViewScreen from '../screens/PersonalViewScreen';

export type RootStackParamList = {
  Home: undefined;
  ListaPersonals: undefined;
  CadastroPersonal: { personalId?: string } | undefined;
  VisualizarPersonal: { personalId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ListaPersonals" component={PersonalListScreen} options={{ title: 'Lista de Personals' }} />
      <Stack.Screen name="CadastroPersonal" component={PersonalFormScreen} options={{ title: 'Cadastro / Edição' }} />
      {/* <Stack.Screen name="VisualizarPersonal" component={PersonalViewScreen} options={{ title: 'Visualizar Personal' }} /> */}
    </Stack.Navigator>
  );
}
