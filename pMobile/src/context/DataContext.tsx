import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Aluno, Personal } from '../services/storageService';

type DataContextType = {
  alunos: Aluno[];
  personais: Personal[];
  servicos: any[];
  isLoading: boolean;
  reloadData: () => Promise<void>;
  personalLogado: Personal | null;
  setPersonalLogado: (personal: Personal | null) => void;
  alunoLogado: Aluno | null;
  setAlunoLogado: (aluno: Aluno | null) => void;
  deleteAluno: (cpf: string) => Promise<void>;
  deletePersonal: (cpf: string) => Promise<void>;
  deleteServico: (id: string) => Promise<void>;
  editAluno: (cpf: string, novoAluno: Aluno) => Promise<void>;
  editPersonal: (cpf: string, novoPersonal: Personal) => Promise<void>;
  editServico: (id: string, novoServico: any) => Promise<void>;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [personais, setPersonais] = useState<Personal[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [personalLogado, setPersonalLogadoState] = useState<Personal | null>(null);
  const [alunoLogado, setAlunoLogadoState] = useState<Aluno | null>(null);

  const loadAllData = async () => {
    try {
      setIsLoading(true);

      const [a, p, s] = await Promise.all([
        AsyncStorage.getItem("@alunos"),
        AsyncStorage.getItem("@personais"),
        AsyncStorage.getItem("@servicos"),
      ]);

      setAlunos(a ? JSON.parse(a) : []);
      setPersonais(p ? JSON.parse(p) : []);
      setServicos(s ? JSON.parse(s) : []);

      console.log("Dados carregados");
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      Alert.alert("Erro", "Falha ao carregar dados locais.");
    } finally {
      setIsLoading(false);
    }
  };

  const setPersonalLogado = (personal: Personal | null) => {
    if (personal) setAlunoLogadoState(null);
    setPersonalLogadoState(personal);
  };

  const setAlunoLogado = (aluno: Aluno | null) => {
    if (aluno) setPersonalLogadoState(null);
    setAlunoLogadoState(aluno);
  };

  const deleteAluno = async (cpf: string) => {
    try {
      const updated = alunos.filter((a) => a.pessoa.cpf !== cpf);
      setAlunos(updated);
      await AsyncStorage.setItem("@alunos", JSON.stringify(updated));
    } catch (err) {
      console.error("Erro ao deletar aluno:", err);
      Alert.alert("Erro", "Falha ao deletar aluno.");
    }
  };

  const deletePersonal = async (cpf: string) => {
    try {
      const updated = personais.filter((p) => p.cpf !== cpf);
      setPersonais(updated);
      await AsyncStorage.setItem("@personais", JSON.stringify(updated));
    } catch (err) {
      console.error("Erro ao deletar personal:", err);
      Alert.alert("Erro", "Falha ao deletar personal.");
    }
  };

  const deleteServico = async (id: string) => {
    try {
      const updated = servicos.filter((s) => s.id !== id);
      setServicos(updated);
      await AsyncStorage.setItem("@servicos", JSON.stringify(updated));
    } catch (err) {
      console.error("Erro ao deletar serviço:", err);
      Alert.alert("Erro", "Falha ao deletar serviço.");
    }
  };

  const editAluno = async (cpf: string, novoAluno: Aluno) => {
    try {
      const updated = alunos.map((a) =>
        a.pessoa.cpf === cpf ? novoAluno : a
      );
      setAlunos(updated);
      await AsyncStorage.setItem("@alunos", JSON.stringify(updated));

      if (alunoLogado?.pessoa.cpf === cpf) {
        setAlunoLogadoState(novoAluno);
      }
    } catch (err) {
      console.error("Erro ao editar aluno:", err);
      Alert.alert("Erro", "Falha ao editar aluno.");
    }
  };

  const editPersonal = async (cpf: string, updatedData: Personal) => {
    try {
      const updatedPersonais = personais.map((p) =>
        p.cpf === cpf ? updatedData : p
      );
      setPersonais(updatedPersonais);
      await AsyncStorage.setItem("@personais", JSON.stringify(updatedPersonais));

      if (personalLogado?.cpf === cpf) {
        setPersonalLogadoState(updatedData);
      }
    } catch (error) {
      console.error("Erro ao editar personal:", error);
      Alert.alert("Erro", "Falha ao editar personal.");
    }
  };

  const editServico = async (id: string, novoServico: any) => {
    try {
      const updated = servicos.map((s) => s.id === id ? novoServico : s);
      setServicos(updated);
      await AsyncStorage.setItem("@servicos", JSON.stringify(updated));
    } catch (err) {
      console.error("Erro ao editar serviço:", err);
      Alert.alert("Erro", "Falha ao editar serviço.");
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        alunos,
        personais,
        servicos,
        isLoading,
        reloadData: loadAllData,
        personalLogado,
        setPersonalLogado,
        alunoLogado,
        setAlunoLogado,
        deleteAluno,
        deletePersonal,
        deleteServico,
        editAluno,
        editPersonal,
        editServico,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext deve ser usado dentro de um DataProvider");
  }
  return context;
};
