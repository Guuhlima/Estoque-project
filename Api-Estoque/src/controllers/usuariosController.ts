import { FastifyReply, FastifyRequest } from 'fastify';
import { UsuarioBodySchema, UsuarioParamsSchema } from 'schemas/usuariosSchemas';
import { Static } from '@sinclair/typebox';
import pool from '../config/db';
import bcrypt from 'bcrypt';

type Body = Static<typeof UsuarioBodySchema>;
type Params = Static<typeof UsuarioParamsSchema>;

export async function cadastrarUsuarios(req: FastifyRequest<{Body: Body}>, reply: FastifyReply) {
    try {
        const { nome, email, matricula, senha } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(senha, salt)

        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, matricula, senha) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, matricula, hashPassword]
        )

        reply.send(result.rows[0]);
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao cadastrar usuarios' });
        console.error(error);
        return;
    }
}

export async function login(req: FastifyRequest<{Body: Body}>, reply: FastifyReply) {
    try {
        const { email, senha } = req.body;

        const result = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        )

        const user = result.rows[0]

        if (!user) {
            reply.status(404).send({ error: 'Usuario nao encontrado'})
        }

        const isValid = await bcrypt.compare(senha, user.senha);

        if (!isValid) {
            reply.status(401).send('Senha incorreta');
        }

        reply.status(200).send('Login realizado com sucesso')
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao realizar login' });
        console.error(error);
        return;
    }
}

export async function visualizarUsuarios(_: FastifyRequest, reply: FastifyReply) {
    try {
        const result = await pool.query(
            'SELECT * FROM usuarios'
        )

        reply.send(result.rows);
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao consultar todos usuarios'});
        console.error(error);
        return;
    }
}

export async function visualizarUsuariosPorId(req: FastifyRequest<{Params: Params}>, reply: FastifyReply) {
    try {
        const {id} = req.params;

        const result = await pool.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [id]
        )

        reply.send(result.rows[0])
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao consultar usuario'});
        console.error(error);
        return;
    }
}

export async function deletarUsuarios(req: FastifyRequest<{Params: Params}>, reply: FastifyReply) {
    try {
        const {id} = req.params;

        const result = await pool.query(
            'DELETE FROM usuarios WHERE id = $1',
            [id]
        )

        if (result.rowCount === 0) {
            reply.status(404).send({ error: 'Não foi encontrado o usuario'})
        }

        reply.status(200).send('Sucesso ao deletar usuario')
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao deletar usuario'});
        console.error(error);
        return;
    }
}

export async function editarUsuarios(req: FastifyRequest<{Body: Body, Params: Params}>, reply: FastifyReply){
    try {
        const {id} = req.params;
        const { nome, email, matricula, senha} = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(senha, salt)

        const result = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, matricula = $3, senha = $4 WHERE id = $5 RETURNING *',
            [nome, email, matricula, hashPassword, id]
        )

        if (result.rowCount === 0) {
            reply.status(404).send({ error: 'Não foi encontrado o usuario'})
        }

        reply.send(result.rows[0])
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao editar usuario'});
        console.error(error);
        return;
    }
}