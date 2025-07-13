import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../../styles/Register.styles";
import colors from "../../../constants/colors";
import { formatPhoneNumber } from "../../../utils/celular/format";

type Props = {
  control: any;
  name: string;
  label: string;
  errors: any;
};

export default function PhoneInputField({ control, name, label, errors }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>{label}</S.Label>
          <S.Input
            value={value}
            onChangeText={(text) => onChange(formatPhoneNumber(text))}
            placeholder="(00) 00000-0000"
            placeholderTextColor={colors.text.placeholder}
            keyboardType="phone-pad"
            hasError={!!errors[name]}
          />
          {errors[name] && <S.ErrorText>{errors[name].message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
