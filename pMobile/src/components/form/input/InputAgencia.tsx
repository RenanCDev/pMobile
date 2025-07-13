import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../../styles/Register.styles";
import colors from "../../../constants/colors";

type Props = {
  control: any;
  errors: any;
};

export default function InputAgencia({ control, errors }: Props) {
  return (
    <Controller
      control={control}
      name="agencia"
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>Agência</S.Label>
          <S.Input
            onChangeText={(text) => {
              const numeric = text.replace(/\D/g, "");
              onChange(numeric ? Number(numeric) : undefined);
            }}
            value={value !== undefined ? String(value) : ""}
            placeholder="Agência"
            keyboardType="numeric"
            placeholderTextColor={colors.text.placeholder}
            hasError={!!errors.agencia}
          />
          {errors.agencia && <S.ErrorText>{errors.agencia.message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
