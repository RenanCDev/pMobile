import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../../styles/Register.styles";
import colors from "../../../constants/colors";

type Props = {
  control: any;
  errors: any;
};

export default function InputConta({ control, errors }: Props) {
  return (
    <Controller
      control={control}
      name="numero_conta"
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>Número da conta</S.Label>
          <S.Input
            onChangeText={(text) => {
              const numeric = text.replace(/\D/g, "");
              onChange(numeric ? Number(numeric) : undefined);
            }}
            value={value !== undefined ? String(value) : ""}
            placeholder="Número da conta"
            keyboardType="numeric"
            placeholderTextColor={colors.text.placeholder}
            hasError={!!errors.numero_conta}
          />
          {errors.numero_conta && (
            <S.ErrorText>{errors.numero_conta.message}</S.ErrorText>
          )}
        </S.Section>
      )}
    />
  );
}
