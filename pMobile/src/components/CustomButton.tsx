import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/buttonStyles';

export default function CustomButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
