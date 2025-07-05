import { cadastrarEstoque, visualizarEstoque, visualizarEstoquePorId, editarEstoque, deletarEstoque, visualizarItensPorEstoque } from '../controllers/estoquesController';
import { EstoqueBodySchema, EstoqueParamsSchema } from '../schemas/estoquesSchemas';
export async function estoquesRoutes(app) {
    app.post('/stock/cadastro', { schema: { body: EstoqueBodySchema }, handler: cadastrarEstoque });
    app.get('/stock/estoques', visualizarEstoque);
    app.get('/stock/estoques/:id', { schema: { params: EstoqueParamsSchema }, handler: visualizarEstoquePorId });
    app.get('/stock/estoques/:id/itens', { schema: { params: EstoqueParamsSchema }, handler: visualizarItensPorEstoque });
    app.put('/stock/estoques/:id', { schema: { params: EstoqueParamsSchema, body: EstoqueBodySchema }, handler: editarEstoque });
    app.delete('/stock/estoques/:id', { schema: { params: EstoqueParamsSchema }, handler: deletarEstoque });
}
