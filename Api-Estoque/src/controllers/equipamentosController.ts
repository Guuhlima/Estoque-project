import { FastifyReply, FastifyRequest } from 'fastify';
import { EquipamentoBodySchema, EquipamentoParamsSchema } from '../schemas/equipamentosSchemas';
import { Static } from '@sinclair/typebox';
import pool from '../config/db';

type Body = Static<typeof EquipamentoBodySchema>;
type Params = Static<typeof EquipamentoParamsSchema>;

export async function cadastrarEquipamento(req: FastifyRequest<{ Body: Body }>, reply: FastifyReply) {
    try{
        const { equipamento, quantidade, data} = req.body;
        const result = await pool.query(
            'INSERT INTO equipamentos (equipamento, quantidade, data) VALUES ($1, $2, $3) RETURNING *',
            [equipamento, quantidade, data]
        );
        reply.send(result.rows[0]);
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao cadastrar equipamento' });
        console.error(error);
        return;
    }
}

export async function visualizarEquipamentos(_: FastifyRequest , reply: FastifyReply) {
    try{
        const result = await pool.query('SELECT * FROM equipamentos')
        reply.send(result.rows);
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao buscar equipamentos' });
        console.error(error);
        return;
    }
}

export async function visualizarEquipamentosPorId(req: FastifyRequest <{Params: Params}>, reply: FastifyReply) {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM equipamentos WHERE id = $1',
            [id]
        )
        reply.send(result.rows[0]);
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao buscar equipamento' });
        console.error(error);
    }
}

export async function editarEquipamento(req: FastifyRequest<{ Body: Body, Params: Params}>, reply: FastifyReply) {
    try {
        const { id } = req.params;
        const { equipamento, quantidade, data } = req.body;

        const result = await pool.query(
            'UPDATE equipamentos SET equipamento = $1, quantidade = $2, data = $3 WHERE id = $4 RETURNING *',
            [equipamento, quantidade, data, id]
        )

        if (result.rowCount === 0) {
            reply.status(404).send({ error: 'Equipamento não encontrado'});
            return;
        }

        reply.send(result.rows[0]);
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao editar equipamento' });
        console.error(error);
        return;
    }
}

export async function deletarEquipamento(req: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM equipamentos WHERE id = $1 RETURNING *',
            [id]
        )

        if ( result.rowCount === 0 ) {
            reply.status(404).send({ error: 'Equipamento não encontrado'})
            return;
        } 
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao deletar equipamento' });
        console.error(error);
        return;
    }
}