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

      console.log("Dados carregados:");
      console.log("Alunos:", a);
      console.log("Personais:", p);
      console.log("Serviços:", s);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      Alert.alert("Erro", "Falha ao carregar dados locais.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para garantir que só um esteja logado por vez
  const setPersonalLogado = (personal: any | null) => {
    if (personal) {
      setAlunoLogadoState(null); // Desloga aluno ao logar personal
    }
    setPersonalLogadoState(personal);
  };

  const setAlunoLogado = (aluno: any | null) => {
    if (aluno) {
      setPersonalLogadoState(null); // Desloga personal ao logar aluno
    }
    setAlunoLogadoState(aluno);
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
