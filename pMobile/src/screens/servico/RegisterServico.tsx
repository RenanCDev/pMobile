import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, ScrollView, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';
import { CreateServico } from '../../schemas/CreateServico';

const Container = styled(ScrollView)`
  flex: 1;
  padding: 24px;
  background-color: ${colors.dark.background};
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${colors.text.inverted};
  margin-bottom: 24px;
`;

const Label = styled.Text`
  color: ${colors.dark.text};
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled(TextInput)`
  height: 44px;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  padding: 10px;
  color: ${colors.text.inverted};
  margin-bottom: 4px;
`;

const TextArea = styled(TextInput)`
  height: 120px;
  background-color: ${colors.dark.surface};
  border-radius: 12px;
  padding: 10px;
  color: ${colors.text.inverted};
  margin-bottom: 4px;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 12px;
`;

const ButtonRow = styled.View`
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

type FormData = {
  tipo: string;
  descricao: string;
  valor: string;
};

export default function RegisterServico() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

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
    try {
      setIsLoading(true);
      const existing = await AsyncStorage.getItem('@servicos');
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(data);
      await AsyncStorage.setItem('@servicos', JSON.stringify(parsed));
      Alert.alert('Sucesso', 'Serviço salvo localmente!');
      reset();
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao salvar localmente.');
    } finally {
      setIsLoading(false);
    }
  };

  async function carregarServicos() {
    try {
      setIsLoading(true);
      const dados = await AsyncStorage.getItem('@servicos');
      const parsed = dados ? JSON.parse(dados) : [];
      Alert.alert('Sucesso', 'Serviços carregados. Veja no console.');
      console.log('Serviços:', parsed);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao carregar dados locais.');
    } finally {
      setIsLoading(false);
    }
  }

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
