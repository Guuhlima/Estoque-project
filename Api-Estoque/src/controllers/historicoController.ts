import { FastifyReply, FastifyRequest } from 'fastify';
import { HistoricoBodySchema, HistoricoParamsSchema } from '../schemas/historico';
import { Static } from '@sinclair/typebox';
import pool from '../config/db';

type Body = Static<typeof HistoricoBodySchema>
//type Params = Static<typeof HistoricoParamsSchema>

export async function cadastroHistorico(req: FastifyRequest<{Body: Body}>, reply: FastifyReply) {
    try {
        const {matricula, data, descricao} = req.body;

        const result = await pool.query(
            'INSERT INTO historico (matricula, data, descricao) VALUES ($1, $2, $3) RETURNING *',
            [matricula, data, descricao]
        )

        reply.send(result.rows[0]);
    } catch(error) {
        reply.status(500).send({ error: 'Erro ao cadastrar historico' });
        console.error(error);
        return;
    }
}
