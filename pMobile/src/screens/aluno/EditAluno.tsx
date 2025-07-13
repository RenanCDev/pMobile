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
import * as I from "../../components/form/input";
import * as O from "../../components/form/output";
import colors from "../../constants/colors";
import { UpdateAluno } from "../../schemas/UpdateAluno";

type Props = NativeStackScreenProps<RootStackParamList, "EditAluno">;

type UpdateAlunoType = z.infer<typeof UpdateAluno>;

export function EditAluno({ route, navigation }: Props) {
  const { cpf } = route.params;
  const { alunos, editAluno } = useDataContext();

  const aluno = alunos.find((a) => a.pessoa.cpf === cpf);

  const [isLoading, setIsLoading] = useState(false);

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
