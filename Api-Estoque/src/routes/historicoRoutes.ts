import { FastifyInstance } from "fastify";
import { 
    cadastroHistorico,
} from "../controllers/historicoController";

import { HistoricoBodySchema } from '../schemas/historico';

export async function historicoRoutes(app: FastifyInstance){
    app.post('/history/cadastro', {
        schema: { body: HistoricoBodySchema },
        handler: cadastroHistorico
    })
}