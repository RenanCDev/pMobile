import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

import RegisterStaff from '../screens/staff/RegisterStaff';
import EditStaff from '../screens/staff/EditStaff';
import DeleteStaff from '../screens/staff/DeleteStaff';
import ViewStaff from '../screens/staff/ViewStaff';

import RegisterStudent from '../screens/student/RegisterStudent';
import EditStudent from '../screens/student/EditStudent';
import DeleteStudent from '../screens/student/DeleteStudent';
import ViewStudent from '../screens/student/ViewStudent';

import HeaderMenu from '../components/HeaderMenu';
import colors from '../constants/colors';
import { RootStackParamList } from './types';

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
        headerRight: () => <HeaderMenu />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />

      <Stack.Screen name="RegisterStaff" component={RegisterStaff} options={{ title: 'Cadastrar Personal' }} />
      <Stack.Screen name="EditStaff" component={EditStaff} options={{ title: 'Editar Personal' }} />
      <Stack.Screen name="DeleteStaff" component={DeleteStaff} options={{ title: 'Excluir Personal' }} />
      <Stack.Screen name="ViewStaff" component={ViewStaff} options={{ title: 'Visualizar Personais' }} />

      <Stack.Screen name="RegisterStudent" component={RegisterStudent} options={{ title: 'Cadastrar Aluno' }} />
      <Stack.Screen name="EditStudent" component={EditStudent} options={{ title: 'Editar Aluno' }} />
      <Stack.Screen name="DeleteStudent" component={DeleteStudent} options={{ title: 'Excluir Aluno' }} />
      <Stack.Screen name="ViewStudent" component={ViewStudent} options={{ title: 'Visualizar Alunos' }} />
    </Stack.Navigator>
  );
}
