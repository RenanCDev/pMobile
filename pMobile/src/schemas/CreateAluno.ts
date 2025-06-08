import * as z from "zod";
import { isValidCPF } from "../utils/cpf/cpf-validation";
import { isValidBirthDate } from "../utils/data-nascimento";

export const CreateAluno = z.object({
  nome: z
    .string()
    .min(5, "Deve ter no mínimo 5 letras.")
    .max(50, "Deve ter no máximo 50 letras.")
    .regex(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "O nome não pode conter números ou caracteres especiais."
    ),
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

  bioimpedancia: z.string(),

  data_do_exame: z.string().refine(
    (val) => {
      const date = new Date(val);
      const today = new Date();
      return !isNaN(date.getTime()) && date < today;
    },
    { message: "Data inválida ou no futuro" }
  ),

  hora_do_exame: z.string().min(1, "Hora do exame é obrigatória"),

  altura: z.coerce
    .number({ invalid_type_error: "Digite no padrao 1.70" })
    .nonnegative("Altura inválida")
    .min(0.5, "Altura é obrigatória")
    .max(3, "Altura inválida"),

  agua_corporal_total: z.coerce
    .number()
    .nonnegative("Água corporal inválida")
    .max(80, "Água corporal inválida"),

  proteinas: z.coerce
    .number()
    .nonnegative("Proteinas inválidas")
    .max(50, "Proteinas inválidas"),

  minerais: z.coerce
    .number()
    .nonnegative("Minerais inválidos")
    .max(10, "Minerais inválidos"),

  gordura_corporal: z.coerce
    .number()
    .nonnegative("Gordura corporal inválida")
    .max(100, "Gordura corporal inválida"),

  peso: z.coerce
    .number({ invalid_type_error: "Digite no padrao 100.500" })
    .nonnegative("Peso inválido")
    .min(20, "Peso é obrigatório")
    .max(400, "Peso inválido"),

  massa_muscular_esqueletica: z.coerce
    .number()
    .nonnegative("Massa muscular esqueletica inválida")
    .max(70, "Massa muscular esqueletica inválida"),

  imc: z.coerce.number().nonnegative("IMC inválida").max(150, "IMC inválido"),

  taxa_metabolica_basal: z.coerce
    .number()
    .nonnegative("Taxa metabolica basal inválida")
    .max(15000, "Taxa metabolica basal inválida "),
  
  senha: z
    .string()
    .min(5, "A senha deve ter no mínimo 5 caracteres.")
    .refine((val) => (val.match(/[^A-Za-z0-9]/g) || []).length >= 2, {
      message: "A senha deve conter pelo menos 2 símbolos.",
    }),
});
