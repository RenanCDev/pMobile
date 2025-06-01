import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,     // Lilás claro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.primaryPurple,            // Roxo principal
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primaryPurple,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.secondaryPurple, // Lilás secundário
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
