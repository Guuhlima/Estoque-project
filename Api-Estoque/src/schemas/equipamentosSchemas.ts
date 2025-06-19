import {Type} from '@sinclair/typebox';

export const EquipamentoBodySchema = Type.Object({
    equipamento: Type.String(),
    quantidade: Type.Integer(),
    data: Type.String({format: 'date'}),
});

export const EquipamentoParamsSchema = Type.Object({
    id: Type.String(),
});