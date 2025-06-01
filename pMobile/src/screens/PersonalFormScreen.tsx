import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePersonals, Personal } from '../context/PersonalContext';
import { RootStackParamList } from '../navigation/StackNavigator';
import { StyleSheet } from 'react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CadastroPersonal'>;
type RouteProps = RouteProp<RootStackParamList, 'CadastroPersonal'>;

export default function PersonalFormScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { personals, addPersonal, editPersonal } = usePersonals();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [sessoesAssociadas, setSessoesAssociadas] = useState(0);

  const editingId = route.params?.personalId;

  useEffect(() => {
    if (editingId) {
      const personal = personals.find((p) => p.id === editingId);
      if (personal) {
        setNome(personal.nome);
        setCpf(personal.cpf);
        setEmail(personal.email);
        setTelefone(personal.telefone);
        setAtivo(personal.ativo);
        setSessoesAssociadas(personal.sessoesAssociadas);
      }
    }
  }, [editingId, personals]);

  const validateFields = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório.');
      return false;
    }
    if (!cpf.trim() || cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
      Alert.alert('Erro', 'CPF deve conter 11 dígitos numéricos.');
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

    const data = {
      nome,
      cpf,
      email,
      telefone,
      ativo,
      sessoesAssociadas,
    };

    if (editingId) {
      editPersonal(editingId, data);
      Alert.alert('Sucesso', 'Personal editado com sucesso.');
    } else {
      addPersonal({ ...data, ativo: true, sessoesAssociadas: 0 });
      Alert.alert('Sucesso', 'Personal cadastrado com sucesso.');
    }

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

      <Text style={styles.label}>CPF:</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        placeholder="Somente números (11 dígitos)"
        keyboardType="numeric"
        maxLength={11}
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

      {/* 
        Campos "ativo" e "sessoesAssociadas" podem ser controlados manualmente ou ocultos,
        pois exclusão lógica e associacoes são controladas no sistema.
        Aqui deixamos ocultos para simplificar.
      */}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{editingId ? 'Salvar Alterações' : 'Cadastrar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
