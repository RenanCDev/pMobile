import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import colors from '../constants/colors';

type StaffMember = {
  id: string;
  name: string;
  specialty: string;
};

const staffData: StaffMember[] = [
  { id: '1', name: 'Ana Costa', specialty: 'Musculação' },
  { id: '2', name: 'Bruno Souza', specialty: 'Funcional' },
  { id: '3', name: 'Carla Dias', specialty: 'Crossfit' },
];

export default function StaffScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipe de Personal Trainers</Text>
      <FlatList
        data={staffData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
          </View>
        )}
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPurple,
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.lightPurple,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primaryPurple,
  },
  specialty: {
    fontSize: 16,
    color: colors.textPurple,
    marginTop: 4,
  },
});
