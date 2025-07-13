import React, { useState } from "react";
import { ScrollView, Modal, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as S from "../../styles/Register.styles";
import { useDataContext } from "../../context/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { saveContrato } from "../../services/storageService";

export default function ViewServico() {
  const {
    servicos,
    personalLogado,
    alunoLogado,
    reloadData,
  } = useDataContext();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServicoId, setSelectedServicoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!personalLogado && !alunoLogado) {
    return (
      <S.Container>
        <S.SectionTitle>Serviços</S.SectionTitle>
        <S.Label>Faça login para visualizar os serviços disponíveis.</S.Label>
      </S.Container>
    );
  }

  const servicosDoPersonal = servicos.filter(
    (s) => personalLogado && s.cadastrado_por === personalLogado.nome
  );

  async function handleDelete(id: string) {
    const novosServicos = servicos.filter((s) => s.id !== id);
    await AsyncStorage.setItem("@servicos", JSON.stringify(novosServicos));
    reloadData();
  }

  async function handleConfirmarContratacao() {
    if (!alunoLogado || selectedServicoId == null) {
      setModalVisible(false);
      return;
    }

    setIsLoading(true);

    try {
      await saveContrato({
        alunoCpf: alunoLogado.pessoa.cpf,
        servicoId: selectedServicoId,
      });
      await reloadData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setModalVisible(false);
    }
  }

  const listaServicos = personalLogado ? servicosDoPersonal : servicos;

  if (listaServicos.length === 0) {
    return (
      <S.Container>
        <S.SectionTitle>Serviços</S.SectionTitle>
        <S.Label>
          {personalLogado
            ? "Você ainda não cadastrou nenhum serviço."
            : "Nenhum serviço disponível no momento."}
        </S.Label>
      </S.Container>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <S.Container>
        <S.SectionTitle>Serviços</S.SectionTitle>

        {listaServicos.map((servico) => (
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

            <S.Box>
              <S.BoxLabel>Cadastrado por</S.BoxLabel>
              <S.BoxValue>{servico.cadastrado_por}</S.BoxValue>
            </S.Box>

            <S.Buttons>
              {personalLogado ? (
                <>
                  <S.SubmitButton
                    onPress={() =>
                      navigation.navigate("EditServico", {
                        servicoId: servico.id,
                      })
                    }
                  >
                    <S.ButtonText>Editar</S.ButtonText>
                  </S.SubmitButton>

                  <S.ResetButton onPress={() => handleDelete(servico.id)}>
                    <S.ButtonText>Excluir</S.ButtonText>
                  </S.ResetButton>
                </>
              ) : (
                <S.SubmitButton
                  onPress={() => {
                    setSelectedServicoId(servico.id);
                    setModalVisible(true);
                  }}
                >
                  <S.ButtonText>Contratar</S.ButtonText>
                </S.SubmitButton>
              )}
            </S.Buttons>
          </S.Section>
        ))}

        {/* Modal de confirmação */}
        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              width: '80%',
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                Confirmar Contratação
              </Text>
              <Text style={{ marginBottom: 20 }}>
                Você confirma a contratação deste serviço?
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <S.ResetButton
                  style={{ marginRight: 10 }}
                  onPress={() => setModalVisible(false)}
                >
                  <S.ButtonText>Cancelar</S.ButtonText>
                </S.ResetButton>

                <S.SubmitButton
                  onPress={handleConfirmarContratacao}
                  disabled={isLoading}
                >
                  <S.ButtonText>Confirmar</S.ButtonText>
                </S.SubmitButton>
              </View>
            </View>
          </View>
        </Modal>
      </S.Container>
    </ScrollView>
  );
}
