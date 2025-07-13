import React, { useState } from "react";
import { Controller } from "react-hook-form";
import * as S from "../../../styles/Register.styles";
import colors from "../../../constants/colors";

type Props = {
  control: any;
  errors: any;
};

export default function InputTaxaMetabolicaBasal({ control, errors }: Props) {
  const [textValue, setTextValue] = useState("");

  return (
    <Controller
      control={control}
      name="taxa_metabolica_basal"
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>Taxa Metabólica Basal (kcal)</S.Label>
          <S.Input
            hasError={!!errors.taxa_metabolica_basal}
            keyboardType="numeric"
            placeholder="Ex.: 1500"
            placeholderTextColor={colors.text.placeholder}
            value={value}
            onChangeText={(text) => {
              const onlyNumbers = text.replace(/[^0-9]/g, "");
              setTextValue(onlyNumbers);
              onChange(onlyNumbers === "" ? undefined : parseInt(onlyNumbers, 10));
            }}
          />
          {errors.taxa_metabolica_basal && (
            <S.ErrorText>{errors.taxa_metabolica_basal.message}</S.ErrorText>
          )}
        </S.Section>
      )}
    />
  );
}
