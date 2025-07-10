import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import * as S from "../../styles/Register.styles";
import { formatCPF } from "../../utils/cpf/format";
import { formatPhoneNumber } from "../../utils/celular/format";
import { useNavigation } from "@react-navigation/native";
import { useDataContext } from "../../context/DataContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function ViewPersonal() {
  const {
    personalLogado,
    deletePersonal,
    reloadData,
    setPersonalLogado,
  } = useDataContext();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  if (!personalLogado) {
    Alert.alert("Erro", "Você precisa estar logado para visualizar seu perfil.");
    return (
      <S.Container>
        <S.SectionTitle>Erro</S.SectionTitle>
        <S.Label>Faça login para ver seus dados pessoais.</S.Label>
      </S.Container>
    );
  }

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    setDeleteModalVisible(false);
    try {
      await deletePersonal(personalLogado.cpf);
      setPersonalLogado(null);
      await reloadData();
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível excluir o personal.");
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <S.Container>
        <S.Section>
          <S.SectionTitle>
            Dados <S.TitleHighlight>Pessoais</S.TitleHighlight>
          </S.SectionTitle>

          <S.Box>
            <S.BoxLabel>Nome completo</S.BoxLabel>
            <S.BoxValue>{personalLogado.nome}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Nome social</S.BoxLabel>
            <S.BoxValue>{personalLogado.nome_social || "-"}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>CPF</S.BoxLabel>
            <S.BoxValue>{formatCPF(personalLogado.cpf)}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Data de nascimento</S.BoxLabel>
            <S.BoxValue>{personalLogado.data_de_nascimento}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Email</S.BoxLabel>
            <S.BoxValue>{personalLogado.email}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Celular</S.BoxLabel>
            <S.BoxValue>{formatPhoneNumber(personalLogado.numero_de_celular)}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Etnia</S.BoxLabel>
            <S.BoxValue>{personalLogado.etnia}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Sexo</S.BoxLabel>
            <S.BoxValue>{personalLogado.sexo}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Estado civil</S.BoxLabel>
            <S.BoxValue>{personalLogado.estado_civil}</S.BoxValue>
          </S.Box>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            Dados <S.TitleHighlight>Profissionais</S.TitleHighlight>
          </S.SectionTitle>

          <S.Box>
            <S.BoxLabel>CREF</S.BoxLabel>
            <S.BoxValue>{personalLogado.cref}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Especialidades</S.BoxLabel>
            <S.BoxValue>{personalLogado.especialidades || "-"}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Experiência profissional</S.BoxLabel>
            <S.BoxValue>{personalLogado.experiencia_profissional || "-"}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Horários disponíveis</S.BoxLabel>
            <S.BoxValue>{personalLogado.horarios_disponiveis}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Locais disponíveis</S.BoxLabel>
            <S.BoxValue>{personalLogado.locais_disponiveis}</S.BoxValue>
          </S.Box>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            Dados <S.TitleHighlight>Bancários</S.TitleHighlight>
          </S.SectionTitle>

          <S.Box>
            <S.BoxLabel>Agência</S.BoxLabel>
            <S.BoxValue>{personalLogado.dados_bancarios.agencia}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Número da conta</S.BoxLabel>
            <S.BoxValue>{personalLogado.dados_bancarios.numero_conta}</S.BoxValue>
          </S.Box>
        </S.Section>

        <S.Buttons>
          <S.SubmitButton
            onPress={() =>
              navigation.navigate("EditPersonal", { cpf: personalLogado.cpf })
            }
          >
            <S.ButtonText>Editar</S.ButtonText>
          </S.SubmitButton>

          <S.ResetButton onPress={handleDelete}>
            <S.ButtonText>Excluir</S.ButtonText>
          </S.ResetButton>
        </S.Buttons>

        <ConfirmDeleteModal
          visible={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={confirmDelete}
          title="Confirmar exclusão"
          message="Tem certeza que deseja excluir este personal?"
        />
      </S.Container>
    </ScrollView>
  );
}
