import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import colors from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HeaderMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  const handleNavigate = (route: keyof RootStackParamList) => {
    closeMenu();
    navigation.navigate(route);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={openMenu}
        style={{
          backgroundColor: colors.background,
          padding: 4,
          borderRadius: 4,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Ionicons
          name="menu"
          size={24}
          color={colors.lightPurple}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={isVisible}
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <View style={styles.menu}>
            <MenuItem label="Home" onPress={() => handleNavigate('Home')} />

            <Text style={styles.sectionTitle}>Personals</Text>
            <MenuItem label="Cadastrar Personal" onPress={() => handleNavigate('RegisterPersonal')} />
            <MenuItem label="Editar Personal" onPress={() => handleNavigate('EditPersonal')} />
            <MenuItem label="Excluir Personal" onPress={() => handleNavigate('DeletePersonal')} />
            <MenuItem label="Visualizar Personal" onPress={() => handleNavigate('ViewPersonal')} />

            <Text style={styles.sectionTitle}>Alunos</Text>
            <MenuItem label="Cadastrar Aluno" onPress={() => handleNavigate('RegisterAluno')} />
            <MenuItem label="Editar Aluno" onPress={() => handleNavigate('EditAluno')} />
            <MenuItem label="Excluir Aluno" onPress={() => handleNavigate('DeleteAluno')} />
            <MenuItem label="Visualizar Aluno" onPress={() => handleNavigate('ViewAluno')} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

type MenuItemProps = {
  label: string;
  onPress: () => void;
};

function MenuItem({ label, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    marginRight: 10,
    color: colors.primaryPurple,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 10,
  },
  menu: {
    backgroundColor: colors.lightPurple,
    borderRadius: 10,
    elevation: 5,
    width: 250,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.secondaryPurple,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryPurple + '33',
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: colors.textPurple,
    fontWeight: '600',
  },
});
