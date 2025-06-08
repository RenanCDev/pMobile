import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background, // lilás claro
  },
  card: {
    backgroundColor: colors.primary.DEFAULT, // roxo principal
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  info: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  details: {
    fontSize: 14,
    color: colors.white,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.background, // lilás suave
    padding: 8,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: colors.secondary.dark, // vermelho para delete
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: colors.primary.DEFAULT, // roxo escuro para texto
  },
});
