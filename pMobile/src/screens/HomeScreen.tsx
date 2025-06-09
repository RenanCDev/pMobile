import React, { useLayoutEffect } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import HeaderMenu from '../components/HeaderMenu';
import * as S from '../styles/HomeScreen.styles';

import { useDataContext } from '../context/DataContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { personalLogado, alunoLogado, setPersonalLogado, setAlunoLogado } = useDataContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 8 }}>
          <HeaderMenu />
        </View>
      ),
    });
  }, [navigation]);

  const nome = personalLogado?.nome ?? alunoLogado?.nome ?? '';
  const tipoLogado = personalLogado ? 'personal' : alunoLogado ? 'aluno' : null;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Deseja realmente sair do app?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            setPersonalLogado(null);
            setAlunoLogado(null);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <S.Container>
      <S.Title>
        {nome ? `Faça bom uso do app, ${nome}` : 'Bem-vindo!'}
      </S.Title>

      {tipoLogado ? (
        <>
          <CustomButton
            title="Visualizar Perfil"
            onPress={() =>
              navigation.navigate(
                tipoLogado === 'personal' ? 'ViewPersonal' : 'ViewAluno'
              )
            }
            type="primary"
          />

          <CustomButton
            title="Visualizar Serviços"
            onPress={() => navigation.navigate('ViewServico')}
            type="primary"
          />

          <CustomButton title="Logout" onPress={handleLogout} type="secondary" />
        </>
      ) : (
        <>
          <CustomButton
            title="Login Personal"
            onPress={() => navigation.navigate('LoginPersonal')}
            type="primary"
          />

          <CustomButton
            title="Login Aluno"
            onPress={() => navigation.navigate('LoginAluno')}
            type="secondary"
          />
        </>
      )}
    </S.Container>
  );
}
