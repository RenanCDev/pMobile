import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/homeStyles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tenha Paciencia Krai</Text>
      <Text style={styles.subtitle}>Init</Text>
    </View>
  );
}
