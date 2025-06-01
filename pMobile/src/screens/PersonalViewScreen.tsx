import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { usePersonals } from '../context/PersonalContext';
import { RootStackParamList } from '../navigation/StackNavigator';

type RouteProps = RouteProp<RootStackParamList, 'VisualizarPersonal'>;

export default function PersonalViewScreen() {
  const route = useRoute<RouteProps>();
  const { personals } = usePersonals();
  const personal = personals.find((p) => p.id === route.params.personalId);

  if (!personal || !personal.ativo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Personal não encontrado ou excluído.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{personal.nome}</Text>

      <Text style={styles.label}>CPF:</Text>
      <Text style={styles.value}>{personal.cpf}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{personal.email}</Text>

      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.value}>{personal.telefone}</Text>

      <Text style={styles.label}>Ativo:</Text>
      <Text style={styles.value}>{personal.ativo ? 'Sim' : 'Não'}</Text>

      <Text style={styles.label}>Sessões Associadas:</Text>
      <Text style={styles.value}>{personal.sessoesAssociadas}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', fontSize: 16, marginTop: 15 },
  value: { fontSize: 16, marginTop: 5 },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 50 },
});
