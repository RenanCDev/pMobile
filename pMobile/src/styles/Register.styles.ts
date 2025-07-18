import styled from 'styled-components/native';
import colors from '../constants/colors';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 24px;
  background-color: ${colors.dark.background};
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
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
  color: ${colors.text.inverted};
  text-align: center;
`;

export const TitleHighlight = styled.Text`
  color: ${colors.primary.DEFAULT};
`;

export const Section = styled.View`
  margin-bottom: 5px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  margin-top: 12px;
  color: ${colors.text.inverted};
`;

export const Label = styled.Text`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${colors.primary.DEFAULT};
`;

export const Input = styled.TextInput<{ hasError?: boolean }>`
  height: 50px;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  padding: 10px;
  color: ${colors.text.inverted};
  border-width: 1px;
  border-color: ${({ hasError }) =>
    hasError ? colors.status.error : colors.border};
  margin-bottom: 8px;
`;

export const InputMultiline = styled(Input).attrs({
  multiline: true,
  textAlignVertical: 'top',
})`
  height: 120px;
`;

export const PickerWrapper = styled(TouchableOpacity)<{ hasError?: boolean }>`
  height: 50px;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  justify-content: center;
  padding: 0 12px;
  border-width: 1px;
  border-color: ${({ hasError }) =>
    hasError ? colors.status.error : colors.border};
  margin-bottom: 8px;
`;

export const StyledPicker = styled(Picker)`
  height: 50px;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  padding: 10px;
  color: ${colors.text.inverted};
  border-width: 1px;
  border-color: ${colors.border};
  margin-bottom: 8px;
`;

export const DatePickerButton = styled(TouchableOpacity)<{ hasError?: boolean }>`
  height: 50px;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  padding: 0 12px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ hasError }) =>
    hasError ? colors.status.error : colors.border};
  margin-bottom: 8px;
  font-size: 16px;
  justify-content: center;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 0px;
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled(Button)`
  background-color: ${colors.primary.DEFAULT};
`;

export const GetButton = styled(Button)`
  background-color: ${colors.primary.DEFAULT};
`;

export const ResetButton = styled(Button)`
  background-color: ${colors.secondary.DEFAULT};
`;

export const ButtonText = styled.Text`
  color: ${colors.text.inverted};
  font-weight: bold;
  text-align: center;
`;

export const ErrorText = styled.Text`
  color: ${colors.status.error};
  margin-bottom: 12px;
  font-size: 12px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${colors.text.inverted};
  margin-bottom: 8px;
`;

export const Box = styled.View`
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${colors.border};
  align-items: center;
`;

export const BoxLabel = styled.Text`
  font-weight: 600;
  color: ${colors.primary.DEFAULT};
  margin-bottom: 6px;
`;

export const BoxValue = styled.Text`
  color: ${colors.text.inverted};
  font-size: 16px;
`;

export const TextArea = styled(TextInput)`
  height: 120px;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  padding: 10px;
  color: ${colors.text.inverted};
  margin-bottom: 4px;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const ButtonRow = styled.View`
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  width: 100%;
`;

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  width: 80%;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  border-width: 1px;
  border-color: ${colors.border};
  padding: 20px;
  align-items: center;
`;

export const Message = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  color: ${colors.text.muted};
`;

export const PasswordButton = styled.TouchableOpacity`
  margin-top: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${colors.dark.card};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`;

export const TogglePasswordButton = styled.TouchableOpacity`
  margin-top: 8px;
  align-self: flex-end;
`;

export const InputWrapper = styled.View`
  position: relative;
  width: 100%;
  justify-content: center;
`;

export const EyeButton = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-12px);
  z-index: 1;
`;
