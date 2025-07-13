import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Aluno, Personal, Contrato } from "../services/storageService";
import { removeCPFFormatting } from "../utils/cpf/format";

type Contrato = {
  id: number;
  alunoCpf: string;
  servicoId: number;
  dataContratacao: string;
  status: "ativo" | "cancelado";
};

type DataContextType = {
  alunos: Aluno[];
  personais: Personal[];
  servicos: any[];
  contratosAluno: Contrato[];
  isLoading: boolean;
  reloadData: () => Promise<void>;
  personalLogado: Personal | null;
  setPersonalLogado: (personal: Personal | null) => void;
  alunoLogado: Aluno | null;
  setAlunoLogado: (aluno: Aluno | null) => void;
  deleteAluno: (cpf: string) => Promise<void>;
  deletePersonal: (cpf: string) => Promise<void>;
  deleteServico: (id: string) => Promise<void>;
  editPersonal: (cpf: string, data: Personal) => Promise<void>;
  editAluno: (cpf: string, data: Aluno) => Promise<void>;
  cancelarContrato: (id: number) => Promise<void>;
  addContrato: (contrato: Contrato) => Promise<void>;
};

const DataContext = createContext<DataContextType>({
  alunos: [],
  personais: [],
  servicos: [],
  contratosAluno: [],
  isLoading: false,
  reloadData: async () => {},
  personalLogado: null,
  setPersonalLogado: () => {},
  alunoLogado: null,
  setAlunoLogado: () => {},
  deleteAluno: async () => {},
  deletePersonal: async () => {},
  deleteServico: async () => {},
  editPersonal: async () => {},
  editAluno: async () => {},
  cancelarContrato: async () => {},
  addContrato: async () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [personais, setPersonais] = useState<Personal[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);
  const [contratosAluno, setContratosAluno] = useState<Contrato[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [personalLogado, setPersonalLogadoState] = useState<Personal | null>(null);
  const [alunoLogado, setAlunoLogadoState] = useState<Aluno | null>(null);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);

      const [a, p, s, c] = await Promise.all([
        AsyncStorage.getItem("@alunos"),
        AsyncStorage.getItem("@personais"),
        AsyncStorage.getItem("@servicos"),
        AsyncStorage.getItem("@contratos"),
      ]);

      setAlunos(a ? JSON.parse(a) : []);
      setPersonais(p ? JSON.parse(p) : []);
      setServicos(s ? JSON.parse(s) : []);
      setContratosAluno(c ? JSON.parse(c) : []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      Alert.alert("Erro", "Falha ao carregar dados locais.");
    } finally {
      setIsLoading(false);
    }
  };

  const restoreSession = async () => {
    try {
      const aluno = await AsyncStorage.getItem("@alunoLogado");
      if (aluno) setAlunoLogadoState(JSON.parse(aluno));

      const personal = await AsyncStorage.getItem("@personalLogado");
      if (personal) setPersonalLogadoState(JSON.parse(personal));
    } catch (err) {
      console.error("Erro ao restaurar sessão:", err);
    }
  };

  const setPersonalLogado = (personal: Personal | null) => {
    setPersonalLogadoState(personal);
    if (personal) {
      AsyncStorage.setItem("@personalLogado", JSON.stringify(personal));
      AsyncStorage.removeItem("@alunoLogado");
      setAlunoLogadoState(null);
    } else {
      AsyncStorage.removeItem("@personalLogado");
    }
  };

  const setAlunoLogado = (aluno: Aluno | null) => {
    setAlunoLogadoState(aluno);
    if (aluno) {
      AsyncStorage.setItem("@alunoLogado", JSON.stringify(aluno));
      AsyncStorage.removeItem("@personalLogado");
      setPersonalLogadoState(null);
    } else {
      AsyncStorage.removeItem("@alunoLogado");
    }
  };

  const deleteAluno = async (cpf: string) => {
    const updated = alunos.filter(a => a.pessoa.cpf !== cpf);
    setAlunos(updated);
    await AsyncStorage.setItem("@alunos", JSON.stringify(updated));
  };

  const deletePersonal = async (cpf: string) => {
    const updated = personais.filter(p => p.cpf !== cpf);
    setPersonais(updated);
    await AsyncStorage.setItem("@personais", JSON.stringify(updated));
  };

  const deleteServico = async (id: string) => {
    const updated = servicos.filter(s => s.id !== id);
    setServicos(updated);
    await AsyncStorage.setItem("@servicos", JSON.stringify(updated));
  };

  const editPersonal = async (cpfParam: string, data: Personal) => {
    const targetCpf = removeCPFFormatting(cpfParam);
    const updated = personais.map(p => removeCPFFormatting(p.cpf) === targetCpf ? data : p);
    setPersonais(updated);
    await AsyncStorage.setItem("@personais", JSON.stringify(updated));

    if (personalLogado && removeCPFFormatting(personalLogado.cpf) === targetCpf) {
      setPersonalLogado(data);
    }
  };

  const editAluno = async (cpfParam: string, data: Aluno) => {
    const targetCpf = removeCPFFormatting(cpfParam);
    const updated = alunos.map(a => removeCPFFormatting(a.pessoa.cpf) === targetCpf ? data : a);
    setAlunos(updated);
    await AsyncStorage.setItem("@alunos", JSON.stringify(updated));

    if (alunoLogado && removeCPFFormatting(alunoLogado.pessoa.cpf) === targetCpf) {
      setAlunoLogado(data);
    }
  };

  const cancelarContrato = async (id: number) => {
    const atualizados = contratosAluno.map(c => c.id === id ? { ...c, status: "cancelado" } : c);
    setContratosAluno(atualizados);
    await AsyncStorage.setItem("@contratos", JSON.stringify(atualizados));
  };

  const addContrato = async (contrato: Contrato) => {
    const novos = [...contratosAluno, contrato];
    setContratosAluno(novos);
    await AsyncStorage.setItem("@contratos", JSON.stringify(novos));
  };

  useEffect(() => {
    loadAllData();
    restoreSession();
  }, []);

  return (
    <DataContext.Provider
      value={{
        alunos,
        personais,
        servicos,
        contratosAluno,
        isLoading,
        reloadData: loadAllData,
        personalLogado,
        setPersonalLogado,
        alunoLogado,
        setAlunoLogado,
        deleteAluno,
        deletePersonal,
        deleteServico,
        editPersonal,
        editAluno,
        cancelarContrato,
        addContrato,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
