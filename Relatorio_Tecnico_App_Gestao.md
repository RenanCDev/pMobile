
# 📄 Relatório Técnico - Aplicativo de Gestão para Personal Trainers e Alunos

## 📌 Equipe de Desenvolvimento
**The Full-Stacks**
- José Alves
- Luiz Miguel
- Renan Missias

---

## 🎯 Objetivo do Projeto
Desenvolver um aplicativo inovador que fortaleça a conexão entre personal trainers e alunos, promovendo hábitos saudáveis por meio de desafios, metas e gamificação. O sistema visa oferecer uma experiência prática, confiável e motivadora.

---

## 👥 Público-Alvo
- **Clientes:** Educadores físicos, personal trainers
- **Usuários Finais:** Alunos de academias e profissionais da área
- **Inspiração visual e funcional:** Duolingo, Strava
- **Imagem a ser transmitida:** Leveza, confiança, praticidade e sofisticação

---

## 🧱 Entidades Representativas e Atributos

### 🧑‍🏫 Personal Trainer

| Campo | Tipo | Observações |
|-------|------|-------------|
| nome | string | |
| nome_social | string | |
| cpf | string | Validação brasileira |
| etnia | string | |
| sexo | string | |
| data_de_nascimento | date | |
| email | string | |
| numero_de_celular | string | |
| estado_civil | string | |
| cref | string | Registro profissional |
| numero_conta | string | |
| agencia | string | |
| especialidades | array de strings | Lista dinâmica |
| experiencia_profissional | texto | |
| horarios_disponiveis | array | Agenda disponível |
| locais_disponiveis | array | Locais de atendimento |
| senha | string | Criptografada |

---

### 🧍 Aluno

| Campo | Tipo | Observações |
|-------|------|-------------|
| nome | string | |
| cpf | string | |
| data_de_nascimento | date | |
| email | string | |
| numero_de_celular | string | |
| sexo | string | |
| nome_social | string | |
| etnia | string | |
| estado_civil | string | |
| senha | string | |
| bioimpedancia | boolean | Indica se houve exame |
| data_do_exame | date | Opcional |
| hora_do_exame | time | Opcional |
| altura | float | em cm |
| agua_corporal_total | float | % |
| proteinas | float | % |
| minerais | float | % |
| gordura_corporal | float | % |
| peso | float | kg |
| massa_muscular_esqueletica | float | kg |
| imc | float | Calculado |
| taxa_metabolica_basal | float | kcal |

---

### 🛎️ Serviço

| Campo | Tipo | Observações |
|-------|------|-------------|
| tipo | string | ex: "avaliação", "treino personalizado" |
| descricao | string | texto livre |
| valor | float | R$ |

---

### 📄 Contrato *(Telas ainda serão implementadas)*

| Campo | Tipo | Observações |
|-------|------|-------------|
| aluno_id | ref Aluno | |
| personal_id | ref Personal | |
| servico_id | ref Serviço | |
| data_inicio | date | |
| data_fim | date | |
| valor_total | float | |
| status | string | ex: "ativo", "encerrado", "pendente" |

---

## 🧭 Mapeamento de Telas

### ✅ Telas Implementadas

- Login Personal
- Login Aluno
- Home (Dashboard)
- Cadastro de Personal Trainer
- Cadastro de Aluno
- Visualização de Personal
- Edição de Personal
- Visualização de Aluno
- Edição de Aluno
- Cadastro de Serviço
- Visualização de Serviço
- Edição de Serviço
- Tela de Visualização de Contratos por Aluno
- Tela de Visualização de Contratos por Personal

### 🔜 Telas a Implementar

- Cadastro de Contrato
- Visualização de Contrato
- Edição de Contrato
- (Funcionalidades já existem por meio do botão contratar o serviço, header menu de visualizar serviço e cancelamento de um contrato mas as telas seriam mais abrangentes para o caso de uso.)
---

## 🧰 Componentes Reutilizáveis

- Formulários de Input e Output customizados
- Modais (sucesso, erro, exclusão, logout)
- HeaderMenu e HeaderHomeButton
- CustomButton estilizado

---

## 📦 Armazenamento Local e Contexto Global

A aplicação utiliza o `AsyncStorage` para persistência de dados locais e o `DataContext` como gerenciamento de estado global.

### 📌 Funcionalidades principais do `DataContext`:

- `loadAllData` e `restoreSession` para carregar e manter estado persistente.
- Sessão única de aluno ou personal com `setAlunoLogado` e `setPersonalLogado`.
- Funções de CRUD para `alunos`, `personais`, `serviços`, e `contratos`.
- Exclusões e edições refletem imediatamente no armazenamento local.

