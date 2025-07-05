import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';
import { Static, Type } from '@sinclair/typebox';
import {
  EstoqueItemBodySchema,
} from '../schemas/estoqueItensSchemas';


type Body = Static<typeof EstoqueItemBodySchema>;

export async function adicionarItemAoEstoque(
  req: FastifyRequest<{ Params: { id: string }, Body: Body }>,
  reply: FastifyReply
) {
  try {
    const estoqueId = parseInt(req.params.id);
    const { itemId, quantidade } = req.body;

    const upsert = await prisma.estoqueItem.upsert({
      where: {
        itemId_estoqueId: {
          itemId,
          estoqueId
        }
      },
      update: {
        quantidade: { increment: quantidade }
      },
      create: {
        itemId,
        estoqueId,
        quantidade
      }
    });

    reply.send(upsert);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao adicionar item ao estoque' });
  }
}
