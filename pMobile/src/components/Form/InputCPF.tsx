import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../styles/Register.styles";
import colors from "../../constants/colors";
import { formatCPF } from "../../utils/cpf/format";

type Props = {
  control: any;
  errors: any;
};

export default function InputCPF({ control, errors }: Props) {
  return (
    <Controller
      control={control}
      name="cpf"
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>CPF</S.Label>
          <S.Input
            onChangeText={(text) => {
              const formatted = formatCPF(text);
              onChange(formatted);
            }}
            value={value}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            placeholderTextColor={colors.text.placeholder}
            hasError={!!errors.cpf}
          />
          {errors.cpf && <S.ErrorText>{errors.cpf.message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
