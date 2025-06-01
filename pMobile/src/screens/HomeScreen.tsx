import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import colors from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema de Gestão de Personals</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CadastroPersonal')}
      >
        <Text style={styles.buttonText}>Cadastrar Personal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('ListaPersonals')}
      >
        <Text style={styles.buttonText}>Listar Personals</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,      // lilás bem claro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.primaryPurple,             // roxo principal
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.textPurple,                // roxo claro para texto
  },
  button: {
    backgroundColor: colors.primaryPurple,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.secondaryPurple, // novo tom de lilás ou roxo secundário
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});