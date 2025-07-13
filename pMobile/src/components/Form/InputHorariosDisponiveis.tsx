import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../styles/Register.styles";
import colors from "../../constants/colors";

type Props = {
  control: any;
  errors: any;
};

export default function InputHorariosDisponiveis({ control, errors }: Props) {
  return (
    <Controller
      control={control}
      name="horarios_disponiveis"
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>Horários disponíveis</S.Label>
          <S.InputMultiline
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9,]/g, "");
              onChange(cleaned);
            }}
            value={value !== undefined ? String(value) : ""}
            placeholder="Ex: 123,456,789"
            placeholderTextColor={colors.text.placeholder}
            keyboardType="numeric"
          />
          {errors.horarios_disponiveis && (
            <S.ErrorText>{errors.horarios_disponiveis.message}</S.ErrorText>
          )}
        </S.Section>
      )}
    />
  );
}
