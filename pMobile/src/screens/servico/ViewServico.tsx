import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default function ViewServico() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualização de Cadastro de Servico</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background, // cor clara de fundo da paleta
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT, // cor roxa principal da paleta
  },
});
