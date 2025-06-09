import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";

import { CreatePersonal } from "../../schemas/CreatePersonal";
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
import { savePersonal , getPersonals } from '../../services/storageService';

type PersonalFormData = z.infer<typeof CreatePersonal>;

export default function RegisterPersonal() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalFormData>({
    resolver: zodResolver(CreatePersonal),
  });
  
  const onSubmit = async (data: PersonalFormData) => {
    const cleanData = {
      id: Date.now(),
      dados_bancarios: {
        numero_conta: data.numero_conta,
        agencia: data.agencia,
      },
      nome: data.nome,
      cpf: removeCPFFormatting(data.cpf),
      data_de_nascimento: data.data_de_nascimento,
      email: data.email,
      numero_de_celular: unformatPhoneNumber(data.numero_de_celular),
      sexo: data.sexo,
      nome_social: data.nome_social || null,
      etnia: data.etnia,
      estado_civil: data.estado_civil,
      status: true,
      cref: data.cref,
      especialidades: data.especialidades,
      experiencia_profissional: data.experiencia_profissional,
      horarios_disponiveis: data.horarios_disponiveis,
      locais_disponiveis: data.locais_disponiveis,
      senha: data.senha,
    };

    try {
      setIsLoading(true);
      await savePersonal(cleanData);
      Alert.alert("Sucesso", "Personal cadastrado localmente!");
      reset();
    } catch (err) {
      console.error("Erro ao salvar:", err);
      Alert.alert("Erro", "Falha ao salvar localmente.");
    } finally {
      setIsLoading(false);
    }
  };

  async function loadPersonals() {
    try {
      setIsLoading(true);
      const personals = await getPersonals();
      Alert.alert("Sucesso", "Dados carregados. Veja no console.");
      console.log("Personais:", personals);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao carregar dados locais.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLoginClick() {
    navigation.navigate("LoginPersonal" as never);
  }

  function resetForm() {
    reset();
  }

  return (
    <S.Container>
      <S.LoginButton onPress={handleLoginClick}>
        <S.LoginButtonText>Login</S.LoginButtonText>
      </S.LoginButton>

      <S.Title>
        Cadastro de <S.TitleHighlight>Personal</S.TitleHighlight>
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
              <S.TitleHighlight>Nome completo</S.TitleHighlight>
              <S.Input
                onChangeText={onChange}
                value={value}
                placeholder="Nome completo"
                placeholderTextColor="#999"
                style={errors.nome && { borderColor: colors.dark.background }}
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
              <S.TitleHighlight>Nome Social</S.TitleHighlight>
              <S.Input
                onChangeText={onChange}
                value={value}
                placeholder="Nome Social"
                placeholderTextColor="#999"
                hasError={!!errors.nome_social}
              />
              {errors.nome_social && <S.ErrorText>{errors.nome_social.message}</S.ErrorText>}
            </S.Section>
          )}
        />

        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.TitleHighlight>CPF</S.TitleHighlight>
              <S.Input
                onChangeText={(text) => {
                  const formatted = formatCPF(text);
                  onChange(formatted);
                }}
                value={value}
                placeholder="000.000.000-00"
                keyboardType="numeric"
                placeholderTextColor="#999"
                hasError={!!errors.cpf}  // aqui a prop para borda vermelha
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
              <S.TitleHighlight>Etnia</S.TitleHighlight>
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
              <S.TitleHighlight>Sexo</S.TitleHighlight>
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
              <S.TitleHighlight>Data de nascimento</S.TitleHighlight>

              {Platform.OS === "web" ? (
                <input
                  type="date"
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  style={{
                    borderWidth: 1,
                    borderColor: errors.data_de_nascimento ? "red" : colors.secondary.DEFAULT,
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
                  <S.StyledPicker
                    as={TouchableOpacity}
                    style={[
                      errors.data_de_nascimento && { borderColor: colors.dark.background },
                      { justifyContent: "center", paddingHorizontal: 10 },
                    ]}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <S.ButtonText style={{ color: value ? colors.text.primary : "#999" }}>
                      {value || "Selecionar data"}
                    </S.ButtonText>
                  </S.StyledPicker>

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
              <S.TitleHighlight>E-mail</S.TitleHighlight>
              <S.Input
                onChangeText={onChange}
                value={value}
                placeholder="email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
                hasError={!!errors.email} // borda vermelha se erro
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
              <S.TitleHighlight>Celular</S.TitleHighlight>
              <S.Input
                onChangeText={(text) => {
                  const formatted = formatPhoneNumber(text);
                  onChange(formatted);
                }}
                value={value}
                keyboardType="phone-pad"
                placeholder="(00) 00000-0000"
                placeholderTextColor="#999"
                hasError={!!errors.numero_de_celular}
              />
              {errors.numero_de_celular && (
                <S.ErrorText>{errors.numero_de_celular.message}</S.ErrorText>
              )}
            </S.Section>
          )}
        />

        <S.Section>
          <Controller
            control={control}
            name="estado_civil"
            render={({ field: { onChange, value } }) => (
              <>
                <S.Label>Estado Civil</S.Label>
                <S.StyledPicker
                  selectedValue={value}
                  onValueChange={onChange}
                  mode="dropdown"
                  // adicione props extras se precisar
                >
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
              </>
            )}
          />

          <Controller
            control={control}
            name="cref"
            render={({ field: { onChange, value } }) => (
              <>
                <S.Label>CREF</S.Label>
                <S.Input
                  onChangeText={onChange}
                  value={value}
                  placeholder="CREF"
                  placeholderTextColor="#999"
                  hasError={!!errors.cref}
                />
                {errors.cref && <S.ErrorText>{errors.cref.message}</S.ErrorText>}
              </>
            )}
          />

          <Controller
            control={control}
            name="agencia"
            render={({ field: { onChange, value } }) => (
              <>
                <S.Label>Agência</S.Label>
                <S.Input
                  onChangeText={(text) => {
                    const numericValue = text.replace(/\D/g, "");
                    onChange(numericValue ? Number(numericValue) : undefined);
                  }}
                  value={value !== undefined ? String(value) : ""}
                  placeholder="Agência"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                  hasError={!!errors.agencia}
                />
                {errors.agencia && <S.ErrorText>{errors.agencia.message}</S.ErrorText>}
              </>
            )}
          />

          <Controller
            control={control}
            name="numero_conta"
            render={({ field: { onChange, value } }) => (
              <>
                <S.Label>Número da conta</S.Label>
                <S.Input
                  onChangeText={(text) => {
                    const numericValue = text.replace(/\D/g, "");
                    onChange(numericValue ? Number(numericValue) : undefined);
                  }}
                  value={value !== undefined ? String(value) : ""}
                  placeholder="Número da conta"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                  hasError={!!errors.numero_conta}
                />
                {errors.numero_conta && (
                  <S.ErrorText>{errors.numero_conta.message}</S.ErrorText>
                )}
              </>
            )}
          />

        </S.Section>

        <S.Section>
          <S.SectionTitle>
            Experiência <S.TitleHighlight>Profissional</S.TitleHighlight>
          </S.SectionTitle>
        </S.Section>

        <Controller
          control={control}
          name="experiencia_profissional"
          render={({ field: { onChange, value } }) => (
            <>
              <S.Label>Experiência</S.Label>
              <S.InputMultiline
                onChangeText={onChange}
                value={value}
                placeholder="Conte-nos sobre sua experiência profissional"
                placeholderTextColor="#999"
              />
              {errors.experiencia_profissional && (
                <S.ErrorText>{errors.experiencia_profissional.message}</S.ErrorText>
              )}
            </>
          )}
        />

        <S.Section>
          <S.SectionTitle>
            Especialidades <S.TitleHighlight>(separe por vírgula)</S.TitleHighlight>
          </S.SectionTitle>

          <Controller
            control={control}
            name="especialidades"
            render={({ field: { onChange, value } }) => (
              <>
                <S.Label>Especialidades</S.Label>
                <S.InputMultiline
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ex: Musculação, Yoga, Pilates"
                  placeholderTextColor="#999"
                />
                {errors.especialidades && (
                  <S.ErrorText>{errors.especialidades.message}</S.ErrorText>
                )}
              </>
            )}
          />
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            Horários <S.TitleHighlight>Disponíveis</S.TitleHighlight>
          </S.SectionTitle>

          <Controller
            control={control}
            name="horarios_disponiveis"
            render={({ field: { onChange, value } }) => (
              <>
                <S.Label>Horários disponíveis</S.Label>
                <S.InputMultiline
                  onChangeText={(text) => {
                    const onlyNumbersAndCommas = text.replace(/[^0-9,]/g, "");
                    onChange(onlyNumbersAndCommas);
                  }}
                  value={value !== undefined ? String(value) : ""}
                  placeholder="Ex: 123,456,789"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
                {errors.horarios_disponiveis && (
                  <S.ErrorText>{errors.horarios_disponiveis.message}</S.ErrorText>
                )}
              </>
            )}
          />
        </S.Section>
      </S.Section>

      <S.Section>
        <S.SectionTitle>
          Locais <S.TitleHighlight>Disponíveis</S.TitleHighlight>
        </S.SectionTitle>

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
                placeholderTextColor="#999"
                numberOfLines={2}
              />
              {error && <S.ErrorText>{error.message}</S.ErrorText>}
            </S.Section>
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
                placeholderTextColor="#999"
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

        <S.GetButton onPress={loadPersonals} disabled={isLoading}>
          <S.ButtonText>Carregar Personais</S.ButtonText>
        </S.GetButton>

        <S.ResetButton onPress={resetForm} disabled={isLoading}>
          <S.ButtonText>Resetar</S.ButtonText>
        </S.ResetButton>
      </S.Buttons>
    </S.Container>  
  );
}