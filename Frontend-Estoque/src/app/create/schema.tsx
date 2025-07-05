import { z } from "zod";

export const itemSchema = z.object({
    nome: z.string().min(1, "Nome obrigatório"),
    quantidade: z.coerce.number().min(1, "Quantidade deve ser maior que zero"),
    data: z.string().min(1, "Data obrigatória")
})

export type ItemFormData = z.infer<typeof itemSchema>;