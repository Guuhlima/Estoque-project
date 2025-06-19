import { FastifyInstance } from "fastify";

import {
    cadastrarUsuarios,
    visualizarUsuarios,
    visualizarUsuariosPorId,
    deletarUsuarios,
    editarUsuarios,
    login
} from '../controllers/usuariosController'

import { UsuarioBodySchema, UsuarioParamsSchema, UsuarioLoginSchema } from "../schemas/usuariosSchemas";

export async function usuariosRoutes(app: FastifyInstance) {
    app.post('/user/cadastro', {
        schema: { body: UsuarioBodySchema },
        handler: cadastrarUsuarios 
    });

    app.get('/user/visualizar', visualizarUsuarios)

    app.get('/user/visualizar/:id', {
        schema: { params: UsuarioParamsSchema },
        handler: visualizarUsuariosPorId
    })

    app.delete('/user/deletar/:id', {
        schema: { params: UsuarioParamsSchema },
        handler: deletarUsuarios
    })

    app.put('/user/editar/:id', {
        schema: { body: UsuarioBodySchema, params: UsuarioParamsSchema},
        handler: editarUsuarios
    })

    app.post('/user/login', {
        schema: { body: UsuarioLoginSchema },
        handler: login
    })
}