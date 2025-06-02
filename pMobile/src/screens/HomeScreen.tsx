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
        onPress={() => navigation.navigate('Staff')}
      >
        <Text style={styles.buttonText}>Manter Personal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Student')}
      >
        <Text style={styles.buttonText}>Manter Estudante</Text>
      </TouchableOpacity>
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
    backgroundColor: colors.secondaryPurple, // ou um tom diferente, se preferir
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
