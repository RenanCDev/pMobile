import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import * as S from "../../styles/Register.styles";
import { getPersonals } from "../../services/storageService";
import { formatCPF } from "../../utils/cpf/format";
import { formatPhoneNumber } from "../../utils/celular/format";
import { useNavigation } from "@react-navigation/native";
import { Personal , deletePersonal} from "../../services/storageService";

export default function ViewPersonal() {
  const [personal, setPersonal] = useState<Personal | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadData() {
      const personals = await getPersonals();
      if (personals.length > 0) {
        setPersonal(personals[0]);
      }
    }
    loadData();
  }, []);

  async function handleDelete() {
    if (!personal) return;

    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este personal?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await deletePersonal(personal.cpf);
              setPersonal(null);
              Alert.alert('Sucesso', 'Personal excluído com sucesso!');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o personal.');
              console.error(error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  }

  if (!personal) {
    return (
      <S.Container>
        <S.SectionTitle>Nenhum personal encontrado.</S.SectionTitle>
      </S.Container>
    );
  }

  return (
    <ScrollView>
      <S.Container>
        <S.Section>
          <S.SectionTitle>
            Dados <S.TitleHighlight>Pessoais</S.TitleHighlight>
          </S.SectionTitle>

          <S.Box>
            <S.BoxLabel>Nome completo</S.BoxLabel>
            <S.BoxValue>{personal.nome}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Nome social</S.BoxLabel>
            <S.BoxValue>{personal.nome_social || '-'}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>CPF</S.BoxLabel>
            <S.BoxValue>{formatCPF(personal.cpf)}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Data de nascimento</S.BoxLabel>
            <S.BoxValue>{personal.data_de_nascimento}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Email</S.BoxLabel>
            <S.BoxValue>{personal.email}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Celular</S.BoxLabel>
            <S.BoxValue>{formatPhoneNumber(personal.numero_de_celular)}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Etnia</S.BoxLabel>
            <S.BoxValue>{personal.etnia}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Sexo</S.BoxLabel>
            <S.BoxValue>{personal.sexo}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Estado civil</S.BoxLabel>
            <S.BoxValue>{personal.estado_civil}</S.BoxValue>
          </S.Box>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            Dados <S.TitleHighlight>Profissionais</S.TitleHighlight>
          </S.SectionTitle>

          <S.Box>
            <S.BoxLabel>CREF</S.BoxLabel>
            <S.BoxValue>{personal.cref}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Especialidades</S.BoxLabel>
            <S.BoxValue>{personal.especialidades || '-'}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Experiência profissional</S.BoxLabel>
            <S.BoxValue>{personal.experiencia_profissional || '-'}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Horários disponíveis</S.BoxLabel>
            <S.BoxValue>{personal.horarios_disponiveis}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Locais disponíveis</S.BoxLabel>
            <S.BoxValue>{personal.locais_disponiveis}</S.BoxValue>
          </S.Box>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            Dados <S.TitleHighlight>Bancários</S.TitleHighlight>
          </S.SectionTitle>

          <S.Box>
            <S.BoxLabel>Agência</S.BoxLabel>
            <S.BoxValue>{personal.dados_bancarios.agencia}</S.BoxValue>
          </S.Box>

          <S.Box>
            <S.BoxLabel>Número da conta</S.BoxLabel>
            <S.BoxValue>{personal.dados_bancarios.numero_conta}</S.BoxValue>
          </S.Box>
        </S.Section>

        <S.Buttons>
          <S.SubmitButton onPress={() => navigation.navigate('EditPersonal' as never)}>
            <S.ButtonText>Editar</S.ButtonText>
          </S.SubmitButton>

          <S.ResetButton
            onPress={() =>
              Alert.alert(
                "Confirmar exclusão",
                "Tem certeza que deseja excluir este personal?",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Excluir", style: "destructive", onPress: () => handleDelete() },
                ]
              )
            }
          >
            <S.ButtonText>Excluir</S.ButtonText>
          </S.ResetButton>
        </S.Buttons>
      </S.Container>
    </ScrollView>
  );
}
