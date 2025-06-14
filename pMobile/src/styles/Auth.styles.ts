// src/styles/Auth.styles.ts
import styled from 'styled-components/native';
import colors from '../constants/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 24px;
  background-color: ${colors.dark.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: ${colors.text.inverted};
  text-align: center;
`;

export const Label = styled.Text`
  color: ${colors.text.inverted};
  margin-bottom: 4px;
`;

export const Input = styled.TextInput`
  background-color: ${colors.dark.card};
  color: ${colors.text.inverted};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid ${colors.secondary.DEFAULT};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.secondary.DEFAULT};
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-weight: bold;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 16px;
  align-items: center;
`;

export const LinkText = styled.Text`
  color: ${colors.text.inverted};
  font-size: 14px;
  text-decoration: underline;
`;

export const ErrorText = styled.Text`
  color: ${colors.status.error};
  margin-bottom: 8px;
  font-size: 12px;
`;
