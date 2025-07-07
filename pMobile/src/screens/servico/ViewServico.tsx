import React from "react";
import { Alert, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from "../../styles/Register.styles";
import { useDataContext } from "../../context/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

export default function ViewServico() {
  const { servicos, personalLogado, reloadData } = useDataContext();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!personalLogado) {
    Alert.alert("Erro", "Você precisa estar logado para ver seus serviços.");
    return (
      <S.Container>
        <S.SectionTitle>Serviços</S.SectionTitle>
        <S.Label>Faça login para visualizar seus serviços.</S.Label>
      </S.Container>
    );
  }

  const servicosDoPersonal = servicos.filter(
    (s) => s.cadastrado_por === personalLogado.nome
  );

  async function handleDelete(id: string) {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir este serviço?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const novosServicos = servicos.filter((s) => s.id !== id);
              await AsyncStorage.setItem("@servicos", JSON.stringify(novosServicos));
              reloadData();
              Alert.alert("Sucesso", "Serviço excluído com sucesso!");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o serviço.");
              console.error(error);
            }
          },
        },
      ]
    );
  }

  if (servicosDoPersonal.length === 0) {
    return (
      <S.Container>
        <S.SectionTitle>Seus Serviços</S.SectionTitle>
        <S.Label>Você ainda não cadastrou nenhum serviço.</S.Label>
      </S.Container>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <S.Container>
        <S.SectionTitle>Seus Serviços</S.SectionTitle>

        {servicosDoPersonal.map((servico) => (
          <S.Section key={servico.id}>
            <S.Box>
              <S.BoxLabel>Tipo</S.BoxLabel>
              <S.BoxValue>{servico.tipo}</S.BoxValue>
            </S.Box>

            <S.Box>
              <S.BoxLabel>Descrição</S.BoxLabel>
              <S.BoxValue>{servico.descricao}</S.BoxValue>
            </S.Box>

            <S.Box>
              <S.BoxLabel>Valor</S.BoxLabel>
              <S.BoxValue>R$ {servico.valor}</S.BoxValue>
            </S.Box>

            <S.Buttons>
              <S.SubmitButton
                onPress={() =>
                  navigation.navigate("EditServico", { servicoId: servico.id })
                }
              >
                <S.ButtonText>Editar</S.ButtonText>
              </S.SubmitButton>

              <S.ResetButton onPress={() => handleDelete(servico.id)}>
                <S.ButtonText>Excluir</S.ButtonText>
              </S.ResetButton>
            </S.Buttons>
          </S.Section>
        ))}
      </S.Container>
    </ScrollView>
  );
}
