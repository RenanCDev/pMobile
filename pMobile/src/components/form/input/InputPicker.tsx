import React from "react";
import { Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import * as S from "../../../styles/Register.styles";

type Option = {
  label: string;
  value: string;
};

type Props = {
  control: any;
  name: string;
  label: string;
  errors: any;
  options: Option[];
};

export default function PickerField({ control, name, label, errors, options }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>{label}</S.Label>
          <S.StyledPicker selectedValue={value} onValueChange={onChange}>
            {options.map((opt) => (
              <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </S.StyledPicker>
          {errors[name] && <S.ErrorText>{errors[name].message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
