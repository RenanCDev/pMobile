import { z } from 'zod';

export const CreateServico = z.object({
  tipo: z
    .string()
    .min(5, { message: 'O tipo deve ter pelo menos 5 letras.' }),
  descricao: z
    .string()
    .min(5, { message: 'A descrição deve ter pelo menos 5 letras.' }),
  valor: z
    .string()
    .refine((val) => {
      const parsed = parseFloat(val.replace(',', '.'));
      return !isNaN(parsed) && parsed > 0;
    }, { message: 'O valor deve ser um número positivo.' }),
});
