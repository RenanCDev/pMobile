import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/types';
import { CreateServico } from '../../schemas/CreateServico';
import { getServicoById, updateServico } from '../../services/storageService';
import { useDataContext } from '../../context/DataContext';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';

import {
  Container,
  Title,
  Label,
  Input,
  TextArea,
  ErrorText,
  ButtonRow,
} from '../../styles/RegisterServico.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EditServico'>;

type FormData = {
  tipo: string;
  descricao: string;
  valor: string;
};

export default function EditServico({ route, navigation }: Props) {
  const { servicoId } = route.params;
  const { reloadData } = useDataContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CreateServico),
    defaultValues: {
      tipo: '',
      descricao: '',
      valor: '',
    },
  });

  useEffect(() => {
    async function carregarServico() {
      try {
        const servico = await getServicoById(servicoId);
        if (servico) {
          reset({
            tipo: servico.tipo,
            descricao: servico.descricao,
            valor: String(servico.valor),
          });
        } else {
          Alert.alert('Erro', 'Serviço não encontrado');
          navigation.goBack();
        }
      } catch (err) {
        Alert.alert('Erro', 'Falha ao carregar serviço');
      }
    }

    carregarServico();
  }, [servicoId]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await updateServico(servicoId, {
        tipo: data.tipo,
        descricao: data.descricao,
        valor: data.valor,
      });
      await reloadData();
      Alert.alert('Sucesso', 'Serviço atualizado com sucesso!');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao atualizar o serviço.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container keyboardShouldPersistTaps="handled">
      <Title>Editar Serviço</Title>

      <Label>Tipo de Serviço</Label>
      <Controller
        name="tipo"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Ex: Avaliação"
              placeholderTextColor={colors.text.muted}
              autoCapitalize="words"
            />
            {errors.tipo && <ErrorText>{errors.tipo.message}</ErrorText>}
          </>
        )}
      />

      <Label>Descrição</Label>
      <Controller
        name="descricao"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <TextArea
              value={value}
              onChangeText={onChange}
              placeholder="Descreva o serviço"
              placeholderTextColor={colors.text.muted}
              multiline
              textAlignVertical="top"
            />
            {errors.descricao && <ErrorText>{errors.descricao.message}</ErrorText>}
          </>
        )}
      />

      <Label>Valor</Label>
      <Controller
        name="valor"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="R$"
              placeholderTextColor={colors.text.muted}
              keyboardType="numeric"
            />
            {errors.valor && <ErrorText>{errors.valor.message}</ErrorText>}
          </>
        )}
      />

      <ButtonRow>
        <CustomButton
          title={isLoading ? 'Salvando...' : 'Salvar Alterações'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
        <CustomButton
          title="Cancelar"
          onPress={() => navigation.goBack()}
          backgroundColor={colors.dark.surface}
          disabled={isLoading}
        />
      </ButtonRow>
    </Container>
  );
}
