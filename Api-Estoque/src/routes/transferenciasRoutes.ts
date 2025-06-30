import { FastifyInstance } from 'fastify';
import {
    realizarTransferencia,
    visualizarTransferencias,
    visualizarTransferenciaPorId,
    deletarTransferencia
} from '../controllers/transferenciasController';
import { TransferenciaBodySchema, TransferenciaParamsSchema } from '../schemas/transferenciasSchema';

export async function transferenciasRoutes(app: FastifyInstance) {
    app.post('/transfer/transferencias', {
        schema: { body: TransferenciaBodySchema },
        handler: realizarTransferencia
    });

    app.get('/transfer/transferencias', visualizarTransferencias);

    app.get('/transfer/transferencias/:id', {
        schema: { params: TransferenciaParamsSchema },
        handler: visualizarTransferenciaPorId
    });

    app.delete('/transfer/transferencias/:id', {
        schema: { params: TransferenciaParamsSchema },
        handler: deletarTransferencia
    });
}
