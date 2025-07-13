import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../../styles/Register.styles";
import colors from "../../../constants/colors";

type Props = {
  control: any;
  errors: any;
};

export default function InputLocaisDisponiveis({ control, errors }: Props) {
  return (
    <Controller
      control={control}
      name="locais_disponiveis"
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <S.Section>
          <S.Label>Locais disponíveis</S.Label>
          <S.InputMultiline
            hasError={!!error}
            onChangeText={onChange}
            value={value}
            placeholder="Ex: Academia X, Parque Y"
            placeholderTextColor={colors.text.placeholder}
            numberOfLines={2}
          />
          {error && <S.ErrorText>{error.message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
