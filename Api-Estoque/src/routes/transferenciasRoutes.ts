import { FastifyInstance } from 'fastify';
import {
    realizarTransferencia,
    visualizarTransferencias,
    visualizarTransferenciaPorId,
    deletarTransferencia
} from '../controllers/transferenciasController';
import { TransferenciaBodySchema, TransferenciaParamsSchema } from '../schemas/transferenciasSchema';

export async function transferenciasRoutes(app: FastifyInstance) {
    app.post('/transfer/cadastro', {
        schema: { body: TransferenciaBodySchema },
        handler: realizarTransferencia
    });

    app.get('/transfer/visualizar', visualizarTransferencias);

    app.get('/transfer/visualizar/:id', {
        schema: { params: TransferenciaParamsSchema },
        handler: visualizarTransferenciaPorId
    });

    app.delete('/transfer/deletar/:id', {
        schema: { params: TransferenciaParamsSchema },
        handler: deletarTransferencia
    });
}
