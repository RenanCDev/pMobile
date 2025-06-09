import React, { useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import {
  ButtonContainer,
  ButtonText,
} from '../styles/CustomButton.styles';

type ButtonType = 'primary' | 'secondary' | 'outline' | 'danger';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: ButtonType;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

export default function CustomButton({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  backgroundColor,
  textColor,
}: CustomButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <ButtonContainer
      type={type}
      customBg={backgroundColor}
      disabled={disabled}
      isPressed={isPressed}
      onPress={onPress}
      activeOpacity={0.8}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <ButtonText type={type} customColor={textColor}>
        {title}
      </ButtonText>
    </ButtonContainer>
  );
}
