import React, { useState } from "react";
import SuccessModal from "../../components/SuccessModal";
import { z } from "zod";
import { Alert, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { CreatePersonal } from "../../schemas/CreatePersonal";
import { removeCPFFormatting } from "../../utils/cpf/format";
import { unformatPhoneNumber } from "../../utils/celular/format";
import * as S from "../../styles/Register.styles";
import { savePersonal , getPersonals } from '../../services/storageService';
import * as I from "../../components/form/input";

type PersonalFormData = z.infer<typeof CreatePersonal>;

export default function RegisterPersonal() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

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
      reset();
      setSuccessModalVisible(true);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message === 'CPF já cadastrado') {
        Alert.alert("Erro", "Já existe um personal com este CPF.");
      } else {
        Alert.alert("Erro", "Falha ao salvar localmente.");
      }
    } finally {
      setIsLoading(false);
    }
    
  };

  function handleLoginClick() {
    navigation.navigate("LoginPersonal" as never);
  }

  function resetForm() {
    reset();
  }

  return (
    <S.Container contentContainerStyle={{ paddingBottom: 40 }}>
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

        <I.InputCPF
          control={control}
          errors={errors}
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
            placeholder="Ex,: Musculação, Yoga, Pilates"
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

      </S.Section>

      <S.Buttons>
        <S.SubmitButton onPress={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <S.ButtonText>Cadastrar</S.ButtonText>
          )}
        </S.SubmitButton>

        <S.ResetButton onPress={resetForm} disabled={isLoading}>
          <S.ButtonText>Resetar</S.ButtonText>
        </S.ResetButton>
      </S.Buttons>

      <SuccessModal
        visible={successModalVisible}
        onClose={() => {
          setSuccessModalVisible(false);
          navigation.navigate("HomeScreen" as never);
        }}
        message="Personal cadastrado com sucesso!"
      />
      
    </S.Container>  
  );
}