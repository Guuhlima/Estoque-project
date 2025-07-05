import { FastifyInstance } from "fastify";
import {
    cadastrarEquipamento,
    editarEquipamento,
    visualizarEquipamentos,
    visualizarEquipamentosPorId,
    deletarEquipamento
} from "../controllers/equipamentosController";

import { EquipamentoBodySchema, EquipamentoParamsSchema } from "../schemas/equipamentosSchemas";

export async function equipamentosRoutes(app: FastifyInstance) {
    app.post('/equipment/cadastro', {
        schema: { body: EquipamentoBodySchema },
        handler:  cadastrarEquipamento
    });

    app.get('/equipment/visualizar',  visualizarEquipamentos );

    app.get('/equipment/visualizar/:id', {
        schema: { params: EquipamentoParamsSchema },
        handler: visualizarEquipamentosPorId
    })

    app.put('/equipment/editar/:id', {
        schema: {params: EquipamentoParamsSchema, body: EquipamentoBodySchema},
        handler: editarEquipamento
    })

    app.delete('/equipment/deletar/:id', {
        schema: { params: EquipamentoParamsSchema },
        handler: deletarEquipamento
    });
}