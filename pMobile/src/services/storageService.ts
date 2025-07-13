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
  bioimpedancia: number;
  altura: number;
  data_do_exame: string;
  hora_do_exame: string;
  agua_corporal_total: number;
  proteinas: number;
  minerais: number;
  gordura_corporal: number;
  peso: number;
  massa_muscular_esqueletica: number;
  imc: number;
  taxa_metabolica_basal: number;
  senha: string;
}

export interface Servico {
  id: number;
  tipo: string;
  descricao: string;
  valor: string;
  cadastrado_por: string;
}

export interface Contrato {
  id: number;
  alunoCpf: string;
  servicoId: number;
  dataContratacao: string;
  status: 'ativo' | 'cancelado';
}

export async function saveContrato(contrato: Omit<Contrato, 'id' | 'dataContratacao'>) {
  const existing = await AsyncStorage.getItem('@contratos');
  const parsed: Contrato[] = existing ? JSON.parse(existing) : [];

  const lastId = parsed.length > 0 ? parsed[parsed.length - 1].id : 0;

  const novoContrato: Contrato = {
    id: lastId + 1,
    alunoCpf: contrato.alunoCpf,
    servicoId: contrato.servicoId,
    dataContratacao: new Date().toISOString(),
    status: 'ativo',
  };

  parsed.push(novoContrato);

  await AsyncStorage.setItem('@contratos', JSON.stringify(parsed));
}

export async function getContratos(): Promise<Contrato[]> {
  const data = await AsyncStorage.getItem('@contratos');
  return data ? JSON.parse(data) : [];
}


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
export async function saveAluno(alunoData: Aluno) {
  try {
    const existing = await AsyncStorage.getItem('@alunos');
    const parsed: Aluno[] = existing ? JSON.parse(existing) : [];

    const cpf = removeCPFFormatting(alunoData.pessoa.cpf);
    const exists = parsed.some(a => removeCPFFormatting(a.pessoa?.cpf) === cpf);
    if (exists) throw new Error('CPF já cadastrado');

    const lastId = parsed.length > 0 ? parsed[parsed.length - 1].id : 0;

    const newAluno: Aluno = {
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

export async function saveServico(servicoData: Omit<Servico, 'id' | 'cadastrado_por'>, nomePersonal: string) {
  try {
    const existing = await AsyncStorage.getItem('@servicos');
    const parsed: Servico[] = existing ? JSON.parse(existing) : [];

    const lastId = parsed.length > 0 ? parsed[parsed.length - 1].id : 0;

    const newServico: Servico = {
      id: lastId + 1,
      ...servicoData,
      cadastrado_por: nomePersonal,
    };

    parsed.push(newServico);
    await AsyncStorage.setItem('@servicos', JSON.stringify(parsed));
  } catch (error) {
    console.error('Erro ao salvar serviço:', error);
    throw error;
  }
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

export async function getServicoById(id: number): Promise<Servico | null> {
  try {
    const servicos = await getServicos();
    const servico = servicos.find(s => s.id === id);
    return servico || null;
  } catch (error) {
    console.error('Erro ao buscar serviço por ID:', error);
    return null;
  }
}

export async function updateServico(id: number, updatedData: Omit<Servico, 'id' | 'cadastrado_por'>) {
  try {
    const servicos = await getServicos();
    const index = servicos.findIndex(s => s.id === id);

    if (index === -1) throw new Error('Serviço não encontrado');

    const servicoAnterior = servicos[index];
    const servicoAtualizado: Servico = {
      ...servicoAnterior,
      ...updatedData,
    };

    servicos[index] = servicoAtualizado;
    await AsyncStorage.setItem('@servicos', JSON.stringify(servicos));
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    throw error;
  }
}

export async function deleteServico(id: number) {
  const servicos = await getServicos();
  const filtered = servicos.filter(s => s.id !== id);
  await AsyncStorage.setItem('@servicos', JSON.stringify(filtered));
}

export async function loginPersonal(cpf: string, senha: string): Promise<Personal | null> {
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

export async function loginAluno(cpf: string, senha: string): Promise<Aluno | null> {
  try {
    const data = await AsyncStorage.getItem('@alunos');
    if (!data) return null;

    const alunos: Aluno[] = JSON.parse(data);
    const aluno = alunos.find(
      a => removeCPFFormatting(a.pessoa.cpf) === cpf && a.senha === senha
    );

    return aluno || null;
  } catch (error) {
    console.error('Erro no login do aluno:', error);
    return null;
  }
}


export async function clearAllData() {
  await AsyncStorage.multiRemove(['@personais', '@alunos', '@servicos']);
}
