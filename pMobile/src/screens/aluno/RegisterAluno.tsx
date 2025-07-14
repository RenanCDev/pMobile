import React, { useState } from "react";
import SuccessModal from "../../components/SuccessModal";
import { z } from "zod";
import { Alert, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { CreateAluno } from "../../schemas/CreateAluno";
import { removeCPFFormatting,} from "../../utils/cpf/format";
import { unformatPhoneNumber } from "../../utils/celular/format";
import * as S from "../../styles/Register.styles";
import * as I from "../../components/form/input";
import { saveAluno , getAlunos } from '../../services/storageService';

type AlunoFormData = z.infer<typeof CreateAluno>;

export default function RegisterAluno() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
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
      senha: data.senha,
    };

    try {
      setIsLoading(true);
      await saveAluno(cleanData);
      reset();
      setSuccessModalVisible(true);
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
        </S.Section>
      </S.Section>

      <S.Section>
        <S.SectionTitle>
          Dados de <S.TitleHighlight>Saúde</S.TitleHighlight>
        </S.SectionTitle>

        <I.InputDecimal
          control={control}
          errors={errors}
          name="altura"
          label="Altura (M)"
          placeholder="Ex.: 1.70"
        />

        <I.InputDecimal
          control={control}
          errors={errors}
          name="peso"
          label="Peso (Kg)"
          placeholder="Ex.: 70.5"
        />

        <I.InputDecimal
          control={control}
          errors={errors}
          name="bioimpedancia"
          label="Bioimpedância"
          placeholder="Ex.: 15.2"
        />

        <I.InputDecimal
          control={control}
          errors={errors}
          name="imc"
          label="IMC"
          placeholder="Ex.: 22.5"
        />
        
        <I.InputDate
          control={control}
          name="data_do_exame"
          label="Data do Exame"
          errors={errors}
        />

        <I.InputHora
          control={control}
          errors={errors}
        />

        <I.InputDecimal
          control={control}
          errors={errors}
          name="agua_corporal_total"
          label="Água Corporal Total (%)"
          placeholder="Ex.: 55.3"
        />

        <I.InputDecimal
          control={control}
          errors={errors}
          name="gordura_corporal"
          label="Gordura Corporal (%)"
          placeholder="Ex.: 18.2"
        />

        <I.InputDecimal
          control={control}
          errors={errors}
          name="massa_muscular_esqueletica"
          label="Massa Muscular Esquelética (%)"
          placeholder="Ex.: 40.0"
        />

        <I.InputTaxaMetabolicaBasal
          control={control}
          errors={errors}
        />

        <I.InputDecimal
          control={control}
          errors={errors}
          name="proteinas"
          label="Proteína (%)"
          placeholder="Ex.: 15.0"
        />

        <I.InputDecimal
          control={control}
          errors={errors}
          name="minerais"
          label="Minerais (%)"
          placeholder="Ex.: 5.0"
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
        message="Aluno cadastrado com sucesso!"
      />
    </S.Container>
  );
}