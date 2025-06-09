import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Personal {
  cpf: string;
  [key: string]: any;
}

export interface Aluno {
  pessoa: {
    cpf: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface Servico {
  id: number;
  [key: string]: any;
}

export async function savePersonal(personalData: Personal) {
  const existing = await AsyncStorage.getItem('@personais');
  const parsed: Personal[] = existing ? JSON.parse(existing) : [];
  parsed.push(personalData);
  await AsyncStorage.setItem('@personais', JSON.stringify(parsed));
}

export async function getPersonals(): Promise<Personal[]> {
  const existing = await AsyncStorage.getItem('@personais');
  return existing ? JSON.parse(existing) : [];
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
  const personals = await getPersonals();
  const filtered = personals.filter(p => p.cpf !== cpf);
  await AsyncStorage.setItem('@personais', JSON.stringify(filtered));
}

export async function saveAluno(alunoData: Aluno) {
    const existing = await AsyncStorage.getItem('@alunos');
    const parsed: Aluno[] = existing ? JSON.parse(existing) : [];
    parsed.push(alunoData);
    await AsyncStorage.setItem('@alunos', JSON.stringify(parsed));
}

export async function getAlunos(): Promise<Aluno[]> {
  const existing = await AsyncStorage.getItem('@alunos');
  return existing ? JSON.parse(existing) : [];
}

export async function updateAluno(updatedAluno: Aluno) {
  const alunos = await getAlunos();
  const index = alunos.findIndex(a => a.pessoa?.cpf === updatedAluno.pessoa?.cpf);
  if (index > -1) {
    alunos[index] = updatedAluno;
    await AsyncStorage.setItem('@alunos', JSON.stringify(alunos));
  }
}

export async function deleteAluno(cpf: string) {
  const alunos = await getAlunos();
  const filtered = alunos.filter(a => a.pessoa?.cpf !== cpf);
  await AsyncStorage.setItem('@alunos', JSON.stringify(filtered));
}

export async function saveServico(servicoData: Omit<Servico, 'id'>) {
  const existing = await AsyncStorage.getItem('@servicos');
  const parsed: Servico[] = existing ? JSON.parse(existing) : [];

  const lastId = parsed.length > 0 ? parsed[parsed.length - 1].id : 0;
  const newId = lastId + 1;

  const newServico: Servico = { id: newId, ...servicoData };
  parsed.push(newServico);
  await AsyncStorage.setItem('@servicos', JSON.stringify(parsed));
}

export async function getServicos(): Promise<Servico[]> {
  const existing = await AsyncStorage.getItem('@servicos');
  return existing ? JSON.parse(existing) : [];
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
