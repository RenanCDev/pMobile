import styled from 'styled-components/native';
import { ScrollView, TextInput } from 'react-native';
import colors from '../constants/colors';

export const Container = styled(ScrollView)`
  flex: 1;
  padding: 24px;
  background-color: ${colors.dark.background};
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${colors.text.inverted};
  margin-bottom: 24px;
`;

export const Label = styled.Text`
  color: ${colors.dark.text};
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Input = styled(TextInput)`
  height: 44px;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  padding: 10px;
  color: ${colors.text.inverted};
  margin-bottom: 4px;
`;

export const TextArea = styled(TextInput)`
  height: 120px;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  padding: 10px;
  color: ${colors.text.inverted};
  margin-bottom: 4px;
`;

export const ErrorText = styled.Text`
  color: red;
  margin-bottom: 12px;
`;

export const ButtonRow = styled.View`
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;
