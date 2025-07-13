import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as S from "../../../styles/Register.styles";
import colors from "../../../constants/colors";

type Props = {
  control: any;
  errors: any;
};

export default function InputHoraDoExame({ control, errors }: Props) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <Controller
      control={control}
      name="hora_do_exame"
      render={({ field: { onChange, value } }) => (
        <S.Section>
          <S.Label>Hora do exame</S.Label>
          {Platform.OS === "web" ? (
            <input
              type="time"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              style={{
                height: 30,
                backgroundColor: colors.dark.surface,
                borderRadius: 12,
                padding: 10,
                color: colors.text.inverted,
                border: `1px solid ${errors.hora_do_exame ? "red" : colors.border}`,
                marginBottom: 8,
                fontSize: 16,
                outline: "none",
              }}
            />
          ) : (
            <>
              <S.DatePickerButton
                hasError={!!errors.hora_do_exame}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={{ color: value ? colors.text.primary : colors.text.placeholder }}>
                  {value || "Selecionar hora"}
                </Text>
              </S.DatePickerButton>
              {showTimePicker && (
                <DateTimePicker
                  value={value ? new Date(`1970-01-01T${value}:00`) : new Date()}
                  mode="time"
                  display="default"
                  is24Hour={true}
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) {
                      const hours = selectedTime.getHours().toString().padStart(2, "0");
                      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
                      onChange(`${hours}:${minutes}`);
                    }
                  }}
                />
              )}
            </>
          )}
          {errors.hora_do_exame && (
            <S.ErrorText>{errors.hora_do_exame.message}</S.ErrorText>
          )}
        </S.Section>
      )}
    />
  );
}
