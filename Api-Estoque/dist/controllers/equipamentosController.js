import { prisma } from '../lib/prisma';
export async function cadastrarEquipamento(req, reply) {
    try {
        const { nome, quantidade, data } = req.body;
        const novoEquipamento = await prisma.equipamento.create({
            data: {
                nome,
                quantidade,
                data: new Date(data),
            },
        });
        reply.send(novoEquipamento);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao cadastrar equipamento' });
        console.error(error);
    }
}
export async function visualizarEquipamentos(_, reply) {
    try {
        const equipamentos = await prisma.equipamento.findMany();
        reply.send(equipamentos);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao buscar equipamentos' });
        console.error(error);
    }
}
export async function visualizarEquipamentosPorId(req, reply) {
    try {
        const { id } = req.params;
        const equipamento = await prisma.equipamento.findUnique({
            where: { id: parseInt(id) },
        });
        if (!equipamento) {
            reply.status(404).send({ error: 'Equipamento não encontrado' });
            return;
        }
        reply.send(equipamento);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao buscar equipamento' });
        console.error(error);
    }
}
export async function editarEquipamento(req, reply) {
    try {
        const { id } = req.params;
        const { nome, quantidade, data } = req.body;
        const equipamentoEditado = await prisma.equipamento.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                quantidade,
                data: new Date(data),
            },
        });
        reply.send(equipamentoEditado);
    }
    catch (error) {
        if (error.code === 'P2025') {
            reply.status(404).send({ error: 'Equipamento não encontrado' });
        }
        else {
            reply.status(500).send({ error: 'Erro ao editar equipamento' });
            console.error(error);
        }
    }
}
export async function deletarEquipamento(req, reply) {
    try {
        const { id } = req.params;
        const equipamentoDeletado = await prisma.equipamento.delete({
            where: { id: parseInt(id) },
        });
        reply.send(equipamentoDeletado);
    }
    catch (error) {
        if (error.code === 'P2025') {
            reply.status(404).send({ error: 'Equipamento não encontrado' });
        }
        else {
            reply.status(500).send({ error: 'Erro ao deletar equipamento' });
            console.error(error);
        }
    }
}
