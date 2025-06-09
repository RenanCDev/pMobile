import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type DataContextType = {
  alunos: any[];
  personais: any[];
  servicos: any[];
  isLoading: boolean;
  reloadData: () => Promise<void>;
  personalLogado: any | null;
  setPersonalLogado: (personal: any | null) => void;
  alunoLogado: any | null;
  setAlunoLogado: (aluno: any | null) => void;
  deleteAluno: (cpf: string) => Promise<void>;
  deletePersonal: (cpf: string) => Promise<void>;
  deleteServico: (id: string) => Promise<void>;
  editAluno: (cpf: string, novoAluno: any) => Promise<void>;
  editPersonal: (cpf: string, novoPersonal: any) => Promise<void>;
  editServico: (id: string, novoServico: any) => Promise<void>;
};

const DataContext = createContext<DataContextType>({
  alunos: [],
  personais: [],
  servicos: [],
  isLoading: false,
  reloadData: async () => {},
  personalLogado: null,
  setPersonalLogado: () => {},
  alunoLogado: null,
  setAlunoLogado: () => {},
  deleteAluno: async () => {},
  deletePersonal: async () => {},
  deleteServico: async () => {},
  editAluno: async () => {},
  editPersonal: async () => {},
  editServico: async () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [personais, setPersonais] = useState<any[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [personalLogado, setPersonalLogadoState] = useState<any | null>(null);
  const [alunoLogado, setAlunoLogadoState] = useState<any | null>(null);

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

  const setPersonalLogado = (personal: any | null) => {
    if (personal) setAlunoLogadoState(null);
    setPersonalLogadoState(personal);
  };

  const setAlunoLogado = (aluno: any | null) => {
    if (aluno) setPersonalLogadoState(null);
    setAlunoLogadoState(aluno);
  };

  const deleteAluno = async (cpf: string) => {
    try {
      const updated = alunos.filter((a) => a.cpf !== cpf);
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

  const editAluno = async (cpf: string, novoAluno: any) => {
    try {
      const updated = alunos.map((a) => a.cpf === cpf ? novoAluno : a);
      setAlunos(updated);
      await AsyncStorage.setItem("@alunos", JSON.stringify(updated));
    } catch (err) {
      console.error("Erro ao editar aluno:", err);
      Alert.alert("Erro", "Falha ao editar aluno.");
    }
  };

  const editPersonal = async (cpf: string, updatedData: any) => {
    try {
      const updatedPersonais = personais.map((p) =>
        p.cpf === cpf ? { ...p, ...updatedData } : p
      );
      setPersonais(updatedPersonais);
      await AsyncStorage.setItem("@personais", JSON.stringify(updatedPersonais));

      // Atualiza o personal logado se for ele
      if (personalLogado?.cpf === cpf) {
        setPersonalLogadoState({ ...personalLogado, ...updatedData });
      }

    } catch (error) {
      console.error("Erro ao editar personal:", error);
      Alert.alert("Erro", "Falha ao editar personal.");
      throw error;
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

export const useDataContext = () => useContext(DataContext);
