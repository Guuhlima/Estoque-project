import { FastifyInstance } from 'fastify';
import { adicionarItemAoEstoque, visualizarItensDoEstoque, visualizarQuantidadePorItemNoEstoque } from '../controllers/estoqueItensController'
import { EstoqueItemBodySchema, EstoqueItemParamsSchema, EstoqueItemQuantidadeParamsSchema} from '../schemas/estoqueItensSchemas';

export async function estoqueItensRoutes(app: FastifyInstance) {
    app.post('/stockmovi/cadastro/:id/adicionar-equipamento', {
        schema: {
            params: EstoqueItemParamsSchema,
            body: EstoqueItemBodySchema
        },
        handler: adicionarItemAoEstoque
    });

    app.get('/stockmovi/visualizar/:id/itens', {
        schema: {
            params: EstoqueItemParamsSchema,
        },
        handler: visualizarItensDoEstoque
    })

    app.get('/stockmovi/visualizar/:estoqueId/itens-quantidade/:itemId', {
        schema: { params: EstoqueItemQuantidadeParamsSchema },
        handler: visualizarQuantidadePorItemNoEstoque,
    });
}
