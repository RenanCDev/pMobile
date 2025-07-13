import React, { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";
import * as S from "../../styles/Register.styles";
import colors from "../../constants/colors";

type Props = {
  control: any;
  name: string;
  label: string;
  errors: any;
};

export default function DatePickerField({ control, name, label, errors }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>{label}</S.Label>

          {Platform.OS === "web" ? (
            <input
              type="date"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              style={{
                height: 50,
                backgroundColor: colors.dark.surface,
                borderRadius: 12,
                padding: 10,
                color: colors.text.inverted,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: errors.data_de_nascimento ? "red" : colors.border,
                marginBottom: 8,
                fontSize: 16,
                outlineStyle: "none",
              }}
            />
          ) : (
            <>
              <S.DatePickerButton
                onPress={() => setShowPicker(true)}
                hasError={!!errors[name]}
              >
                <S.ButtonText style={{ color: value ? colors.text.inverted : "#999" }}>
                  {value || "Selecionar data"}
                </S.ButtonText>
              </S.DatePickerButton>

              {showPicker && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(_, selectedDate) => {
                    setShowPicker(false);
                    if (selectedDate) {
                      const formatted = selectedDate.toISOString().split("T")[0];
                      onChange(formatted);
                    }
                  }}
                />
              )}
            </>
          )}

          {errors[name] && <S.ErrorText>{errors[name].message}</S.ErrorText>}
        </S.Section>
      )}
    />
  );
}
