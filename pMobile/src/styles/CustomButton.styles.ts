import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

type ButtonType = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonContainerProps {
  type: ButtonType;
  disabled: boolean;
  customBg?: string;
  isPressed: boolean;
}

export const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 24px;
  padding-right: 24px;

  border-radius: 12px;
  margin-top: 8px;
  margin-bottom: 8px;

  align-items: center;
  justify-content: center;

  background-color: ${({ type, customBg }) => {
    if (customBg) return customBg;
    switch (type) {
      case 'secondary':
        return colors.secondary.dark;
      case 'outline':
        return 'transparent';
      case 'danger':
        return colors.status.error;
      case 'primary':
      default:
        return colors.primary.dark;
    }
  }};

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transform: ${({ isPressed }) => (isPressed ? 'scale(0.97)' : 'scale(1)')};

  border-width: ${({ type }) => (type === 'outline' ? '2px' : '0px')};
  border-color: ${({ type }) =>
    type === 'outline' ? colors.secondary.DEFAULT : 'transparent'};
`;

interface ButtonTextProps {
  type: ButtonType;
  customColor?: string;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  color: ${({ type, customColor }) => {
    if (customColor) return customColor;
    return type === 'outline' ? colors.secondary.DEFAULT : colors.text.inverted;
  }};
`;
