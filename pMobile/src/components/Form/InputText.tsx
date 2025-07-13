import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../styles/Register.styles";
import colors from "../../constants/colors";

type Props = {
  control: any;
  name: string;
  placeholder: string;
  label: string;
  errors: any;
};

export default function TextInputField({ control, name, placeholder, label, errors }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>{label}</S.Label>
          <S.Input
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={colors.text.placeholder}
            hasError={!!errors[name]}
          />
          {errors[name] && <S.ErrorText>{errors[name].message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
