import React, { useState } from "react";
import { Controller } from "react-hook-form";
import * as S from "../../../styles/Register.styles";
import colors from "../../../constants/colors";
import { ActivityIndicator, Text } from "react-native";

type Props = {
  control: any;
  errors: any;
};

export default function InputPassword({ control, errors }: Props) {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

const gerarSenha = async (onChange: (senha: string) => void) => {
  try {
    setLoading(true);
    const response = await fetch("https://api.api-ninjas.com/v1/passwordgenerator?length=10", {
      headers: {
        "X-Api-Key": "EuDu2D8m6cFPPLNQuXtDDA==yk6qljAhKffHb3AI",
      },
    });

    const data = await response.json();

    if (data.random_password) {
      onChange(data.random_password);
    }
    } catch (error) {
      console.error("Erro ao gerar senha:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Controller
      control={control}
      name="senha"
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <S.Section>
          <S.Label>Senha</S.Label>

          <S.InputWrapper>
            <S.Input
              hasError={!!error}
              placeholder="Digite sua senha"
              placeholderTextColor={colors.text.placeholder}
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />

            <S.EyeButton onPress={() => setShowPassword(!showPassword)}>
              <Text style={{ fontSize: 18 }}>
                {showPassword ? "🙈" : "👁️"}
              </Text>
            </S.EyeButton>
          </S.InputWrapper>

          <S.PasswordButton
            onPress={() => gerarSenha(onChange)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff" }}>🔒 Gerar senha forte</Text>
            )}
          </S.PasswordButton>

          {error && <S.ErrorText>{error.message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