O modelo favorece uso **offline-first** e permite escalabilidade futura com backend.

---

## 🔐 API Externa - Geração de Senha Segura

- Integração com API Ninjas (`https://api.api-ninjas.com/v1/passwordgenerator`)
- Geração de senha aleatória de 10 caracteres com botão no formulário de senha.
- API Key protegida por header `"X-Api-Key"`.
- Requisições assíncronas com feedback visual (`ActivityIndicator`).

---

## ✅ Validação com Zod

Todos os formulários são validados usando **Zod** integrando com **React Hook Form**:

- Garantia de CPF válido e formatado corretamente
- Validação de campos obrigatórios, emails, datas e senhas
- Feedback visual direto no componente de input
- Schemas organizados para **create**, **login**, e **update**

---

## 🎨 Design e Usabilidade

| Aspecto | Diretriz |
|--------|----------|
| Estilo | Clean, sofisticado, leve |
| UX/UI | Navegação simples e fluida |
| Identidade visual | Cores claras, tipografia moderna, ícones intuitivos |
| Responsividade | Total adaptação para Android e iOS |
| Inspiração | Duolingo (gamificação) e Strava (social + fitness) |

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React Native
- **Validação:** Zod + React Hook Form
- **Backend:** Django
- **Banco de Dados:** PostgreSQL
- **Armazenamento Local:** AsyncStorage
- **Integrações:** Instagram, Gmail, Outlook, Calendário, Chamadas telefônicas

---

## 📅 Cronograma de Entregas

| Marco | Entregas |
|-------|----------|
| **1º e 2º mês** | Refinamento da ideia, escopo, wireframes |
| **3º e 4º mês** | Backend, banco de dados, protótipo funcional |
| **5º e 6º mês** | Funcionalidades principais, testes internos |
| **7º e 8º mês** | Ajustes, lançamento beta, testes com usuários |

---

## 📊 Benchmarking

| App | Destaques |
|-----|-----------|
| **Duolingo** | Gamificação intuitiva e motivadora |
| **Strava** | Engajamento social e fidelização |

---

## ✅ Conclusão

O sistema em desenvolvimento possui uma base sólida de funcionalidades, com um foco diferenciado em engajamento, saúde e relacionamento entre profissionais e alunos. A estrutura modular permite escalar novas features como gamificação e gestão financeira. Com a implementação das telas restantes e a futura integração de jogos e recompensas, o app tende a se posicionar como referência no segmento fitness-tech.

## ✅ Telas

Segue abaixo imagens finais das telas do projeto

- Home
![Home](screenshots_final/tela(1).jpeg)

- Login Aluno
![Login Aluno](screenshots_final/tela(2).jpeg)

- Login Personal
![Login Personal](screenshots_final/tela(3).jpeg)

- Login Personal
![Login Personal](screenshots_final/tela(4).jpeg)

- Home Personal
![Home Personal](screenshots_final/tela(5).jpeg)

- View Personal
![View Personal](screenshots_final/tela(6).jpeg)

- View Personal
![View Personal](screenshots_final/tela(7).jpeg)

- Edit Personal
![Edit Personal](screenshots_final/tela(8).jpeg)

- Edit Personal
![Edit Personal](screenshots_final/tela(9).jpeg)

- View Serviços Personal
![View Serviços Personal](screenshots_final/tela(10).jpeg)

- Edit Serviços Personal
![Edit Serviços Personal](screenshots_final/tela(11).jpeg)

- HeaderMenu Personal
![HeaderMenu](screenshots_final/tela(12).jpeg)

- Contratos Personal
![Contratos Personal](screenshots_final/tela(13).jpeg)

- Contratos Personal
![Contratos Personal](screenshots_final/tela(14).jpeg)

- Erro de Login
![Erro de Login](screenshots_final/tela(15).jpeg)

- View Alunos
![View Alunos](screenshots_final/tela(16).jpeg)

- View Alunos
![View Alunos](screenshots_final/tela(17).jpeg)

- Edit Alunos
![Edit Alunos](screenshots_final/tela(18).jpeg)

- View Serviços Aluno
![View Serviços Aluno](screenshots_final/tela(19).jpeg)

- Contratação Serviço
![Contratação Serviço](screenshots_final/tela(20).jpeg)

- Header Menu Aluno
![Header Menu Aluno](screenshots_final/tela(21).jpeg)

- Contratos Aluno
![Contratos Aluno](screenshots_final/tela(22).jpeg)

- Logout
![Logout](screenshots_final/tela(23).jpeg)



