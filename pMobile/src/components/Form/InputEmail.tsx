import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../styles/Register.styles";
import colors from "../../constants/colors";

type Props = {
  control: any;
  errors: any;
};

export default function InputEmail({ control, errors }: Props) {
  return (
    <Controller
      control={control}
      name="email"
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>E-mail</S.Label>
          <S.Input
            onChangeText={onChange}
            value={value}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.text.placeholder}
            hasError={!!errors.email}
          />
          {errors.email && <S.ErrorText>{errors.email.message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
