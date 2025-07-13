import React, { useState } from "react";
import { Controller } from "react-hook-form";
import * as S from "../../../styles/Register.styles";
import colors from "../../../constants/colors";

type Props = {
  control: any;
  errors: any;
  name: string;
  label: string;
  placeholder?: string;
};

export default function InputDecimal({
  control,
  errors,
  name,
  label,
  placeholder = "Ex.: 0.0",
}: Props) {
  const [textValue, setTextValue] = useState("");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>{label}</S.Label>
          <S.Input
            hasError={!!errors[name]}
            keyboardType="decimal-pad"
            placeholder={placeholder}
            placeholderTextColor={colors.text.placeholder}
            value={value}
            onChangeText={(text) => {
              if (/^\d*\.?\d*$/.test(text)) {
                setTextValue(text);
                onChange(text === "" || text === "." ? undefined : parseFloat(text));
              }
            }}
          />
          {errors[name] && (
            <S.ErrorText>{errors[name]?.message}</S.ErrorText>
          )}
        </S.Section>
      )}
    />
  );
}
