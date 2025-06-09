import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';
import { CreateServico } from '../../schemas/CreateServico';
import {
  Container,
  Title,
  Label,
  Input,
  TextArea,
  ErrorText,
  ButtonRow,
} from '../../styles/RegisterServico.styles';
import { saveServico, getServicos } from '../../services/storageService';
import { useDataContext } from '../../context/DataContext';



type FormData = {
  tipo: string;
  descricao: string;
  valor: string;
};

export default function RegisterServico() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { personalLogado, reloadData } = useDataContext();

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


const onSubmit = async (data: FormData) => {
  if (!personalLogado) {
    Alert.alert('Erro', 'Nenhum personal está logado.');
    return;
  }

  try {
    setIsLoading(true);
    await saveServico(data, personalLogado.nome); // o id será gerado dentro
    await reloadData();
    Alert.alert('Sucesso', 'Serviço salvo com sucesso!');
    reset();
  } catch (err) {
    console.error(err);
    Alert.alert('Erro', 'Falha ao salvar localmente.');
  } finally {
    setIsLoading(false);
  }
};

  const carregarServicos = async () => {
    try {
      setIsLoading(true);
      const servicos = await getServicos();
      Alert.alert('Sucesso', 'Serviços carregados. Veja no console.');
      console.log('Serviços:', servicos);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao carregar dados locais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container keyboardShouldPersistTaps="handled">
      <Title>Serviço</Title>

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
          title={isLoading ? 'Salvando...' : 'Salvar'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
        <CustomButton
          title="Carregar Serviços"
          onPress={carregarServicos}
          backgroundColor={colors.dark.surface}
          disabled={isLoading}
        />
        <CustomButton
          title="Descartar"
          onPress={() => reset()}
          backgroundColor={colors.dark.surface}
          disabled={isLoading}
        />
      </ButtonRow>
    </Container>
  );
}
