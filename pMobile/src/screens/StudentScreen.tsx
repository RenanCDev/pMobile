// screens/StudentScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import colors from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Student'>;
type RouteProps = RouteProp<RootStackParamList, 'Student'>;

export default function StudentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const validateFields = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório.');
      return false;
    }
    if (!matricula.trim()) {
      Alert.alert('Erro', 'Matrícula é obrigatória.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Erro', 'Email inválido.');
      return false;
    }
    if (!telefone.trim()) {
      Alert.alert('Erro', 'Telefone é obrigatório.');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!validateFields()) return;

    // Aqui você pode salvar os dados do estudante (ex: via contexto ou API)
    Alert.alert('Sucesso', 'Estudante salvo com sucesso!');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome completo"
      />

      <Text style={styles.label}>Matrícula:</Text>
      <TextInput
        style={styles.input}
        value={matricula}
        onChangeText={setMatricula}
        placeholder="Número de matrícula"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="email@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Telefone"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 20,
    flexGrow: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: colors.textPurple,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: colors.primaryPurple,
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
