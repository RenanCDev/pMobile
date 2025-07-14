import * as z from "zod";
import { isValidCPF } from "../utils/cpf/cpf-validation";
import { isValidBirthDate } from "../utils/data-nascimento";

export const UpdatePersonal = z.object({
  nome: z
    .string()
    .min(5, "Deve ter no mínimo 5 letras.")
    .max(50, "Deve ter no máximo 50 letras.")
    .regex(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "O nome não pode conter números ou caracteres especiais."
    ),

  nome_social: z.string().max(50, "Deve ter no máximo 50 letras.").optional(),

  cpf: z
    .string()
    .min(11, "CPF é obrigatório.")
    .max(14, "CPF deve ter no máximo 14 caracteres")
    .refine(isValidCPF, { message: "CPF inválido" }),

  etnia: z.string(),

  sexo: z.string(),

  data_de_nascimento: z.string().refine(isValidBirthDate, {
    message: "Data de nascimento inválida",
  }),

  email: z.string().email("E-mail inválido"),

  numero_de_celular: z
    .string()
    .regex(/^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/, "Número de celular inválido."),

  estado_civil: z.string(),

  cref: z.string().max(10, "Máximo de 10 caracteres"),

  numero_conta: z.coerce
    .number()
    .positive({ message: "Digite uma conta valida" })
    .min(1, "Número da conta é obrigatório")
    .max(9999999999, "Número da conta deve ter no máximo 10 dígitos"),

  agencia: z.coerce
    .number()
    .positive({ message: "Digite uma agência valida" })
    .min(1, "Agencia é obrigatória")
    .max(200, "Agencia da conta Inválido"),

  especialidades: z.string().max(500, "Especialidades muito longas").optional(),

  experiencia_profissional: z
    .string()
    .max(500, "Descrição muito longa")
    .optional(),

  horarios_disponiveis: z.coerce
    .number({
      invalid_type_error: "Use apenas números",
    })
    .min(1, "Horário disponível é obrigatório"),

  locais_disponiveis: z
    .string()
    .min(5, "Informe ao menos um local disponível")
    .max(500, "Lista de locais muito longa"),

  senha: z
    .string()
    .min(5, "A senha deve ter no mínimo 5 caracteres.")
});
