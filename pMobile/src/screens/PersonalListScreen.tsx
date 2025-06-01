import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePersonals, Personal } from '../context/PersonalContext';
import colors from '../constants/colors';

type RootStackParamList = {
  Home: undefined;
  CadastroPersonal: { personalId?: string } | undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function PersonalListScreen() {
  const { personals, deletePersonal } = usePersonals();
  const navigation = useNavigation<NavigationProp>();

  const confirmDelete = (id: string, sessoes: number) => {
    if (sessoes > 0) {
      Alert.alert(
        'Erro',
        'Erro: Não é possível excluir, existem sessões associadas.'
      );
      return;
    }

    Alert.alert('Confirmação', 'Deseja excluir este personal?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deletePersonal(id);
          Alert.alert('Sucesso', 'Personal excluído com sucesso.');
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Personal }) => {
    if (!item.ativo) return null;

    return (
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.nome}</Text>
          <Text style={styles.details}>CPF: {item.cpf}</Text>
          <Text style={styles.details}>Email: {item.email}</Text>
          <Text style={styles.details}>Telefone: {item.telefone}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('CadastroPersonal', { personalId: item.id })
            }
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => confirmDelete(item.id, item.sessoesAssociadas || 0)}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={personals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum personal cadastrado.</Text>
        }
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    card: {
      backgroundColor: colors.lightPurple, // lilás claro
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    info: {
      marginBottom: 12,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primaryPurple, // roxo principal
    },
    details: {
      fontSize: 14,
      color: colors.textPurple, // roxo mais claro para texto
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: colors.primaryPurple,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    deleteButton: {
      backgroundColor: colors.deleteRed, // vermelho personalizado
    },
    buttonText: {
      color: colors.white,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: colors.textPurple,
    },
  });