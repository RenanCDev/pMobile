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

  function handleLoginClick() {
    navigation.navigate("LoginAluno" as never);
  }

  function resetForm() {
    reset();
  }

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
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLoginClick}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        Cadastro de <Text style={styles.titleHighlight}>Aluno</Text>
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
                  setValue("cpf", formatted);
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
          name="altura"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Altura</Text>
              <TextInput
                style={[styles.input, errors.altura && styles.errorInput]}
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
              {errors.altura && (
                <Text style={styles.errorText}>{errors.altura.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="peso"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Peso</Text>
              <TextInput
                style={[styles.input, errors.peso && styles.errorInput]}
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
              {errors.peso && <Text style={styles.errorText}>{errors.peso.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="bioimpedancia"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Bioimpedância (%)</Text>
              <TextInput
                style={[styles.input, errors.bioimpedancia && styles.errorInput]}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, '').replace(',', '.');
                  onChange(numeric);
                }}
                value={value}
                placeholder="Ex: 15.2"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.bioimpedancia && <Text style={styles.errorText}>{errors.bioimpedancia.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="imc"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>IMC</Text>
              <TextInput
                style={[styles.input, errors.imc && styles.errorInput]}
                value={value !== undefined && value !== null ? String(value) : ""}
                onChangeText={(text) => {
                  const numericValue = parseFloat(text.replace(",", "."));
                  if (!isNaN(numericValue)) {
                    onChange(numericValue);
                  } else {
                  }
                }}
                placeholder="22.5"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.imc && <Text style={styles.errorText}>{errors.imc.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="data_do_exame"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Data do exame</Text>

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
                  <TouchableOpacity
                    style={[
                      styles.picker,
                      errors.data_do_exame && styles.errorInput,
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

              {errors.data_do_exame && (
                <Text style={styles.errorText}>{errors.data_do_exame.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="hora_do_exame"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Hora do exame</Text>

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
                  <TouchableOpacity
                    style={[
                      styles.picker,
                      errors.hora_do_exame && styles.errorInput,
                      { justifyContent: "center", paddingHorizontal: 10 },
                    ]}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text style={{ color: value ? colors.text.primary : "#999" }}>
                      {value || "Selecionar hora"}
                    </Text>
                  </TouchableOpacity>

                  {showTimePicker && (
                    <DateTimePicker
                      value={value ? new Date(`1970-01-01T${value}:00`) : new Date()}
                      mode="time"
                      display="default"
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
                <Text style={styles.errorText}>{errors.hora_do_exame.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="agua_corporal_total"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Água Corporal Total (%)</Text>
              <TextInput
                style={[styles.input, errors.agua_corporal_total && styles.errorInput]}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, '').replace(',', '.');
                  onChange(numeric);
                }}
                value={value?.toString() ?? ''}
                placeholder="Ex: 55.3"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.agua_corporal_total && (
                <Text style={styles.errorText}>{errors.agua_corporal_total.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="gordura_corporal"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Gordura Corporal (%)</Text>
              <TextInput
                style={[styles.input, errors.gordura_corporal && styles.errorInput]}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, '').replace(',', '.');
                  onChange(numeric);
                }}
                value={value?.toString() ?? ''}
                placeholder="Ex: 18.2"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.gordura_corporal && (
                <Text style={styles.errorText}>{errors.gordura_corporal.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="massa_muscular_esqueletica"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Massa Muscular Esquelética (%)</Text>
              <TextInput
                style={[styles.input, errors.massa_muscular_esqueletica && styles.errorInput]}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, '').replace(',', '.');
                  onChange(numeric);
                }}
                value={value?.toString() ?? ''}
                placeholder="Ex: 40.0"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.massa_muscular_esqueletica && (
                <Text style={styles.errorText}>{errors.massa_muscular_esqueletica.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="taxa_metabolica_basal"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Taxa Metabólica Basal (kcal)</Text>
              <TextInput
                style={[styles.input, errors.taxa_metabolica_basal && styles.errorInput]}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9]/g, '');
                  onChange(numeric);
                }}
                value={value?.toString() ?? ''}
                placeholder="Ex: 1500"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.taxa_metabolica_basal && (
                <Text style={styles.errorText}>{errors.taxa_metabolica_basal.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="proteinas"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Proteína (%)</Text>
              <TextInput
                style={[styles.input, errors.proteinas && styles.errorInput]}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, '').replace(',', '.');
                  onChange(numeric);
                }}
                value={value?.toString() ?? ''}
                placeholder="Ex: 15.0"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.proteinas && <Text style={styles.errorText}>{errors.proteinas.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="minerais"
          render={({ field: { onChange, value } }) => (
            <>
              <Text>Minerais (%)</Text>
              <TextInput
                style={[styles.input, errors.minerais && styles.errorInput]}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9.,]/g, '').replace(',', '.');
                  onChange(numeric);
                }}
                value={value?.toString() ?? ''}
                placeholder="Ex: 5.0"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              {errors.minerais && <Text style={styles.errorText}>{errors.minerais.message}</Text>}
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
          onPress={getAlunos}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Carregar Alunos</Text>
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
