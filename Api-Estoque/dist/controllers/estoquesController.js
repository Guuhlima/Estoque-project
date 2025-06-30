import { prisma } from '../lib/prisma';
export async function cadastrarEstoque(req, reply) {
    try {
        const { nome } = req.body;
        const novoEstoque = await prisma.estoque.create({
            data: {
                nome,
            },
        });
        reply.send(novoEstoque);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao cadastrar estoque' });
        console.error(error);
    }
}
export async function visualizarEstoque(_, reply) {
    try {
        const estoques = await prisma.estoque.findMany();
        reply.send(estoques);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao buscar estoques' });
        console.error(error);
    }
}
export async function visualizarEstoquePorId(req, reply) {
    try {
        const { id } = req.params;
        const estoque = await prisma.estoque.findUnique({
            where: { id: parseInt(id) },
        });
        if (!estoque) {
            reply.status(404).send({ error: 'Estoque não encontrado' });
            return;
        }
        reply.send(estoque);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao buscar estoque' });
        console.error(error);
    }
}
export async function editarEstoque(req, reply) {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const editarEstoque = await prisma.estoque.update({
            where: { id: parseInt(id) },
            data: {
                nome
            },
        });
        reply.send(editarEstoque);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao editar estoque' });
        console.error(error);
    }
}
export async function deletarEstoque(req, reply) {
    try {
        const { id } = req.params;
        const deletarEstoque = await prisma.estoque.delete({
            where: { id: parseInt(id) },
        });
        reply.send(deletarEstoque);
    }
    catch (error) {
        if (error.code === 'P2025') {
            reply.status(404).send({ error: 'Estoque não encontrado' });
        }
        else {
            reply.status(500).send({ error: 'Erro ao deletar estoque' });
            console.error(error);
        }
    }
}
