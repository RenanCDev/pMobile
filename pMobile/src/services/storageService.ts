import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeCPFFormatting } from '../utils/cpf/format';
import { unformatPhoneNumber } from '../utils/celular/format';

export interface Personal {
  id: number;
  dados_bancarios: {
    numero_conta: number;
    agencia: number;
  };
  nome: string;
  cpf: string;
  data_de_nascimento: string;
  email: string;
  numero_de_celular: string;
  sexo: string;
  nome_social: string | null;
  etnia: string;
  estado_civil: string;
  status: boolean;
  cref: string;
  especialidades?: string;
  experiencia_profissional?: string;
  horarios_disponiveis: number;
  locais_disponiveis: string;
  senha: string;
}

export interface Aluno {
  id: number;
  pessoa: {
    nome: string;
    cpf: string;
    data_de_nascimento: string;
    email: string;
    numero_de_celular: string;
    sexo: string;
    nome_social?: string | null;
    etnia: string;
    estado_civil: string;
  };
  status: boolean;
  bioimpedancia: string;
  altura: string;
  data_do_exame: string;
  hora_do_exame: string;
  agua_corporal_total: string;
  proteinas: string;
  minerais: string;
  gordura_corporal: string;
  peso: string;
  massa_muscular_esqueletica: string;
  imc: string;
  taxa_metabolica_basal: string;
  senha: string;
}

export interface Servico {
  id: number;
  tipo: string;
  descricao: string;
  valor: string;
}

// -------------------- PERSONAL --------------------

export async function savePersonal(personalData: Personal) {
  try {
    const existing = await AsyncStorage.getItem('@personais');
    const parsed: Personal[] = existing ? JSON.parse(existing) : [];

    const cpf = removeCPFFormatting(personalData.cpf);
    const exists = parsed.some(p => p.cpf === cpf);
    if (exists) throw new Error('CPF já cadastrado');

    parsed.push({ ...personalData, cpf });
    await AsyncStorage.setItem('@personais', JSON.stringify(parsed));
  } catch (error) {
    console.error('Erro ao salvar personal:', error);
    throw error;
  }
}

export async function getPersonals(): Promise<Personal[]> {
  try {
    const data = await AsyncStorage.getItem('@personais');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar personais:', error);
    return [];
  }
}

export async function updatePersonal(updatedPersonal: Personal) {
  const personals = await getPersonals();
  const index = personals.findIndex(p => p.cpf === updatedPersonal.cpf);
  if (index > -1) {
    personals[index] = updatedPersonal;
    await AsyncStorage.setItem('@personais', JSON.stringify(personals));
  }
}

export async function deletePersonal(cpf: string) {
  try {
    const personals = await getPersonals();
    const filtered = personals.filter(p => p.cpf !== cpf);
    await AsyncStorage.setItem('@personais', JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao excluir personal:', error);
    throw error;
  }
}

// -------------------- ALUNO --------------------

export async function saveAluno(alunoData: Aluno) {
  try {
    const existing = await AsyncStorage.getItem('@alunos');
    const parsed: Aluno[] = existing ? JSON.parse(existing) : [];

    const cpf = removeCPFFormatting(alunoData.pessoa.cpf);
    const exists = parsed.some(a => a.pessoa.cpf === cpf);
    if (exists) throw new Error('CPF já cadastrado');

    const lastId = parsed.length > 0 ? parsed[parsed.length - 1].id : 0;
    const newAluno = {
      ...alunoData,
      id: lastId + 1,
      pessoa: {
        ...alunoData.pessoa,
        cpf,
        numero_de_celular: unformatPhoneNumber(alunoData.pessoa.numero_de_celular),
      },
    };

    parsed.push(newAluno);
    await AsyncStorage.setItem('@alunos', JSON.stringify(parsed));
  } catch (error) {
    console.error('Erro ao salvar aluno:', error);
    throw error;
  }
}

export async function getAlunos(): Promise<Aluno[]> {
  try {
    const data = await AsyncStorage.getItem('@alunos');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    return [];
  }
}

export async function updateAluno(updatedAluno: Aluno) {
  const alunos = await getAlunos();
  const index = alunos.findIndex(a => a.pessoa.cpf === updatedAluno.pessoa.cpf);
  if (index > -1) {
    alunos[index] = updatedAluno;
    await AsyncStorage.setItem('@alunos', JSON.stringify(alunos));
  }
}

export async function deleteAluno(cpf: string) {
  const alunos = await getAlunos();
  const filtered = alunos.filter(a => a.pessoa.cpf !== cpf);
  await AsyncStorage.setItem('@alunos', JSON.stringify(filtered));
}

// -------------------- SERVICO --------------------

export async function saveServico(servicoData: Omit<Servico, 'id'>) {
  const existing = await AsyncStorage.getItem('@servicos');
  const parsed: Servico[] = existing ? JSON.parse(existing) : [];

  const lastId = parsed.length > 0 ? parsed[parsed.length - 1].id : 0;
  const newServico: Servico = { id: lastId + 1, ...servicoData };

  parsed.push(newServico);
  await AsyncStorage.setItem('@servicos', JSON.stringify(parsed));
}

export async function getServicos(): Promise<Servico[]> {
  try {
    const data = await AsyncStorage.getItem('@servicos');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    return [];
  }
}

export async function updateServico(updatedServico: Servico) {
  const servicos = await getServicos();
  const index = servicos.findIndex(s => s.id === updatedServico.id);
  if (index > -1) {
    servicos[index] = updatedServico;
    await AsyncStorage.setItem('@servicos', JSON.stringify(servicos));
  }
}

export async function deleteServico(id: number) {
  const servicos = await getServicos();
  const filtered = servicos.filter(s => s.id !== id);
  await AsyncStorage.setItem('@servicos', JSON.stringify(filtered));
}

// -------------------- LOGIN --------------------

export async function loginPersonal(cpf: string, senha: string) {
  try {
    const data = await AsyncStorage.getItem('@personais');
    if (!data) return null;

    const personals: Personal[] = JSON.parse(data);
    const personal = personals.find(
      p => removeCPFFormatting(p.cpf) === cpf && p.senha === senha
    );

    return personal || null;
  } catch (error) {
    console.error('Erro no login do personal:', error);
    return null;
  }
}

// -------------------- UTIL --------------------

export async function clearAllData() {
  await AsyncStorage.multiRemove(['@personais', '@alunos', '@servicos']);
}
