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
    app.post('/equipamentos/cadastro', {
        schema: { body: EquipamentoBodySchema },
        handler:  cadastrarEquipamento
    });

    app.get('/visualizar',  visualizarEquipamentos );

    app.get('/visualizar/:id', {
        schema: { params: EquipamentoParamsSchema },
        handler: visualizarEquipamentosPorId
    })

    app.put('/editar/:id', {
        schema: {params: EquipamentoParamsSchema, body: EquipamentoBodySchema},
        handler: editarEquipamento
    })

    app.delete('/deletar/:id', {
        schema: { params: EquipamentoParamsSchema },
        handler: deletarEquipamento
    });
}