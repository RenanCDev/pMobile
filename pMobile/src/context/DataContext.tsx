import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type DataContextType = {
  alunos: any[];
  personais: any[];
  servicos: any[];
  isLoading: boolean;
  reloadData: () => Promise<void>;
};

const DataContext = createContext<DataContextType>({
  alunos: [],
  personais: [],
  servicos: [],
  isLoading: false,
  reloadData: async () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [personais, setPersonais] = useState<any[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <DataContext.Provider value={{ alunos, personais, servicos, isLoading, reloadData: loadAllData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
