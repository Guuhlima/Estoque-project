import { FastifyInstance } from 'fastify';
import {
    cadastrarEstoque,
    visualizarEstoque,
    visualizarEstoquePorId,
    editarEstoque,
    deletarEstoque,
    visualizarItensPorEstoque
} from '../controllers/estoquesController';
import { EstoqueBodySchema, EstoqueParamsSchema } from '../schemas/estoquesSchemas';

export async function estoquesRoutes(app: FastifyInstance) {
    app.post('/stock/cadastro', { schema: { body: EstoqueBodySchema }, handler: cadastrarEstoque });
    app.get('/stock/visualizar', visualizarEstoque);
    app.get('/stock/visualizar/:id', { schema: { params: EstoqueParamsSchema }, handler: visualizarEstoquePorId });
    app.get('/stock/visualizar/:id/itens', { schema: { params: EstoqueParamsSchema }, handler: visualizarItensPorEstoque });
    app.put('/stock/editar/:id', { schema: { params: EstoqueParamsSchema, body: EstoqueBodySchema }, handler: editarEstoque });
    app.delete('/stock/deletar/:id', { schema: { params: EstoqueParamsSchema }, handler: deletarEstoque });
}