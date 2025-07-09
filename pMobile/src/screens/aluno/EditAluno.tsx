import React, { useEffect, useState } from "react";
import { Alert, ActivityIndicator, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { formatCPF, removeCPFFormatting } from "../../utils/cpf/format";
import { formatPhoneNumber, unformatPhoneNumber } from "../../utils/celular/format";
import { z } from "zod";

import { useDataContext } from "../../context/DataContext";
import { RootStackParamList } from "../../navigation/types";
import * as S from "../../styles/Register.styles";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../constants/colors";
import { UpdateAluno } from "../../schemas/UpdateAluno";

type Props = NativeStackScreenProps<RootStackParamList, "EditAluno">;

type UpdateAlunoType = z.infer<typeof UpdateAluno>;

export function EditAluno({ route, navigation }: Props) {
  const { cpf } = route.params;
  const { alunos, editAluno } = useDataContext();

  const aluno = alunos.find((a) => a.pessoa.cpf === cpf);

  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateAlunoType>({
    resolver: zodResolver(UpdateAluno),
    defaultValues: {},
  });

  useEffect(() => {
    if (aluno) {
      reset({
        nome: aluno.pessoa.nome,
        cpf: aluno.pessoa.cpf,
        nome_social: aluno.pessoa.nome_social ?? "",
        etnia: aluno.pessoa.etnia,
        sexo: aluno.pessoa.sexo,
        data_de_nascimento: aluno.pessoa.data_de_nascimento,
        email: aluno.pessoa.email,
        numero_de_celular: formatPhoneNumber(aluno.pessoa.numero_de_celular),
        estado_civil: aluno.pessoa.estado_civil,
        senha: aluno.senha,
        bioimpedancia: aluno.bioimpedancia ?? undefined,
        altura: aluno.altura ?? undefined,
        agua_corporal_total: aluno.agua_corporal_total ?? undefined,
        proteinas: aluno.proteinas ?? undefined,
        minerais: aluno.minerais ?? undefined,
        gordura_corporal: aluno.gordura_corporal ?? undefined,
        peso: aluno.peso ?? undefined,
        massa_muscular_esqueletica: aluno.massa_muscular_esqueletica ?? undefined,
        imc: aluno.imc ?? undefined,
        taxa_metabolica_basal: aluno.taxa_metabolica_basal ?? undefined,
        data_do_exame: aluno.data_do_exame,
        hora_do_exame: aluno.hora_do_exame,
      });
    }
  }, [aluno, reset]);

  const onSubmit = async (data: UpdateAlunoType) => {
    setIsLoading(true);
    try {
      const cleanData = {
        ...aluno,
        pessoa: {
          ...aluno?.pessoa,
          nome: data.nome,
          cpf: removeCPFFormatting(data.cpf),
          nome_social: data.nome_social,
          etnia: data.etnia,
          sexo: data.sexo,
          data_de_nascimento: data.data_de_nascimento,
          email: data.email,
          numero_de_celular: unformatPhoneNumber(data.numero_de_celular),
          estado_civil: data.estado_civil,
        },
        senha: data.senha,
        bioimpedancia: data.bioimpedancia,
        altura: data.altura,
        agua_corporal_total: data.agua_corporal_total,
        proteinas: data.proteinas,
        minerais: data.minerais,
        gordura_corporal: data.gordura_corporal,
        peso: data.peso,
        massa_muscular_esqueletica: data.massa_muscular_esqueletica,
        imc: data.imc,
        taxa_metabolica_basal: data.taxa_metabolica_basal,
        data_do_exame: data.data_do_exame,
        hora_do_exame: data.hora_do_exame,
      };

      await editAluno(cpf, cleanData);
      Alert.alert("Sucesso", "Aluno atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar aluno.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!aluno) {
    return (
      <S.Container>
        <S.Title>Aluno não encontrado</S.Title>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>Edição de <S.TitleHighlight>Aluno</S.TitleHighlight></S.Title>

      {/* Campos obrigatórios */}
      {[
        { name: "nome", label: "Nome", placeholder: "Nome completo" },
        { name: "cpf", label: "CPF", placeholder: "", readonly: true },
        { name: "email", label: "E-mail", placeholder: "email@example.com" },
        { name: "numero_de_celular", label: "Celular", placeholder: "(00) 00000-0000" },
        { name: "senha", label: "Senha", placeholder: "Senha", secure: true },
        { name: "hora_do_exame", label: "Hora do exame", placeholder: "HH:MM" },
      ].map(({ name, label, placeholder, readonly, secure }) => (
        <Controller
          key={name}
          control={control}
          name={name as keyof UpdateAlunoType}
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>{label}</S.Label>
              <S.Input
                editable={!readonly}
                secureTextEntry={secure}
                value={value?.toString() || ""}
                onChangeText={onChange}
                placeholder={placeholder}
              />
              {errors[name as keyof UpdateAlunoType] && (
                <S.ErrorText>{errors[name as keyof UpdateAlunoType]?.message?.toString()}</S.ErrorText>
              )}
            </S.Section>
          )}
        />
      ))}

      {/* Campos opcionais */}
      {[
        "bioimpedancia",
        "altura",
        "agua_corporal_total",
        "proteinas",
        "minerais",
        "gordura_corporal",
        "peso",
        "massa_muscular_esqueletica",
        "imc",
        "taxa_metabolica_basal",
      ].map((name) => (
        <Controller
          key={name}
          control={control}
          name={name as keyof UpdateAlunoType}
          render={({ field: { onChange, value } }) => (
            <S.Section>
              <S.Label>{name.replace(/_/g, " ").toUpperCase()}</S.Label>
              <S.Input
                keyboardType="numeric"
                value={value !== undefined ? String(value) : ""}
                onChangeText={(text) => onChange(Number(text))}
                placeholder={`Digite ${name.replace(/_/g, " ")}`}
              />
              {errors[name as keyof UpdateAlunoType] && (
                <S.ErrorText>{errors[name as keyof UpdateAlunoType]?.message?.toString()}</S.ErrorText>
              )}
            </S.Section>
          )}
        />
      ))}

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary.DEFAULT} />
      ) : (
        <S.Buttons>
          <S.SubmitButton onPress={handleSubmit(onSubmit)}>
            <S.ButtonText>Salvar</S.ButtonText>
          </S.SubmitButton>
        </S.Buttons>
      )}
    </S.Container>
  );
}
