import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';

import LoginPersonal from '../screens/login/LoginPersonal';
import LoginAluno from '../screens/login/LoginAluno';

import RegisterPersonal from '../screens/personal/RegisterPersonal';
import { EditPersonal } from '../screens/personal/EditPersonal';
import DeletePersonal from '../screens/personal/DeletePersonal';
import ViewPersonal from '../screens/personal/ViewPersonal';

import RegisterAluno from '../screens/aluno/RegisterAluno';
import { EditAluno } from "../screens/aluno/EditAluno";
import DeleteAluno from '../screens/aluno/DeleteAluno';
import ViewAluno from '../screens/aluno/ViewAluno';

import RegisterServico from '../screens/servico/RegisterServico';
import EditServico from '../screens/servico/EditServico';
import DeleteServico from '../screens/servico/DeleteServico';
import ViewServico from '../screens/servico/ViewServico';

import HeaderMenu from '../components/HeaderMenu';
import HeaderHomeButton from '../components/HeaderHomeButton';
import colors from '../constants/colors';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerLeft: () => <HeaderHomeButton />,
        headerRight: () => (
          <View style={{ marginRight: 8 }}>
            <HeaderMenu />
          </View>
        ),
        headerStyle: {
          backgroundColor: colors.primary.DEFAULT,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Início' }} />

      <Stack.Screen name="LoginPersonal" component={LoginPersonal} options={{ title: 'Login Personal' }} />
      <Stack.Screen name="LoginAluno" component={LoginAluno} options={{ title: 'Login Aluno' }} />

      <Stack.Screen name="RegisterPersonal" component={RegisterPersonal} options={{ title: 'Cadastrar Personal' }} />
      <Stack.Screen name="EditPersonal" component={EditPersonal} options={{ title: 'Editar Personal' }} />
      <Stack.Screen name="DeletePersonal" component={DeletePersonal} options={{ title: 'Excluir Personal' }} />
      <Stack.Screen name="ViewPersonal" component={ViewPersonal} options={{ title: 'Visualizar Personais' }} />

      <Stack.Screen name="RegisterAluno" component={RegisterAluno} options={{ title: 'Cadastrar Aluno' }} />
      <Stack.Screen name="EditAluno" component={EditAluno} options={{ title: 'Editar Aluno' }} />
      <Stack.Screen name="DeleteAluno" component={DeleteAluno} options={{ title: 'Excluir Aluno' }} />
      <Stack.Screen name="ViewAluno" component={ViewAluno} options={{ title: 'Visualizar Alunos' }} />

      <Stack.Screen name="RegisterServico" component={RegisterServico} options={{ title: 'Cadastrar Serviço' }} />
      <Stack.Screen name="EditServico" component={EditServico} options={{ title: 'Editar Serviço' }} />
      <Stack.Screen name="DeleteServico" component={DeleteServico} options={{ title: 'Excluir Serviço' }} />
      <Stack.Screen name="ViewServico" component={ViewServico} options={{ title: 'Visualizar Serviços' }} />
    </Stack.Navigator>
  );
}
