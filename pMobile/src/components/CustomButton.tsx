import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';

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

  const getTypeStyle = (): ViewStyle => {
    if (backgroundColor) {
      return { backgroundColor };
    }

    switch (type) {
      case 'secondary':
        return { backgroundColor: '#6c63ff' };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: '#6c63ff',
        };
      case 'danger':
        return { backgroundColor: '#d9534f' };
      case 'primary':
      default:
        return { backgroundColor: '#5e3dea' };
    }
  };

  const getPressedStyle = (): ViewStyle => {
    return isPressed ? { transform: [{ scale: 0.97 }] } : {};
  };

  const getTextStyle = (): TextStyle => {
    let color = textColor;

    if (!color) {
      if (type === 'outline') color = '#6c63ff';
      else color = '#fff';
    }

    return {
      color,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    };
  };

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        getTypeStyle(),
        getPressedStyle(),
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Sombra no Android

    ...(Platform.OS === 'ios' && {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    }),

    ...(Platform.OS === 'web' && {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    }),
  },
  disabled: {
    opacity: 0.5,
  },
});
