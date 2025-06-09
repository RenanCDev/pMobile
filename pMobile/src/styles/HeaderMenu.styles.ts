import styled from 'styled-components/native';
import colors from '../constants/colors';

export const Container = styled.View`
`;

export const MenuButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 8px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

export const CenteredView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const MenuContainer = styled.View`
  background-color: ${colors.dark.background};
  border-radius: 16px;
  width: 280px;
  padding: 16px 0;
  align-items: center;
`;

export const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.text.inverted};
  padding: 8px 0 6px 0;
  margin-top: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary.DEFAULT}33;
  width: 80%;
  text-align: center;
`;

export const MenuItemButton = styled.TouchableOpacity<{ isHome?: boolean }>`
  padding: 12px 20px;
  margin-bottom: 6px;
  margin-top: 6px;
  width: 80%;
  border-radius: 10px;
  background-color: transparent;
  align-items: center;
`;

export const MenuItemText = styled.Text<{ isHome?: boolean }>`
  font-size: 16px;
  color: ${({ isHome }) => (isHome ? colors.text.inverted : colors.text.muted)};
  font-weight: ${({ isHome }) => (isHome ? 'bold' : '600')};
  text-align: center;
`;
