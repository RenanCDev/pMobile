import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

import RegisterPersonal from '../screens/personal/RegisterPersonal';
import EditPersonal from '../screens/personal/EditPersonal';
import DeletePersonal from '../screens/personal/DeletePersonal';
import ViewPersonal from '../screens/personal/ViewPersonal';

import RegisterAluno from '../screens/aluno/RegisterAluno';
import EditAluno from '../screens/aluno/EditAluno';
import DeleteAluno from '../screens/aluno/DeleteAluno';
import ViewAluno from '../screens/aluno/ViewAluno';

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

      <Stack.Screen name="RegisterPersonal" component={RegisterPersonal} options={{ title: 'Cadastrar Personal' }} />
      <Stack.Screen name="EditPersonal" component={EditPersonal} options={{ title: 'Editar Personal' }} />
      <Stack.Screen name="DeletePersonal" component={DeletePersonal} options={{ title: 'Excluir Personal' }} />
      <Stack.Screen name="ViewPersonal" component={ViewPersonal} options={{ title: 'Visualizar Personais' }} />

      <Stack.Screen name="RegisterAluno" component={RegisterAluno} options={{ title: 'Cadastrar Aluno' }} />
      <Stack.Screen name="EditAluno" component={EditAluno} options={{ title: 'Editar Aluno' }} />
      <Stack.Screen name="DeleteAluno" component={DeleteAluno} options={{ title: 'Excluir Aluno' }} />
      <Stack.Screen name="ViewAluno" component={ViewAluno} options={{ title: 'Visualizar Alunos' }} />
    </Stack.Navigator>
  );
}
