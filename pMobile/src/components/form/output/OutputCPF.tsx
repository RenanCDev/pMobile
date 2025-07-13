import React from "react";
import { Controller } from "react-hook-form";
import * as S from "../../../styles/Register.styles";
import { formatCPF } from "../../../utils/cpf/format";

type Props = {
  control: any;
};

export default function OutputCPF({ control }: Props) {
  return (
    <Controller
      control={control}
      name="cpf"
      render={({ field: { value } }) => (
        <S.Section>
          <S.Label>CPF</S.Label>
          <S.Input
            value={formatCPF(value)}
            editable={false}
            placeholder="000.000.000-00"
          />
        </S.Section>
      )}
    />
  );
}
