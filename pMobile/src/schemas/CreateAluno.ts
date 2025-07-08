import * as z from "zod";
import { isValidCPF } from "../utils/cpf/cpf-validation";
import { isValidBirthDate } from "../utils/data-nascimento";

export const CreateAluno = z.object({
  nome: z
    .string()
    .min(5, "Deve ter no mínimo 5 letras.")
    .max(50, "Deve ter no máximo 50 letras.")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O nome não pode conter números ou caracteres especiais."),

  cpf: z
    .string()
    .min(11, "CPF é obrigatório.")
    .max(14, "CPF deve ter no máximo 14 caracteres")
    .refine(isValidCPF, { message: "CPF inválido" }),

  data_de_nascimento: z.string().refine(isValidBirthDate, {
    message: "Data de nascimento inválida",
  }),

  email: z.string().email("E-mail inválido"),

  numero_de_celular: z
    .string()
    .regex(/^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/, "Número de celular inválido."),

  sexo: z.string(),

  nome_social: z.string().max(50, "Deve ter no máximo 50 letras.").optional(),

  etnia: z.string(),

  estado_civil: z.string(),

  bioimpedancia: z.number().optional(),

  data_do_exame: z.string().refine(
    (val) => {
      const date = new Date(val);
      const today = new Date();
      return !isNaN(date.getTime()) && date < today;
    },
    { message: "Data inválida ou no futuro" }
  ),

  hora_do_exame: z.string().min(1, "Hora do exame é obrigatória"),

  altura: z.number().optional(),

  agua_corporal_total: z.number().optional(),

  proteinas: z.number().optional(),

  minerais: z.number().optional(),

  gordura_corporal: z.number().optional(),

  peso: z.number().optional(),

  massa_muscular_esqueletica: z.number().optional(),

  imc: z.number().optional(),

  taxa_metabolica_basal: z.number().int().optional(),

  senha: z
    .string()
    .min(5, "A senha deve ter no mínimo 5 caracteres.")
    .refine((val) => (val.match(/[^A-Za-z0-9]/g) || []).length >= 2, {
      message: "A senha deve conter pelo menos 2 símbolos.",
    }),
});
