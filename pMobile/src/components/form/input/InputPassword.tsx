import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../../styles/Register.styles";
import colors from "../../../constants/colors";

type Props = {
  control: any;
  errors: any;
};

export default function InputPassword({ control, errors }: Props) {
  return (
    <Controller
      control={control}
      name="senha"
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <S.Section>
          <S.Label>Senha</S.Label>
          <S.Input
            hasError={!!error}
            placeholder="Digite sua senha"
            placeholderTextColor={colors.text.placeholder}
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          {error && <S.ErrorText>{error.message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
