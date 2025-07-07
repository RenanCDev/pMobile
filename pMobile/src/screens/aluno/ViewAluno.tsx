import React from "react";
import { Alert, ScrollView } from "react-native";
import * as S from "../../styles/Register.styles";
import { formatCPF } from "../../utils/cpf/format";
import { formatPhoneNumber } from "../../utils/celular/format";
import { useNavigation } from "@react-navigation/native";
import { useDataContext } from "../../context/DataContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

export default function ViewAluno() {
  const { alunoLogado, deleteAluno, reloadData, setAlunoLogado } = useDataContext();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!alunoLogado) {
    Alert.alert("Erro", "Você precisa estar logado para visualizar seu perfil.");
    return (
      <S.Container>
        <S.SectionTitle>Erro</S.SectionTitle>
        <S.Label>Faça login para ver seus dados pessoais.</S.Label>
      </S.Container>
    );
  }

  async function handleDelete() {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir seu perfil de aluno?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAluno(alunoLogado.pessoa.cpf);
              setAlunoLogado(null);
              await reloadData();
              Alert.alert("Sucesso", "Perfil de aluno excluído com sucesso!");
              navigation.navigate("HomeScreen");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o aluno.");
              console.error(error);
            }
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <S.Container>
        <S.Section>
          <S.SectionTitle>
            Dados <S.TitleHighlight>Pessoais</S.TitleHighlight>
          </S.SectionTitle>

          <S.Box>
            <S.BoxLabel>Nome completo</S.BoxLabel>
            <S.BoxValue>{alunoLogado.pessoa.nome}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Nome social</S.BoxLabel>
            <S.BoxValue>{alunoLogado.pessoa.nome_social || '-'}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>CPF</S.BoxLabel>
            <S.BoxValue>{formatCPF(alunoLogado.pessoa.cpf)}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Data de nascimento</S.BoxLabel>
            <S.BoxValue>{alunoLogado.pessoa.data_de_nascimento}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Email</S.BoxLabel>
            <S.BoxValue>{alunoLogado.pessoa.email}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Celular</S.BoxLabel>
            <S.BoxValue>{formatPhoneNumber(alunoLogado.pessoa.numero_de_celular)}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Etnia</S.BoxLabel>
            <S.BoxValue>{alunoLogado.pessoa.etnia}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Sexo</S.BoxLabel>
            <S.BoxValue>{alunoLogado.pessoa.sexo}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Estado civil</S.BoxLabel>
            <S.BoxValue>{alunoLogado.pessoa.estado_civil}</S.BoxValue>
          </S.Box>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            Dados <S.TitleHighlight>Físicos</S.TitleHighlight>
          </S.SectionTitle>

          <S.Box>
            <S.BoxLabel>Peso</S.BoxLabel>
            <S.BoxValue>{alunoLogado.peso} kg</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Altura</S.BoxLabel>
            <S.BoxValue>{alunoLogado.altura} m</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>IMC</S.BoxLabel>
            <S.BoxValue>{alunoLogado.imc}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Massa muscular esquelética</S.BoxLabel>
            <S.BoxValue>{alunoLogado.massa_muscular_esqueletica}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Gordura corporal</S.BoxLabel>
            <S.BoxValue>{alunoLogado.gordura_corporal}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Água corporal total</S.BoxLabel>
            <S.BoxValue>{alunoLogado.agua_corporal_total}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Proteínas</S.BoxLabel>
            <S.BoxValue>{alunoLogado.proteinas}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Minerais</S.BoxLabel>
            <S.BoxValue>{alunoLogado.minerais}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Taxa metabólica basal</S.BoxLabel>
            <S.BoxValue>{alunoLogado.taxa_metabolica_basal}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Data do exame</S.BoxLabel>
            <S.BoxValue>{alunoLogado.data_do_exame}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Hora do exame</S.BoxLabel>
            <S.BoxValue>{alunoLogado.hora_do_exame}</S.BoxValue>
          </S.Box>
        </S.Section>

        <S.Buttons>
          <S.SubmitButton
            onPress={() => navigation.navigate("EditAluno", { cpf: alunoLogado.pessoa.cpf })}
          >
            <S.ButtonText>Editar</S.ButtonText>
          </S.SubmitButton>

          <S.ResetButton onPress={handleDelete}>
            <S.ButtonText>Excluir</S.ButtonText>
          </S.ResetButton>
        </S.Buttons>
      </S.Container>
    </ScrollView>
  );
}
