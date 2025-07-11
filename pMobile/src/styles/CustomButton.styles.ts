// src/components/CustomButton.tsx
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

type ButtonType = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonContainerProps {
  type?: ButtonType;
  disabled?: boolean;
  customBg?: string;
  isPressed?: boolean;
}

export const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  padding: 14px 24px;
  margin: 8px 0;
  border-radius: 12px;
  align-items: center;
  justify-content: center;

  background-color: ${({ type = 'primary', customBg }) => {
    if (customBg) return customBg;
    switch (type) {
      case 'secondary':
        return colors.secondary.dark;
      case 'outline':
        return 'transparent';
      case 'danger':
        return colors.status.error;
      default:
        return colors.primary.dark;
    }
  }};

  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transform: ${({ isPressed }) => (isPressed ? 'scale(0.97)' : 'scale(1)')};

  border-width: ${({ type = 'primary' }) => (type === 'outline' ? '2px' : '0px')};
  border-color: ${({ type = 'primary' }) =>
    type === 'outline' ? colors.secondary.DEFAULT : 'transparent'};
`;

interface ButtonTextProps {
  type?: ButtonType;
  customColor?: string;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  color: ${({ type = 'primary', customColor }) => {
    if (customColor) return customColor;
    return type === 'outline' ? colors.secondary.DEFAULT : colors.text.inverted;
  }};
`;
