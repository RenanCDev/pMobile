import * as z from "zod";
import { isValidCPF } from "../utils/cpf/cpf-validation";

export const loginSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF é obrigatório.")
    .max(14, "CPF deve ter no máximo 14 caracteres")
    .refine(isValidCPF, { message: "CPF inválido" }),

  senha: z
    .string()
    .min(5, "A senha deve ter no mínimo 5 caracteres.")
});

export type LoginFormData = z.infer<typeof loginSchema>;
