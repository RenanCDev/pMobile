import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Modal,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import * as S from "../../styles/Register.styles";
import { useDataContext } from "../../context/DataContext";
import { getContratos, getServicos } from "../../services/storageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../constants/colors";

const STATUS_OPCOES = ["todos", "ativo", "cancelado"] as const;
type StatusFiltro = typeof STATUS_OPCOES[number];

export default function ViewContratosPersonal() {
  const { personalLogado, alunos, reloadData } = useDataContext();
  const [loading, setLoading] = useState(true);
  const [contratos, setContratos] = useState<any[]>([]);
  const [servicosMap, setServicosMap] = useState<Record<number, any>>({});
  const [alunosMap, setAlunosMap] = useState<Record<string, any>>({});
  const [filtroStatus, setFiltroStatus] = useState<StatusFiltro>("todos");

  const [modalVisible, setModalVisible] = useState(false);
  const [contratoSelecionado, setContratoSelecionado] = useState<number | null>(null);

  useEffect(() => {
    if (!personalLogado) return;

    async function loadData() {
      setLoading(true);

      const allContratos = await getContratos();
      const allServicos = await getServicos();

      const meusServicos = allServicos.filter(
        (s) => s.cadastrado_por === personalLogado.nome
      );

      const servicosIds = meusServicos.map((s) => s.id);

      const meusContratos = allContratos
        .filter((c) => servicosIds.includes(c.servicoId))
        .sort(
          (a, b) =>
            new Date(b.dataContratacao).getTime() -
            new Date(a.dataContratacao).getTime()
        );

      const servicoMap = meusServicos.reduce((acc, servico) => {
        acc[servico.id] = servico;
        return acc;
      }, {} as Record<number, any>);

      const alunoMap = alunos.reduce((acc, aluno) => {
        acc[aluno.pessoa.cpf] = aluno;
        return acc;
      }, {} as Record<string, any>);

      setContratos(meusContratos);
      setServicosMap(servicoMap);
      setAlunosMap(alunoMap);

      setLoading(false);
    }

    loadData();
  }, [personalLogado, alunos]);

  async function confirmarCancelamento() {
    if (!contratoSelecionado) return;

    const atualizados = contratos.map((c) =>
      c.id === contratoSelecionado ? { ...c, status: "cancelado" } : c
    );

    setContratos(atualizados);
    await AsyncStorage.setItem("@contratos", JSON.stringify(atualizados));
    await reloadData();

    setModalVisible(false);
    setContratoSelecionado(null);
  }

  if (!personalLogado) {
    return (
      <S.Container>
        <S.SectionTitle>Meus Contratos</S.SectionTitle>
        <S.Label>Você precisa estar logado como personal.</S.Label>
      </S.Container>
    );
  }

  if (loading) {
    return (
      <S.Container>
        <ActivityIndicator size="large" color={colors.primary.DEFAULT} />
      </S.Container>
    );
  }

  const contratosFiltrados =
    filtroStatus === "todos"
      ? contratos
      : contratos.filter((c) => c.status === filtroStatus);

  if (!contratosFiltrados.length) {
    return (
      <S.Container>
        <S.SectionTitle>Meus Contratos</S.SectionTitle>
        <S.Label>Nenhum contrato com o status selecionado.</S.Label>
      </S.Container>
    );
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <S.Container>
          <S.SectionTitle>Contratos dos meus Serviços</S.SectionTitle>

          {/* Filtros */}
          <S.Buttons style={{ flexDirection: "row", justifyContent: "center" }}>
            {STATUS_OPCOES.map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => setFiltroStatus(status)}
                style={{
                  backgroundColor:
                    filtroStatus === status
                      ? colors.primary.DEFAULT
                      : colors.dark.surface,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  marginHorizontal: 4,
                  borderRadius: 6,
                }}
              >
                <S.ButtonText>
                  {status === "todos"
                    ? "Todos"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </S.ButtonText>
              </TouchableOpacity>
            ))}
          </S.Buttons>

          {contratosFiltrados.map((contrato) => {
            const servico = servicosMap[contrato.servicoId];
            const aluno = alunosMap[contrato.alunoCpf];
            return (
              <S.Section key={contrato.id}>
                <S.Box>
                  <S.BoxLabel>Aluno</S.BoxLabel>
                  <S.BoxValue>{aluno?.pessoa?.nome}</S.BoxValue>
                </S.Box>

                <S.Box>
                  <S.BoxLabel>Serviço</S.BoxLabel>
                  <S.BoxValue>{servico?.tipo}</S.BoxValue>
                </S.Box>

                <S.Box>
                  <S.BoxLabel>Descrição</S.BoxLabel>
                  <S.BoxValue>{servico?.descricao}</S.BoxValue>
                </S.Box>

                <S.Box>
                  <S.BoxLabel>Data da contratação</S.BoxLabel>
                  <S.BoxValue>
                    {new Date(contrato.dataContratacao).toLocaleDateString()}
                  </S.BoxValue>
                </S.Box>

                <S.Box>
                  <S.BoxLabel>Status</S.BoxLabel>
                  <S.BoxValue
                    style={{
                      color:
                        contrato.status === "ativo"
                          ? colors.status.success
                          : colors.status.error,
                    }}
                  >
                    {contrato.status.toUpperCase()}
                  </S.BoxValue>
                </S.Box>

                {contrato.status === "ativo" && (
                  <S.Buttons>
                    <S.ResetButton
                      onPress={() => {
                        setContratoSelecionado(contrato.id);
                        setModalVisible(true);
                      }}
                    >
                      <S.ButtonText>Cancelar</S.ButtonText>
                    </S.ResetButton>
                  </S.Buttons>
                )}
              </S.Section>
            );
          })}
        </S.Container>
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              width: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Deseja realmente cancelar este contrato?
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: colors.secondary.dark,
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "#fff" }}>Não</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmarCancelamento}
                style={{
                  backgroundColor: colors.status.error,
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "#fff" }}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
