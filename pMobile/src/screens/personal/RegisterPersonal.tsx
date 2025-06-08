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

type PersonalFormData = z.infer<typeof CreatePersonal>;

export default function RegisterPersonal() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PersonalFormData>({
    resolver: zodResolver(CreatePersonal),
  });

  function handleLoginClick() {
    navigation.navigate("LoginPersonal" as never);
  }

  function resetForm() {
    reset();
  }

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
      const existing = await AsyncStorage.getItem("@personais");
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(cleanData);

      console.log("Dados a salvar:", parsed);

      await AsyncStorage.setItem("@personais", JSON.stringify(parsed));

      const check = await AsyncStorage.getItem("@personais");
      console.log("Dados salvos:", check);

      Alert.alert("Sucesso", "Personal cadastrado localmente!");
      reset();
    } catch (err) {
      console.error("Erro ao salvar:", err);
      Alert.alert("Erro", "Falha ao salvar localmente.");
    } finally {
      setIsLoading(false);
    }
  };

  async function getPersonais() {
    try {
      setIsLoading(true);
      const dados = await AsyncStorage.getItem("@personais");
      const parsed = dados ? JSON.parse(dados) : [];
      Alert.alert("Sucesso", "Dados carregados. Veja no console.");
      console.log("Personais:", parsed);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao carregar dados locais.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLoginClick}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        Cadastro de <Text style={styles.titleHighlight}>Personal</Text>
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Dados <Text style={styles.titleHighlight}>Pessoais</Text>
        </Text>

        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Nome completo</Text>
              <TextInput
                style={[styles.input, errors.nome && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                placeholder="Nome completo"
                placeholderTextColor="#999"
              />
              {errors.nome && (
                <Text style={styles.errorText}>{errors.nome.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="nome_social"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Nome Social</Text>
              <TextInput
                style={[styles.input, errors.nome_social && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                placeholder="Nome Social"
                placeholderTextColor="#999"
              />
              {errors.nome_social && (
                <Text style={styles.errorText}>{errors.nome_social.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>CPF</Text>
              <TextInput
                style={[styles.input, errors.cpf && styles.errorInput]}
                onChangeText={(text) => {
                  const formatted = formatCPF(text);
                  onChange(formatted);
                }}
                value={value}
                placeholder="000.000.000-00"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.cpf && (
                <Text style={styles.errorText}>{errors.cpf.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="etnia"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Etnia</Text>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="Não informado" value="nao_informado" />
                <Picker.Item label="Amarela" value="amarela" />
                <Picker.Item label="Branca" value="branca" />
                <Picker.Item label="Indígena" value="indigena" />
                <Picker.Item label="Parda" value="parda" />
                <Picker.Item label="Preta" value="preta" />
              </Picker>
              {errors.etnia && (
                <Text style={styles.errorText}>{errors.etnia.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="sexo"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Sexo</Text>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="Não informado" value="N" />
                <Picker.Item label="Feminino" value="F" />
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Outro" value="O" />
              </Picker>
              {errors.sexo && (
                <Text style={styles.errorText}>{errors.sexo.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="data_de_nascimento"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Data de nascimento</Text>

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
                  <TouchableOpacity
                    style={[
                      styles.picker,
                      errors.data_de_nascimento && styles.errorInput,
                      { justifyContent: "center", paddingHorizontal: 10 },
                    ]}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={{ color: value ? colors.text.primary : "#999" }}>
                      {value || "Selecionar data"}
                    </Text>
                  </TouchableOpacity>

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
                <Text style={styles.errorText}>
                  {errors.data_de_nascimento.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>E-mail</Text>
              <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                placeholder="email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="numero_de_celular"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Celular</Text>
              <TextInput
                style={[styles.input, errors.numero_de_celular && styles.errorInput]}
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
                <Text style={styles.errorText}>{errors.numero_de_celular.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="estado_civil"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Estado Civil</Text>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="Não informado" value="nao_informado" />
                <Picker.Item label="Casado" value="casado" />
                <Picker.Item label="Divorciado" value="divorciado" />
                <Picker.Item label="Solteiro" value="solteiro" />
                <Picker.Item label="União estável" value="uniao_estavel" />
                <Picker.Item label="Viúvo" value="viuvo" />
              </Picker>
              {errors.estado_civil && (
                <Text style={styles.errorText}>{errors.estado_civil.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="cref"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>CREF</Text>
              <TextInput
                style={[styles.input, errors.cref && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                placeholder="CREF"
                placeholderTextColor="#999"
              />
              {errors.cref && (
                <Text style={styles.errorText}>{errors.cref.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <Controller
        control={control}
        name="agencia"
        render={({ field: { onChange, value } }) => (
          <>
            <Text>Agência</Text>
            <TextInput
              style={[styles.input, errors.agencia && styles.errorInput]}
              onChangeText={(text) => {
                const numericValue = text.replace(/\D/g, "");
                onChange(numericValue ? Number(numericValue) : undefined);
              }}
              value={value !== undefined ? String(value) : ""}
              placeholder="Agência"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            {errors.agencia && (
              <Text style={styles.errorText}>{errors.agencia.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="numero_conta"
        render={({ field: { onChange, value } }) => (
          <>
            <Text>Número da conta</Text>
            <TextInput
              style={[styles.input, errors.numero_conta && styles.errorInput]}
              onChangeText={(text) => {
                const numericValue = text.replace(/\D/g, "");
                onChange(numericValue ? Number(numericValue) : undefined);
              }}
              value={value !== undefined ? String(value) : ""}
              placeholder="Número da conta"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            {errors.numero_conta && (
              <Text style={styles.errorText}>{errors.numero_conta.message}</Text>
            )}
          </>
        )}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Experiência <Text style={styles.titleHighlight}>Profissional</Text>
        </Text>

        <Controller
          control={control}
          name="experiencia_profissional"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Experiência</Text>
              <TextInput
                style={[styles.inputMultiline, errors.experiencia_profissional && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={4}
                placeholder="Conte-nos sobre sua experiência profissional"
                placeholderTextColor="#999"
              />
              {errors.experiencia_profissional && (
                <Text style={styles.errorText}>
                  {errors.experiencia_profissional.message}
                </Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Especialidades <Text style={styles.titleHighlight}>(separe por vírgula)</Text>
        </Text>

        <Controller
          control={control}
          name="especialidades"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Especialidades</Text>
              <TextInput
                style={[styles.inputMultiline, errors.especialidades && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={2}
                placeholder="Ex: Musculação, Yoga, Pilates"
                placeholderTextColor="#999"
              />
              {errors.especialidades && (
                <Text style={styles.errorText}>{errors.especialidades.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Horários <Text style={styles.titleHighlight}>Disponíveis</Text>
        </Text>
        <Controller
          control={control}
          name="horarios_disponiveis"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Horários disponíveis</Text>
              <TextInput
                style={[
                  styles.inputMultiline,
                  errors.horarios_disponiveis && styles.errorInput,
                ]}
                onChangeText={(text) => {
                
                  const onlyNumbersAndCommas = text.replace(/[^0-9,]/g, "");
                  onChange(onlyNumbersAndCommas);
                }}
                value={value !== undefined ? String(value) : ""}
                multiline
                numberOfLines={2}
                keyboardType="numeric"
                placeholder="Ex: 123,456,789"
                placeholderTextColor="#999"
              />
              {errors.horarios_disponiveis && (
                <Text style={styles.errorText}>
                  {errors.horarios_disponiveis.message}
                </Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Locais <Text style={styles.titleHighlight}>Disponíveis</Text>
        </Text>

        <Controller
          control={control}
          name="locais_disponiveis"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Locais disponíveis</Text>
              <TextInput
                style={[styles.inputMultiline, errors.locais_disponiveis && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={2}
                placeholder="Ex: Academia X, Parque Y"
                placeholderTextColor="#999"
              />
              {errors.locais_disponiveis && (
                <Text style={styles.errorText}>{errors.locais_disponiveis.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ marginBottom: 4, color: colors.text.primary }}>Senha</Text>
              <TextInput
                style={{
                  backgroundColor: colors.white,
                  borderColor: error ? colors.status.error : colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                  color: colors.text.primary,
                }}
                placeholder="Digite sua senha"
                placeholderTextColor={colors.text.muted}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {error && (
                <Text style={{ color: colors.status.error, marginTop: 4 }}>
                  {error.message}
                </Text>
              )}
            </View>
          )}
          />

      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.getButton]}
          onPress={getPersonais}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Carregar Personais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetForm}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  loginBtn: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  loginBtnText: {
    color: colors.primary.DEFAULT,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.text.primary,
  },
  titleHighlight: {
    color: colors.primary.DEFAULT,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: colors.text.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary.DEFAULT,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    color: colors.text.primary,
    backgroundColor: colors.white,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: colors.secondary.DEFAULT,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    textAlignVertical: "top",
    color: colors.text.primary,
    backgroundColor: colors.white,
  },
  picker: {
    borderWidth: 1,
    borderColor: colors.secondary.DEFAULT,
    borderRadius: 4,
    marginBottom: 8,
    height: 50,
    color: colors.text.primary,
    backgroundColor: colors.white,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    marginHorizontal: 4,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: colors.primary.DEFAULT,
  },
  getButton: {
    backgroundColor: colors.secondary.DEFAULT,
  },
  resetButton: {
    backgroundColor: colors.dark.background,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  errorText: {
    color: colors.dark.background,
    marginBottom: 8,
  },
  errorInput: {
    borderColor: colors.dark.background,
  },
});
