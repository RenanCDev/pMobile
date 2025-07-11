import React, { useState } from 'react';
import { Alert, Modal } from 'react-native';
import { useDataContext } from '../context/DataContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import colors from '../constants/colors';

import {
  Container,
  MenuButton,
  Overlay,
  CenteredView,
  MenuContainer,
  SectionTitle,
  MenuItemButton,
  MenuItemText,
} from '../styles/HeaderMenu.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Tipo que seleciona só as rotas que NÃO têm parâmetros
type RoutesWithoutParams = {
  [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined ? K : never
}[keyof RootStackParamList];

export default function HeaderMenu() {
  const { alunoLogado } = useDataContext();
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  const handleNavigate = (route: RoutesWithoutParams) => {
    closeMenu();
    navigation.navigate(route);
  };  

  return (
    <Container>
      <MenuButton onPress={openMenu}>
        <Ionicons name="menu" size={24} color={colors.dark.surface} />
      </MenuButton>

      <Modal transparent animationType="fade" visible={isVisible} onRequestClose={closeMenu}>
        <Overlay onPress={closeMenu}>
          <CenteredView>
            <MenuContainer>
              <MenuItem label="Home" onPress={() => handleNavigate('HomeScreen')} isHome />

              <SectionTitle>Personals</SectionTitle>
              <MenuItem label="Cadastrar Personal" onPress={() => handleNavigate('RegisterPersonal')} />
              <MenuItem label="Visualizar Personal" onPress={() => handleNavigate('ViewPersonal')} />

              <SectionTitle>Alunos</SectionTitle>
              <MenuItem label="Cadastrar Aluno" onPress={() => handleNavigate('RegisterAluno')} />
              <MenuItem label="Visualizar Aluno" onPress={() => handleNavigate('ViewAluno')} />

              <SectionTitle>Serviços</SectionTitle>
              <MenuItem label="Cadastrar Serviço" onPress={() => handleNavigate('RegisterServico')} />
              <MenuItem label="Visualizar Serviço" onPress={() => handleNavigate('ViewServico')} />
            </MenuContainer>
          </CenteredView>
        </Overlay>
      </Modal>
    </Container>
  );
}

type MenuItemProps = {
  label: string;
  onPress: () => void;
  isHome?: boolean;
};

function MenuItem({ label, onPress, isHome = false }: MenuItemProps) {
  return (
    <MenuItemButton onPress={onPress} isHome={isHome} activeOpacity={0.7}>
      <MenuItemText isHome={isHome}>{label}</MenuItemText>
    </MenuItemButton>
  );
}
