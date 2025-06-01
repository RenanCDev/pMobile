import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Definição do tipo Personal
export type Personal = {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  ativo: boolean;
  sessoesAssociadas: number; // para simular sessões ativas
};

type PersonalContextType = {
  personals: Personal[];
  addPersonal: (personal: Omit<Personal, 'id'>) => void;
  editPersonal: (id: string, personal: Omit<Personal, 'id'>) => void;
  deletePersonal: (id: string) => void; // exclusão lógica
};

const PersonalContext = createContext<PersonalContextType | undefined>(undefined);

export function usePersonals(): PersonalContextType {
  const context = useContext(PersonalContext);
  if (!context) {
    throw new Error('usePersonals deve ser usado dentro de PersonalProvider');
  }
  return context;
}

type Props = {
  children: ReactNode;
};

export const PersonalProvider = ({ children }: Props) => {
  const [personals, setPersonals] = useState<Personal[]>([]);

  const addPersonal = (personalData: Omit<Personal, 'id'>) => {
    const newPersonal: Personal = {
      id: uuidv4(),
      ...personalData,
    };
    setPersonals((prev) => [...prev, newPersonal]);
  };

  const editPersonal = (id: string, personalData: Omit<Personal, 'id'>) => {
    setPersonals((prev) =>
      prev.map((p) => (p.id === id ? { id, ...personalData } : p))
    );
  };

  // Exclusão lógica: marca ativo = false
  const deletePersonal = (id: string) => {
    setPersonals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ativo: false } : p))
    );
  };

  return (
    <PersonalContext.Provider
      value={{ personals, addPersonal, editPersonal, deletePersonal }}
    >
      {children}
    </PersonalContext.Provider>
  );
};
