import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";
import {
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";

import { CreateAluno } from "../../schemas/CreateAluno";
import colors from "../../constants/colors";
import {
  formatCPF,
  removeCPFFormatting,
} from "../../utils/cpf/format";
import {
  formatPhoneNumber,
  unformatPhoneNumber,
} from "../../utils/celular/format";
import * as S from "../../styles/Register.styles";

type AlunoFormData = z.infer<typeof CreateAluno>;

export default function RegisterAluno() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AlunoFormData>({
    resolver: zodResolver(CreateAluno),
  });

  const onSubmit = async (data: AlunoFormData) => {
    const cleanData = {
      pessoa: {
        nome: data.nome,
        cpf: removeCPFFormatting(data.cpf),
        data_de_nascimento: data.data_de_nascimento,
        email: data.email,
        numero_de_celular: unformatPhoneNumber(data.numero_de_celular),
        sexo: data.sexo,
        nome_social: data.nome_social,
        etnia: data.etnia,
        estado_civil: data.estado_civil,
      },
      status: true,
      bioimpedancia: data.bioimpedancia,
      altura: data.altura,
      data_do_exame: data.data_do_exame,
      hora_do_exame: data.hora_do_exame,
      agua_corporal_total: data.agua_corporal_total,
      proteinas: data.proteinas,
      minerais: data.minerais,
      gordura_corporal: data.gordura_corporal,
      peso: data.peso,
      massa_muscular_esqueletica: data.massa_muscular_esqueletica,
      imc: data.imc,
      taxa_metabolica_basal: data.taxa_metabolica_basal,
      senha: data.senha
    };

    try {
      setIsLoading(true);
      const existing = await AsyncStorage.getItem("@alunos");
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(cleanData);
      await AsyncStorage.setItem("@alunos", JSON.stringify(parsed));
      Alert.alert("Sucesso", "Aluno cadastrado localmente!");
      reset();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao salvar localmente.");
    } finally {
      setIsLoading(false);
    }
  };
  
  function handleLoginClick() {
    navigation.navigate("LoginAluno" as never);
  }

  function resetForm() {
    reset();
  }

  async function getAlunos() {
    try {
      setIsLoading(true);
      const dados = await AsyncStorage.getItem("@alunos");
      const parsed = dados ? JSON.parse(dados) : [];
      Alert.alert("Sucesso", "Dados carregados. Veja no console.");
      console.log("Alunos:", parsed);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao carregar dados locais.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <S.Container contentContainerStyle={{ paddingBottom: 16 }}>
      <S.LoginButton onPress={handleLoginClick}>
        <S.LoginButtonText>Login</S.LoginButtonText>
      </S.LoginButton>

      <S.Title>
        Cadastro de <S.TitleHighlight>Aluno</S.TitleHighlight>
      </S.Title>

      <S.Section>
        <S.SectionTitle>
          Dados <S.TitleHighlight>Pessoais</S.TitleHighlight>
        </S.SectionTitle>

        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Nome completo</S.Label>
              <S.Input
                hasError={!!errors.nome}
                onChangeText={onChange}
                value={value}
                placeholder="Nome completo"
                placeholderTextColor="#999"
              />
              {errors.nome && <S.ErrorText>{errors.nome.message}</S.ErrorText>}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="nome_social"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Nome Social</S.Label>
              <S.Input
                hasError={!!errors.nome_social}
                onChangeText={onChange}
                value={value}
                placeholder="Nome Social"
                placeholderTextColor="#999"
              />
              {errors.nome_social && (
                <S.ErrorText>{errors.nome_social.message}</S.ErrorText>
              )}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>CPF</S.Label>
              <S.Input
                hasError={!!errors.cpf}
                onChangeText={(text) => {
                  const formatted = formatCPF(text);
                  setValue("cpf", formatted);
                }}
                value={value}
                placeholder="000.000.000-00"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.cpf && <S.ErrorText>{errors.cpf.message}</S.ErrorText>}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="etnia"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Etnia</S.Label>
              <S.StyledPicker selectedValue={value} onValueChange={onChange}>
                <Picker.Item label="Não informado" value="nao_informado" />
                <Picker.Item label="Amarela" value="amarela" />
                <Picker.Item label="Branca" value="branca" />
                <Picker.Item label="Indígena" value="indigena" />
                <Picker.Item label="Parda" value="parda" />
                <Picker.Item label="Preta" value="preta" />
              </S.StyledPicker>
              {errors.etnia && <S.ErrorText>{errors.etnia.message}</S.ErrorText>}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="sexo"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Sexo</S.Label>
              <S.StyledPicker selectedValue={value} onValueChange={onChange}>
                <Picker.Item label="Não informado" value="N" />
                <Picker.Item label="Feminino" value="F" />
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Outro" value="O" />
              </S.StyledPicker>
              {errors.sexo && <S.ErrorText>{errors.sexo.message}</S.ErrorText>}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="data_de_nascimento"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Data de nascimento</S.Label>
              {Platform.OS === "web" ? (
                <input
                  type="date"
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  style={{
                    borderWidth: 1,
                    borderColor: errors.data_de_nascimento
                      ? "red"
                      : colors.secondary.DEFAULT,
                    borderRadius: 4,
                    marginBottom: 8,
                    height: 50,
                    color: colors.text.primary,
                    backgroundColor: colors.white,
                    fontSize: 16,
                    width: "100%",
                    outlineStyle: "none",
                  }}
                />
              ) : (
                <>
                  <S.DatePickerButton
                    hasError={!!errors.data_de_nascimento}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={{ color: value ? colors.text.primary : "#999" }}>
                      {value || "Selecionar data"}
                    </Text>
                  </S.DatePickerButton>

                  {showDatePicker && (
                    <DateTimePicker
                      value={value ? new Date(value) : new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          const formattedDate = selectedDate
                            .toISOString()
                            .split("T")[0];
                          onChange(formattedDate);
                        }
                      }}
                    />
                  )}
                </>
              )}
              {errors.data_de_nascimento && (
                <S.ErrorText>{errors.data_de_nascimento.message}</S.ErrorText>
              )}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>E-mail</S.Label>
              <S.Input
                hasError={!!errors.email}
                onChangeText={onChange}
                value={value}
                placeholder="email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              {errors.email && <S.ErrorText>{errors.email.message}</S.ErrorText>}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="numero_de_celular"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Celular</S.Label>
              <S.Input
                hasError={!!errors.numero_de_celular}
                onChangeText={(text) => {
                  const formatted = formatPhoneNumber(text);
                  setValue("numero_de_celular", formatted);
                }}
                value={value}
                keyboardType="phone-pad"
                placeholder="(00) 00000-0000"
                placeholderTextColor="#999"
              />
              {errors.numero_de_celular && (
                <S.ErrorText>{errors.numero_de_celular.message}</S.ErrorText>
              )}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="estado_civil"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Estado Civil</S.Label>
              <S.StyledPicker selectedValue={value} onValueChange={onChange}>
                <Picker.Item label="Não informado" value="nao_informado" />
                <Picker.Item label="Casado" value="casado" />
                <Picker.Item label="Divorciado" value="divorciado" />
                <Picker.Item label="Solteiro" value="solteiro" />
                <Picker.Item label="União estável" value="uniao_estavel" />
                <Picker.Item label="Viúvo" value="viuvo" />
              </S.StyledPicker>
              {errors.estado_civil && (
                <S.ErrorText>{errors.estado_civil.message}</S.ErrorText>
              )}
            </S.Section>
          )}
        />
      </S.Section>

      <S.Section>
        <S.SectionTitle>
          Dados de <S.TitleHighlight>Saúde</S.TitleHighlight>
        </S.SectionTitle>

        <Controller
          control={control}
          name="altura"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Altura</S.Label>
              <S.Input
                hasError={!!errors.altura}
                value={value !== undefined && value !== null ? String(value) : ""}
                onChangeText={(text) => {
                  const normalizedText = text.replace(",", ".");
                  const numericValue = parseFloat(normalizedText);
                  if (!isNaN(numericValue)) {
                    onChange(numericValue);
                  } else {
                    onChange(undefined);
                  }
                }}
                placeholder="1.70"
                keyboardType="default"
                placeholderTextColor="#999"
              />
              {errors.altura && <S.ErrorText>{errors.altura.message}</S.ErrorText>}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="peso"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Peso</S.Label>
              <S.Input
                hasError={!!errors.peso}
                value={value !== undefined && value !== null ? String(value) : ""}
                onChangeText={(text) => {
                  const numericValue = parseFloat(text.replace(",", "."));
                  if (!isNaN(numericValue)) {
                    onChange(numericValue);
                  } else {
                    onChange(undefined);
                  }
                }}
                placeholder="70.50"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.peso && <S.ErrorText>{errors.peso.message}</S.ErrorText>}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="bioimpedancia"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Bioimpedância (%)</S.Label>
              <S.Input
                hasError={!!errors.bioimpedancia}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, "").replace(",", ".");
                  onChange(numeric);
                }}
                value={value}
                placeholder="Ex: 15.2"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.bioimpedancia && (
                <S.ErrorText>{errors.bioimpedancia.message}</S.ErrorText>
              )}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="imc"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>IMC</S.Label>
              <S.Input
                hasError={!!errors.imc}
                value={value !== undefined && value !== null ? String(value) : ""}
                onChangeText={(text) => {
                  const numericValue = parseFloat(text.replace(",", "."));
                  if (!isNaN(numericValue)) {
                    onChange(numericValue);
                  }
                }}
                placeholder="22.5"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.imc && <S.ErrorText>{errors.imc.message}</S.ErrorText>}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="data_do_exame"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>Data do exame</S.Label>
              {Platform.OS === "web" ? (
                <input
                  type="date"
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  style={{
                    borderWidth: 1,
                    borderColor: errors.data_do_exame ? "red" : colors.secondary.DEFAULT,
                    borderRadius: 4,
                    marginBottom: 8,
                    height: 50,
                    color: colors.text.primary,
                    backgroundColor: colors.white,
                    fontSize: 16,
                    width: "100%",
                    outlineStyle: "none",
                  }}
                />
              ) : (
                <>
                  <S.PickerWrapper
                    hasError={!!errors.data_do_exame}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={{ color: value ? colors.text.primary : "#999" }}>
                      {value || "Selecionar data"}
                    </Text>
                  </S.PickerWrapper>
                  {showDatePicker && (
                    <DateTimePicker
                      value={value ? new Date(value) : new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          const formattedDate = selectedDate.toISOString().split("T")[0];
                          onChange(formattedDate);
                        }
                      }}
                    />
                  )}
                </>
              )}
              {errors.data_do_exame && (
                <S.ErrorText>{errors.data_do_exame.message}</S.ErrorText>
              )}
            </S.Section>
          )}
        />

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
                    borderWidth: 1,
                    borderColor: errors.hora_do_exame ? "red" : colors.secondary.DEFAULT,
                    borderRadius: 4,
                    marginBottom: 8,
                    height: 50,
                    color: colors.text.primary,
                    backgroundColor: colors.white,
                    fontSize: 16,
                    width: "100%",
                    outlineStyle: "none",
                  }}
                />
              ) : (
                <>
                  <S.DatePickerButton
                    hasError={!!errors.hora_do_exame}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text style={{ color: value ? colors.text.primary : "#999" }}>
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

        <Controller
          control={control}
          name="agua_corporal_total"
          render={({ field: { onChange, value } }) => (
            <>
              <S.Label>Água Corporal Total (%)</S.Label>
              <S.Input
                hasError={!!errors.agua_corporal_total}
                keyboardType="numeric"
                placeholder="Ex: 55.3"
                placeholderTextColor="#999"
                value={value?.toString() ?? ""}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, "").replace(",", ".");
                  onChange(numeric);
                }}
              />
              {errors.agua_corporal_total && (
                <S.ErrorText>{errors.agua_corporal_total.message}</S.ErrorText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="gordura_corporal"
          render={({ field: { onChange, value } }) => (
            <>
              <S.Label>Gordura Corporal (%)</S.Label>
              <S.Input
                hasError={!!errors.gordura_corporal}
                keyboardType="numeric"
                placeholder="Ex: 18.2"
                placeholderTextColor="#999"
                value={value?.toString() ?? ""}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, "").replace(",", ".");
                  onChange(numeric);
                }}
              />
              {errors.gordura_corporal && (
                <S.ErrorText>{errors.gordura_corporal.message}</S.ErrorText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="massa_muscular_esqueletica"
          render={({ field: { onChange, value } }) => (
            <>
              <S.Label>Massa Muscular Esquelética (%)</S.Label>
              <S.Input
                hasError={!!errors.massa_muscular_esqueletica}
                keyboardType="numeric"
                placeholder="Ex: 40.0"
                placeholderTextColor="#999"
                value={value?.toString() ?? ""}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, "").replace(",", ".");
                  onChange(numeric);
                }}
              />
              {errors.massa_muscular_esqueletica && (
                <S.ErrorText>{errors.massa_muscular_esqueletica.message}</S.ErrorText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="taxa_metabolica_basal"
          render={({ field: { onChange, value } }) => (
            <>
              <S.Label>Taxa Metabólica Basal (kcal)</S.Label>
              <S.Input
                hasError={!!errors.taxa_metabolica_basal}
                keyboardType="numeric"
                placeholder="Ex: 1500"
                placeholderTextColor="#999"
                value={value?.toString() ?? ""}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9]/g, "");
                  onChange(numeric);
                }}
              />
              {errors.taxa_metabolica_basal && (
                <S.ErrorText>{errors.taxa_metabolica_basal.message}</S.ErrorText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="proteinas"
          render={({ field: { onChange, value } }) => (
            <>
              <S.Label>Proteína (%)</S.Label>
              <S.Input
                hasError={!!errors.proteinas}
                keyboardType="numeric"
                placeholder="Ex: 15.0"
                placeholderTextColor="#999"
                value={value?.toString() ?? ""}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, "").replace(",", ".");
                  onChange(numeric);
                }}
              />
              {errors.proteinas && <S.ErrorText>{errors.proteinas.message}</S.ErrorText>}
            </>
          )}
        />

        <Controller
          control={control}
          name="minerais"
          render={({ field: { onChange, value } }) => (
            <>
              <S.Label>Minerais (%)</S.Label>
              <S.Input
                hasError={!!errors.minerais}
                keyboardType="numeric"
                placeholder="Ex: 5.0"
                placeholderTextColor="#999"
                value={value?.toString() ?? ""}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, "").replace(",", ".");
                  onChange(numeric);
                }}
              />
              {errors.minerais && <S.ErrorText>{errors.minerais.message}</S.ErrorText>}
            </>
          )}
        />
      </S.Section>

      <S.Buttons>
        <S.SubmitButton onPress={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <S.ButtonText>Cadastrar</S.ButtonText>
          )}
        </S.SubmitButton>

        <S.GetButton onPress={getAlunos} disabled={isLoading}>
          <S.ButtonText>Carregar Alunos</S.ButtonText>
        </S.GetButton>

        <S.ResetButton onPress={resetForm} disabled={isLoading}>
          <S.ButtonText>Resetar</S.ButtonText>
        </S.ResetButton>
      </S.Buttons>
      
    </S.Container>
  );
}