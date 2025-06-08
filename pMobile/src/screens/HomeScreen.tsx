import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import colors from '../constants/colors';
import HeaderMenu from '../components/HeaderMenu';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 8 }}>
          <HeaderMenu />
        </View>
      ),
    });
  }, [navigation]);

  const handleClearData = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Sucesso', 'Todos os dados foram apagados!');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao apagar os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vai Começar a Resenhitxa</Text>

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

      <CustomButton
        title="Limpar Dados"
        onPress={handleClearData}
        type="danger"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.primary.DEFAULT,
    textAlign: 'center',
  },
});
