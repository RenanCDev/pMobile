import React from "react";
import { Alert, ScrollView, ActivityIndicator, Platform } from "react-native";
import * as S from "../../styles/Register.styles";
import { useDataContext } from "../../context/DataContext";
import { getServicos } from "../../services/storageService";
import colors from "../../constants/colors";

export default function ViewContratosAluno() {
  const { alunoLogado, contratosAluno, cancelarContrato } = useDataContext();
  const [loading, setLoading] = React.useState(true);
  const [servicosMap, setServicosMap] = React.useState<Record<number, any>>({});

  React.useEffect(() => {
    if (!alunoLogado) {
      Alert.alert("Erro", "Você precisa estar logado como aluno.");
      return;
    }

    async function loadServicos() {
      const allServicos = await getServicos();
      const map = allServicos.reduce((acc, servico) => {
        acc[servico.id] = servico;
        return acc;
      }, {} as Record<number, any>);
      setServicosMap(map);
      setLoading(false);
    }

    loadServicos();
  }, [alunoLogado]);

  const contratosDoAluno = contratosAluno.filter(
    (c) => c.alunoCpf === alunoLogado?.pessoa.cpf
  );

  async function handleCancelar(id: number) {
    if (Platform.OS === "web") {
      const confirm = window.confirm("Deseja cancelar este contrato?");
      if (!confirm) return;
      await cancelarContrato(id);
      window.alert("Contrato cancelado!");
    } else {
      Alert.alert("Confirmação", "Deseja cancelar este contrato?", [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: async () => {
            await cancelarContrato(id);
            Alert.alert("Sucesso", "Contrato cancelado!");
          },
        },
      ]);
    }
  }

  if (loading) {
    return (
      <S.Container>
        <ActivityIndicator size="large" color={colors.primary.DEFAULT} />
      </S.Container>
    );
  }

  if (!contratosDoAluno.length) {
    return (
      <S.Container>
        <S.SectionTitle>Meus Contratos</S.SectionTitle>
        <S.Label>Você ainda não contratou nenhum serviço.</S.Label>
      </S.Container>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <S.Container>
        <S.SectionTitle>Meus Contratos</S.SectionTitle>

        {contratosDoAluno.map((contrato) => {
          const servico = servicosMap[contrato.servicoId];
          return (
            <S.Section key={contrato.id}>
              <S.Box>
                <S.BoxLabel>Serviço</S.BoxLabel>
                <S.BoxValue>{servico?.tipo}</S.BoxValue>
              </S.Box>

              <S.Box>
                <S.BoxLabel>Descrição</S.BoxLabel>
                <S.BoxValue>{servico?.descricao}</S.BoxValue>
              </S.Box>

              <S.Box>
                <S.BoxLabel>Personal</S.BoxLabel>
                <S.BoxValue>{servico?.cadastrado_por}</S.BoxValue>
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
                  <S.ResetButton onPress={() => handleCancelar(contrato.id)}>
                    <S.ButtonText>Cancelar</S.ButtonText>
                  </S.ResetButton>
                </S.Buttons>
              )}
            </S.Section>
          );
        })}
      </S.Container>
    </ScrollView>
  );
}
