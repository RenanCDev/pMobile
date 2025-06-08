import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import colors from '../../constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { formatCPF } from '../../utils/cpf/format';
import { loginSchema, LoginFormData } from '../../schemas/Login';

export default function LoginPersonal() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    Alert.alert('Login Personal', `CPF: ${data.cpf}\nSenha: ${data.senha}`);
    navigation.navigate('Home');
  };

  return (
    <Container>
      <Title>Login - Personal</Title>

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, value } }) => (
          <>
            <Label>CPF</Label>
            <StyledTextInput
              placeholder="000.000.000-00"
              keyboardType="numeric"
              placeholderTextColor={colors.text.muted}
              value={value}
              onChangeText={(text) => {
                const formatted = formatCPF(text);
                onChange(formatted);
              }}
              style={errors.cpf ? { borderColor: colors.status.error } : {}}
            />
            {errors.cpf && <ErrorText>{errors.cpf.message}</ErrorText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Label>Senha</Label>
            <StyledTextInput
              placeholder="Digite sua senha"
              placeholderTextColor={colors.text.muted}
              secureTextEntry
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              style={errors.senha ? { borderColor: colors.status.error } : {}}
            />
            {errors.senha && <ErrorText>{errors.senha.message}</ErrorText>}
          </>
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>
        <ButtonText>Entrar</ButtonText>
      </Button>

      <RegisterLink onPress={() => navigation.navigate('RegisterPersonal')}>
        <RegisterText>Não tem conta? Cadastre-se</RegisterText>
      </RegisterLink>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 24px;
  background-color: ${colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: ${colors.text.primary};
  text-align: center;
`;

const Label = styled.Text`
  color: ${colors.text.primary};
  margin-bottom: 4px;
`;

const StyledTextInput = styled.TextInput`
  background-color: ${colors.white};
  color: ${colors.text.primary};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid ${colors.border};
`;

const Button = styled.TouchableOpacity`
  background-color: ${colors.primary.DEFAULT};
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;
`;

const ButtonText = styled.Text`
  color: ${colors.primary.contrastText};
  font-weight: bold;
`;

const RegisterLink = styled.TouchableOpacity`
  margin-top: 16px;
  align-items: center;
`;

const RegisterText = styled.Text`
  color: ${colors.text.secondary};
  font-size: 14px;
  text-decoration: underline;
`;

const ErrorText = styled.Text`
  color: ${colors.status.error};
  margin-bottom: 8px;
  font-size: 12px;
`;
