import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
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
  const { personalLogado, alunoLogado } = useDataContext();

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

  return (
    <S.Container>
      <S.Title>
        {nome ? `Faça bom uso do app, ${nome}` : 'Bem-vindo!'}
      </S.Title>

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
    </S.Container>
  );
}
