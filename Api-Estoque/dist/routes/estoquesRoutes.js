import { cadastrarEstoque, visualizarEstoque, visualizarEstoquePorId, editarEstoque, deletarEstoque, } from '../controllers/estoquesController';
import { EstoqueBodySchema, EstoqueParamsSchema } from '../schemas/estoquesSchemas';
export async function estoquesRoutes(app) {
    app.post('/estoques', {
        schema: { body: EstoqueBodySchema },
        handler: cadastrarEstoque,
    });
    app.get('/estoques', visualizarEstoque);
    app.get('/estoques/:id', {
        schema: { params: EstoqueParamsSchema },
        handler: visualizarEstoquePorId,
    });
    app.put('/estoques/:id', {
        schema: { body: EstoqueBodySchema, params: EstoqueParamsSchema },
        handler: editarEstoque,
    });
    app.delete('/estoques/:id', {
        schema: { params: EstoqueParamsSchema },
        handler: deletarEstoque,
    });
}
