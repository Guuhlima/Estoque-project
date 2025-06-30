import { prisma } from '../lib/prisma';
export async function realizarTransferencia(req, reply) {
    try {
        const { itemId, estoqueOrigemId, estoqueDestinoId, quantidade } = req.body;
        const itemOrigem = await prisma.estoqueItem.findFirst({
            where: { itemId, estoqueId: estoqueOrigemId },
        });
        if (!itemOrigem || itemOrigem.quantidade < quantidade) {
            return reply.status(400).send({ error: 'Quantidade insuficiente no estoque de origem' });
        }
        await prisma.estoqueItem.update({
            where: { id: itemOrigem.id },
            data: { quantidade: { decrement: quantidade } },
        });
        await prisma.estoqueItem.upsert({
            where: {
                itemId_estoqueId: {
                    itemId,
                    estoqueId: estoqueDestinoId,
                },
            },
            update: {
                quantidade: { increment: quantidade },
            },
            create: {
                itemId,
                estoqueId: estoqueDestinoId,
                quantidade,
            },
        });
        await prisma.transferencia.create({
            data: {
                itemId,
                estoqueOrigemId,
                estoqueDestinoId,
                quantidade,
            },
        });
        reply.send({ message: 'Transferência realizada com sucesso' });
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao realizar transferência' });
        console.error(error);
    }
}
export async function visualizarTransferencias(_, reply) {
    try {
        const transferencias = await prisma.transferencia.findMany();
        reply.send(transferencias);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao listar transferências' });
        console.error(error);
    }
}
export async function visualizarTransferenciaPorId(req, reply) {
    try {
        const id = parseInt(req.params.id);
        const transferencia = await prisma.transferencia.findUnique({
            where: { id },
        });
        if (!transferencia) {
            return reply.status(404).send({ error: 'Transferência não encontrada' });
        }
        reply.send(transferencia);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao consultar transferência' });
        console.error(error);
    }
}
export async function deletarTransferencia(req, reply) {
    try {
        const id = parseInt(req.params.id);
        await prisma.transferencia.delete({ where: { id } });
        reply.send('Transferência deletada com sucesso');
    }
    catch (error) {
        if (error.code === 'P2025') {
            reply.status(404).send({ error: 'Transferência não encontrada' });
        }
        else {
            reply.status(500).send({ error: 'Erro ao deletar transferência' });
            console.error(error);
        }
    }
}
