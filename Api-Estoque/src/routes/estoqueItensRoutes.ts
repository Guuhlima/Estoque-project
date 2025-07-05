import { FastifyInstance } from 'fastify';
import { adicionarItemAoEstoque } from '../controllers/estoqueItensController'
import { EstoqueItemBodySchema, EstoqueItemParamsSchema} from '../schemas/estoqueItensSchemas';


export async function estoqueItensRoutes(app: FastifyInstance) {
    app.post('/stockmovi/cadastro/:id/adicionar-equipamento', {
        schema: {
            params: EstoqueItemParamsSchema,
            body: EstoqueItemBodySchema
        },
        handler: adicionarItemAoEstoque
    });
}
