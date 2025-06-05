import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import colors from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vai Começar a Resenhitxa</Text>

      {/* Botões para Personal */}
      <CustomButton
        title="Cadastrar Personal"
        onPress={() => navigation.navigate('RegisterStaff')}
        type="primary"
      />
      <CustomButton
        title="Editar Personal"
        onPress={() => navigation.navigate('EditStaff')}
        type="primary"
      />
      <CustomButton
        title="Excluir Personal"
        onPress={() => navigation.navigate('DeleteStaff')}
        type="primary"
      />
      <CustomButton
        title="Visualizar Personal"
        onPress={() => navigation.navigate('ViewStaff')}
        type="primary"
      />

      {/* Botões para Aluno */}
      <CustomButton
        title="Cadastrar Aluno"
        onPress={() => navigation.navigate('RegisterStudent')}
        type="secondary"
      />
      <CustomButton
        title="Editar Aluno"
        onPress={() => navigation.navigate('EditStudent')}
        type="secondary"
      />
      <CustomButton
        title="Excluir Aluno"
        onPress={() => navigation.navigate('DeleteStudent')}
        type="secondary"
      />
      <CustomButton
        title="Visualizar Aluno"
        onPress={() => navigation.navigate('ViewStudent')}
        type="secondary"
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
    color: colors.primaryPurple,
    textAlign: 'center',
  },
});
