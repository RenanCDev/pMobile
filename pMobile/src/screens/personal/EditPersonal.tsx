import React, { useEffect, useState } from "react";
import { Alert, ScrollView, ActivityIndicator, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { formatCPF, removeCPFFormatting } from "../../utils/cpf/format";
import { formatPhoneNumber, unformatPhoneNumber } from "../../utils/celular/format";
import { UpdatePersonal } from "../../schemas/UpdatePersonal";
import { z } from "zod";
import { useDataContext } from "../../context/DataContext";
import { RootStackParamList } from "../../navigation/types";
import * as S from "../../styles/Register.styles";
import * as I from "../../components/form/input";
import * as O from "../../components/form/output";

type Props = NativeStackScreenProps<RootStackParamList, "EditPersonal">;

type UpdatePersonalType = z.infer<typeof UpdatePersonal>;

export function EditPersonal({ route, navigation }: Props) {
  const { cpf } = route.params;
  const { personais, editPersonal } = useDataContext();

  const personal = personais.find((p) => p.cpf === cpf);

  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePersonalType>({
    resolver: zodResolver(UpdatePersonal),
    defaultValues: {
      nome: "",
      cpf: "",
      nome_social: "",
      etnia: "",
      sexo: "",
      data_de_nascimento: "",
      email: "",
      numero_de_celular: "",
      estado_civil: "nao_informado",
      cref: "",
      numero_conta: undefined,
      agencia: undefined,
      especialidades: "",
      experiencia_profissional: "",
      horarios_disponiveis: undefined,
      locais_disponiveis: "",
      senha: "",
    },
  });

  useEffect(() => {
    if (personal) {
      reset({
        nome: personal.nome,
        cpf: personal.cpf,
        nome_social: personal.nome_social || "",
        etnia: personal.etnia,
        sexo: personal.sexo,
        data_de_nascimento: personal.data_de_nascimento,
        email: personal.email,
        numero_de_celular: formatPhoneNumber(personal.numero_de_celular),
        estado_civil: personal.estado_civil,
        cref: personal.cref,
        numero_conta: personal.dados_bancarios?.numero_conta,
        agencia: personal.dados_bancarios?.agencia,
        especialidades: personal.especialidades || "",
        experiencia_profissional: personal.experiencia_profissional || "",
        horarios_disponiveis: personal.horarios_disponiveis,
        locais_disponiveis: personal.locais_disponiveis,
        senha: personal.senha,
      });
    }
  }, [personal, reset]);

  const onSubmit = async (data: UpdatePersonalType) => {
    setIsLoading(true);

    try {
      const cleanData = {
        ...data,
        cpf: removeCPFFormatting(data.cpf),
        numero_de_celular: unformatPhoneNumber(data.numero_de_celular),
        dados_bancarios: {
          numero_conta: data.numero_conta,
          agencia: data.agencia,
        },
      };

      await editPersonal(cpf, cleanData);
      Alert.alert("Sucesso", "Personal trainer atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar personal.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!personal) {
    return (
      <S.Container>
        <S.Title>Personal não encontrado</S.Title>
      </S.Container>
    );
  }

  return (
    <S.Container contentContainerStyle={{ paddingBottom: 40 }}>
      <S.Title>
        Cadastro de <S.TitleHighlight>Personal</S.TitleHighlight>
      </S.Title>

      <S.Section>
        <S.SectionTitle>
          Dados <S.TitleHighlight>Pessoais</S.TitleHighlight>
        </S.SectionTitle>

        <I.InputText
          control={control}
          name="nome"
          placeholder="Nome Completo"
          label="Nome Completo"
          errors={errors}
        />

        <I.InputText
          control={control}
          name="nome_social"
          placeholder="Nome Social"
          label="Nome Social"
          errors={errors}
        />

        <O.OutputCPF
          control={control}
        />

        <I.InputPicker
          control={control}
          name="etnia"
          label="Etnia"
          errors={errors}
          options={[
            { label: "Não informado", value: "nao_informado" },
            { label: "Amarela", value: "amarela" },
            { label: "Branca", value: "branca" },
            { label: "Indígena", value: "indigena" },
            { label: "Parda", value: "parda" },
            { label: "Preta", value: "preta" },
          ]}
        />

        <I.InputPicker
          control={control}
          name="sexo"
          label="Sexo"
          errors={errors}
          options={[
            { label: "Não informado", value: "N" },
            { label: "Feminino", value: "F" },
            { label: "Masculino", value: "M" },
            { label: "Outro", value: "O" },
          ]}
        />

        <I.InputDate
          control={control}
          name="data_de_nascimento"
          label="Data de nascimento"
          errors={errors}
        />

        <I.InputEmail
          control={control}
          errors={errors}
        />

        <I.InputPhone
          control={control}
          name="numero_de_celular"
          label="Celular"
          errors={errors}
        />

        <S.Section>
          <I.InputPicker
            control={control}
            name="estado_civil"
            label="Estado Civil"
            errors={errors}
            options={[
              { label: "Não informado", value: "nao_informado" },
              { label: "Casado", value: "casado" },
              { label: "Divorciado", value: "divorciado" },
              { label: "Solteiro", value: "solteiro" },
              { label: "União estável", value: "uniao_estavel" },
              { label: "Viúvo", value: "viuvo" },
            ]}
          />

          <I.InputText
            control={control}
            name="cref"
            placeholder="CREF"
            label="CREF"
            errors={errors}
          />

          <I.InputAgencia
            control={control}
            errors={errors}
          />

          <I.InputConta
            control={control}
            errors={errors}
          />

        </S.Section>

        <S.SectionTitle>
          Experiência <S.TitleHighlight>Profissional</S.TitleHighlight>
        </S.SectionTitle>
        
        <I.InputText
          control={control}
          name="experiencia_profissional"
          placeholder="Conte-nos sobre sua experiência profissional"
          label="Experiências"
          errors={errors}
        />

        <S.Section>
          <S.SectionTitle>
            Especialidades <S.TitleHighlight>(separe por vírgula)</S.TitleHighlight>
          </S.SectionTitle>
          
          <I.InputText
            control={control}
            name="especialidades"
            placeholder="Ex.: Musculação, Yoga, Pilates"
            label="Especialidades"
            errors={errors}
          />

        </S.Section>

        <S.Section>
          <S.SectionTitle>
            Horários <S.TitleHighlight>Disponíveis</S.TitleHighlight>
          </S.SectionTitle>

          <I.InputHorariosDisponiveis
            control={control}
            errors={errors}
          />
        </S.Section>
      </S.Section>

      <S.Section>
        <S.SectionTitle>
          Locais <S.TitleHighlight>Disponíveis</S.TitleHighlight>
        </S.SectionTitle>

        <I.InputLocaisDisponiveis
          control={control}
          errors={errors}
        />

      <I.InputPassword
        control={control}
        errors={errors}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <S.Buttons>
          <S.SubmitButton onPress={handleSubmit(onSubmit)}>
            <S.ButtonText>Salvar</S.ButtonText>
          </S.SubmitButton>
        </S.Buttons>
      )}
    </S.Section>
  </S.Container>
  );
}
    
