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
import { saveAluno , getAlunos } from '../../services/storageService';

type AlunoFormData = z.infer<typeof CreateAluno>;

export default function RegisterAluno() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [textValueAltura, setTextValueAltura] = React.useState("");
  const [textValuePeso, setTextValuePeso] = React.useState("");
  const [textValueBio, setTextValueBio] = React.useState("");
  const [textValueImc, setTextValueImc] = React.useState("");
  const [textValueAguaCorporalTotal, setTextValueAguaCorporalTotal] = React.useState("");
  const [textValueGorduraCorporal, setTextValueGorduraCorporal] = React.useState("");
  const [textValueMassaMuscularEsqueletica, setTextValueMassaMuscularEsqueletica] = React.useState("");
  const [textValueTaxaMetabolicaBasal, setTextValueTaxaMetabolicaBasal] = React.useState("");
  const [textValueProteinas, setTextValueProteinas] = React.useState("");
  const [textValueMinerais, setTextValueMinerais] = React.useState("");

  const {
    control,
    handleSubmit,
    reset,
    setValue,
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
      senha: data.senha,
    };

    try {
      setIsLoading(true);
      await saveAluno(cleanData);
      Alert.alert("Sucesso", "Aluno cadastrado localmente!");
      reset();
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message === 'CPF já cadastrado') {
        Alert.alert("Erro", "Já existe um aluno com este CPF.");
      } else {
        Alert.alert("Erro", "Falha ao salvar localmente.");
      }
    } finally {
      setIsLoading(false);
    }
    
  };
  
  async function handleGetAlunos() {
    try {
      setIsLoading(true);
      const alunos = await getAlunos();
      Alert.alert("Sucesso", "Dados carregados. Veja no console.");
      console.log("Alunos:", alunos);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao carregar dados locais.");
    } finally {
      setIsLoading(false);
    }
  }
  
  function handleLoginClick() {
    navigation.navigate("LoginAluno" as never);
  }

  function resetForm() {
    reset();
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
                value={textValueAltura}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setTextValueAltura(text);
                    if (text === "" || text === ".") {
                      onChange(undefined);
                    } else {
                      onChange(parseFloat(text));
                    }
                  }
                }}
                placeholder="1.70"
                keyboardType="decimal-pad"
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
                value={textValuePeso}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setTextValuePeso(text);
                    if (text === "" || text === ".") {
                      onChange(undefined);
                    } else {
                      onChange(parseFloat(text));
                    }
                  }
                }}
                placeholder="70.50"
                keyboardType="decimal-pad"
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
                value={textValueBio}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setTextValueBio(text);
                    if (text === "" || text === ".") {
                      onChange(undefined);
                    } else {
                      onChange(parseFloat(text));
                    }
                  }
                }}
                placeholder="Ex: 15.2"
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
              {errors.bioimpedancia && (
                <S.ErrorText>{errors.bioimpedancia.message}</S.ErrorText>
              )}
            </S.Section>
          )}
        />

        {/* IMC */}
        <Controller
          control={control}
          name="imc"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>IMC</S.Label>
              <S.Input
                hasError={!!errors.imc}
                value={textValueImc}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setTextValueImc(text);
                    if (text === "" || text === ".") {
                      onChange(undefined);
                    } else {
                      onChange(parseFloat(text));
                    }
                  }
                }}
                placeholder="22.5"
                keyboardType="decimal-pad"
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
          render={({ field: { onChange } }) => (
            <>
              <S.Label>Água Corporal Total (%)</S.Label>
              <S.Input
                hasError={!!errors.agua_corporal_total}
                keyboardType="decimal-pad"
                placeholder="Ex: 55.3"
                placeholderTextColor="#999"
                value={textValueAguaCorporalTotal}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setTextValueAguaCorporalTotal(text);
                    if (text === "" || text === ".") {
                      onChange(undefined);
                    } else {
                      onChange(parseFloat(text));
                    }
                  }
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
          render={({ field: { onChange } }) => (
            <>
              <S.Label>Gordura Corporal (%)</S.Label>
              <S.Input
                hasError={!!errors.gordura_corporal}
                keyboardType="decimal-pad"
                placeholder="Ex: 18.2"
                placeholderTextColor="#999"
                value={textValueGorduraCorporal}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setTextValueGorduraCorporal(text);
                    if (text === "" || text === ".") {
                      onChange(undefined);
                    } else {
                      onChange(parseFloat(text));
                    }
                  }
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
          render={({ field: { onChange } }) => (
            <>
              <S.Label>Massa Muscular Esquelética (%)</S.Label>
              <S.Input
                hasError={!!errors.massa_muscular_esqueletica}
                keyboardType="decimal-pad"
                placeholder="Ex: 40.0"
                placeholderTextColor="#999"
                value={textValueMassaMuscularEsqueletica}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setTextValueMassaMuscularEsqueletica(text);
                    if (text === "" || text === ".") {
                      onChange(undefined);
                    } else {
                      onChange(parseFloat(text));
                    }
                  }
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
          render={({ field: { onChange } }) => (
            <>
              <S.Label>Taxa Metabólica Basal (kcal)</S.Label>
              <S.Input
                hasError={!!errors.taxa_metabolica_basal}
                keyboardType="numeric"
                placeholder="Ex: 1500"
                placeholderTextColor="#999"
                value={textValueTaxaMetabolicaBasal}
                onChangeText={(text) => {
                  const onlyNumbers = text.replace(/[^0-9]/g, "");
                  setTextValueTaxaMetabolicaBasal(onlyNumbers);
                  onChange(onlyNumbers === "" ? undefined : parseInt(onlyNumbers, 10));
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
          render={({ field: { onChange } }) => (
            <>
              <S.Label>Proteína (%)</S.Label>
              <S.Input
                hasError={!!errors.proteinas}
                keyboardType="decimal-pad"
                placeholder="Ex: 15.0"
                placeholderTextColor="#999"
                value={textValueProteinas}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setTextValueProteinas(text);
                    if (text === "" || text === ".") {
                      onChange(undefined);
                    } else {
                      onChange(parseFloat(text));
                    }
                  }
                }}
              />
              {errors.proteinas && (
                <S.ErrorText>{errors.proteinas.message}</S.ErrorText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="minerais"
          render={({ field: { onChange } }) => (
            <>
              <S.Label>Minerais (%)</S.Label>
              <S.Input
                hasError={!!errors.minerais}
                keyboardType="decimal-pad"
                placeholder="Ex: 5.0"
                placeholderTextColor="#999"
                value={textValueMinerais}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setTextValueMinerais(text);
                    if (text === "" || text === ".") {
                      onChange(undefined);
                    } else {
                      onChange(parseFloat(text));
                    }
                  }
                }}
              />
              {errors.minerais && (
                <S.ErrorText>{errors.minerais.message}</S.ErrorText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <S.Section>
              <S.Label>Senha</S.Label>
              <S.Input
                hasError={!!error}
                placeholder="Digite sua senha"
                placeholderTextColor={colors.text.placeholder}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {error && <S.ErrorText>{error.message}</S.ErrorText>}
            </S.Section>
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

        <S.GetButton onPress={handleGetAlunos} disabled={isLoading}>
          <S.ButtonText>Carregar Alunos</S.ButtonText>
        </S.GetButton>

        <S.ResetButton onPress={resetForm} disabled={isLoading}>
          <S.ButtonText>Resetar</S.ButtonText>
        </S.ResetButton>
      </S.Buttons>
      
    </S.Container>
  );
}