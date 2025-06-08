import React, { useState } from 'react';
import { Modal, Pressable } from 'react-native';
import styled from 'styled-components/native';
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
    <Container>
      <MenuButton onPress={openMenu}>
        <Ionicons name="menu" size={24} color={colors.primary.DEFAULT} />
      </MenuButton>

      <Modal transparent animationType="fade" visible={isVisible} onRequestClose={closeMenu}>
        <Overlay onPress={closeMenu}>
          <MenuContainer>
            <MenuItem label="Home" onPress={() => handleNavigate('Home')} />

            <SectionTitle>Personals</SectionTitle>
            <MenuItem label="Cadastrar Personal" onPress={() => handleNavigate('RegisterPersonal')} />
            <MenuItem label="Editar Personal" onPress={() => handleNavigate('EditPersonal')} />
            <MenuItem label="Excluir Personal" onPress={() => handleNavigate('DeletePersonal')} />
            <MenuItem label="Visualizar Personal" onPress={() => handleNavigate('ViewPersonal')} />

            <SectionTitle>Alunos</SectionTitle>
            <MenuItem label="Cadastrar Aluno" onPress={() => handleNavigate('RegisterAluno')} />
            <MenuItem label="Editar Aluno" onPress={() => handleNavigate('EditAluno')} />
            <MenuItem label="Excluir Aluno" onPress={() => handleNavigate('DeleteAluno')} />
            <MenuItem label="Visualizar Aluno" onPress={() => handleNavigate('ViewAluno')} />

            <SectionTitle>Serviços</SectionTitle>
            <MenuItem label="Cadastrar Serviço" onPress={() => handleNavigate('RegisterServico')} />
            <MenuItem label="Editar Serviço" onPress={() => handleNavigate('EditServico')} />
            <MenuItem label="Excluir Serviço" onPress={() => handleNavigate('DeleteServico')} />
            <MenuItem label="Visualizar Serviço" onPress={() => handleNavigate('ViewServico')} />
          </MenuContainer>
        </Overlay>
      </Modal>
    </Container>
  );
}

type MenuItemProps = {
  label: string;
  onPress: () => void;
};

function MenuItem({ label, onPress }: MenuItemProps) {
  return (
    <MenuItemButton onPress={onPress}>
      <MenuItemText>{label}</MenuItemText>
    </MenuItemButton>
  );
}

// Styled Components
const Container = styled.View``;

const MenuButton = styled.TouchableOpacity`
  background-color: ${colors.background};
  padding: 4px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: 50px;
  padding-right: 10px;
`;

const MenuContainer = styled.View({
  backgroundColor: colors.white,
  borderRadius: 10,
  width: 250,
  paddingTop: 10,
  paddingBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 5,
});

const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.secondary.DEFAULT};
  padding: 6px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.secondary.DEFAULT}33;
`;

const MenuItemButton = styled.TouchableOpacity`
  padding: 12px 16px;
`;

const MenuItemText = styled.Text`
  font-size: 16px;
  color: ${colors.text.primary};
  font-weight: 600;
`;
