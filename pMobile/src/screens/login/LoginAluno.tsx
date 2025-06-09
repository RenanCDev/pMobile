import React from "react";
import { Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";
import { formatCPF } from "../../utils/cpf/format";
import { loginSchema, LoginFormData } from "../../schemas/Login";
import * as S from "../../styles/Auth.styles";

export default function LoginAluno() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    Alert.alert("Login Aluno", `CPF: ${data.cpf}\nSenha: ${data.senha}`);
    navigation.navigate("HomeScreen");
  };

  return (
    <S.Container>
      <S.Title>Login - Aluno</S.Title>

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, value } }) => (
          <>
            <S.Label>CPF</S.Label>
            <S.Input
              placeholder="000.000.000-00"
              keyboardType="numeric"
              placeholderTextColor="#999"
              value={value}
              onChangeText={(text) => onChange(formatCPF(text))}
              style={errors.cpf ? { borderColor: "#e74c3c" } : undefined}
            />
            {errors.cpf && <S.ErrorText>{errors.cpf.message}</S.ErrorText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <S.Label>Senha</S.Label>
            <S.Input
              placeholder="Digite sua senha"
              secureTextEntry
              placeholderTextColor="#999"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              style={errors.senha ? { borderColor: "#e74c3c" } : undefined}
            />
            {errors.senha && <S.ErrorText>{errors.senha.message}</S.ErrorText>}
          </>
        )}
      />

      <S.Button onPress={handleSubmit(onSubmit)}>
        <S.ButtonText>Entrar</S.ButtonText>
      </S.Button>

      <S.Link onPress={() => navigation.navigate("RegisterAluno")}>
        <S.LinkText>Não tem conta? Cadastre-se</S.LinkText>
      </S.Link>
    </S.Container>
  );
}
