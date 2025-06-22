import { Type } from "@sinclair/typebox";

export const HistoricoBodySchema = Type.Object({
    matricula: Type.Integer(),
    data: Type.String({format: 'date'}),
    descricao: Type.String(),
})

export const HistoricoParamsSchema = Type.Object({
    id: Type.String(),
})