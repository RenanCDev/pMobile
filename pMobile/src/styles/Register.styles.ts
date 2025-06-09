import styled from 'styled-components/native';
import colors from '../constants/colors';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native';

export const Container = styled.ScrollView`
  padding: 16px;
  background-color: ${colors.background};
`;

export const LoginButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 8px;
`;

export const LoginButtonText = styled.Text`
  color: ${colors.primary.DEFAULT};
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${colors.text.primary};
`;

export const TitleHighlight = styled.Text`
  color: ${colors.primary.DEFAULT};
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${colors.text.primary};
`;

export const Input = styled.TextInput<{ hasError?: boolean }>`
  border-width: 1px;
  border-color: ${({ hasError }) =>
    hasError ? colors.dark.background : colors.secondary.DEFAULT};
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  color: ${colors.text.primary};
  background-color: ${colors.white};
`;

export const InputMultiline = styled(Input).attrs({
  multiline: true,
  textAlignVertical: 'top',
})``;

export const PickerWrapper = styled(TouchableOpacity)<{ hasError?: boolean }>`
  border-width: 1px;
  border-color: ${({ hasError }) =>
    hasError ? colors.dark.background : colors.secondary.DEFAULT};
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: ${colors.white};
  height: 50px;
  justify-content: center;
  padding: 0 12px;
`;

export const StyledPicker = styled(Picker)`
  color: ${colors.text.primary};
`;

export const DatePickerButton = styled(TouchableOpacity)<{ hasError?: boolean }>`
  border-width: 1px;
  border-color: ${({ hasError }) =>
    hasError ? colors.dark.background : colors.secondary.DEFAULT};
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: ${colors.white};
  height: 50px;
  justify-content: center;
  padding: 0 12px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  margin-left: 4px;
  margin-right: 4px;
  align-items: center;
`;

export const SubmitButton = styled(Button)`
  background-color: ${colors.primary.DEFAULT};
`;

export const GetButton = styled(Button)`
  background-color: ${colors.secondary.DEFAULT};
`;

export const ResetButton = styled(Button)`
  background-color: ${colors.dark.background};
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  color: ${colors.dark.background};
  margin-bottom: 8px;
`;

export const ErrorInput = styled(Input)`
  border-color: ${colors.dark.background};
`;

export const Label = styled.Text`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${colors.text.primary};
`;

