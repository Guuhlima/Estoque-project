import { FastifyReply, FastifyRequest } from 'fastify';
import { UsuarioBodySchema, UsuarioParamsSchema, UsuarioLoginSchema } from '../schemas/usuariosSchemas';
import { Static } from '@sinclair/typebox';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import dotenv from 'dotenv';
dotenv.config();

type Body = Static<typeof UsuarioBodySchema>;
type Params = Static<typeof UsuarioParamsSchema>;

export async function cadastrarUsuarios(req: FastifyRequest<{ Body: Body }>, reply: FastifyReply) {
  try {
    const { nome, email, matricula, senha } = req.body;

    const hashPassword = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        matricula,
        senha: hashPassword,
      },
    });

    reply.send(usuario);
  } catch (error: any) {
    if (error.code === 'P2002') {
      reply.status(409).send({ error: 'Email já está em uso' });
    } else {
      reply.status(500).send({ error: 'Erro ao cadastrar usuário' });
      console.error(error);
    }
  }
}

export async function login(req: FastifyRequest<{ Body: Static<typeof UsuarioLoginSchema> }>, reply: FastifyReply) {
  try {
    const { email, senha } = req.body;

    const user = await prisma.usuario.findUnique({
      where: { email },
      include: {
        permissoes: {
          include: {
            permissao: true,
          },
        },
      },
    });

    if (!user || !user.senha) {
      return reply.status(400).send({ error: 'Usuário ou senha inválidos' });
    }

    const isValid = await bcrypt.compare(senha, user.senha);

    if (!isValid) {
      return reply.status(401).send({ error: 'Senha incorreta' });
    }

    const permissoes = user.permissoes.map(p => p.permissao.nome);

    const payload = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      permissoes,
    };

    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = (process.env.JWT_EXPIRES_IN || '24h') as StringValue;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET não está definida nas variáveis de ambiente');
    }

    const signOptions: SignOptions = {
      expiresIn: jwtExpiresIn,
    };

    const token = jwt.sign(payload, jwtSecret, signOptions);

    reply.send({
      message: 'Login realizado com sucesso',
      token,
      user: payload,
    });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao realizar login' });
  }
}

export async function visualizarUsuarios(_: FastifyRequest, reply: FastifyReply) {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        permissoes: {
          include: {
            permissao: true,
          },
        },
      },
    });

    const usuariosComPermissoes = usuarios.map((user) => ({
      ...user,
      permissoes: user.permissoes.map((p) => p.permissao.nome),
    }));

    reply.send(usuariosComPermissoes);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao consultar usuários' });
    console.error(error);
  }
}

export async function visualizarUsuariosPorId(req: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
  try {
    const id = parseInt(req.params.id);
    const usuario = await prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      return reply.status(404).send({ error: 'Usuário não encontrado' });
    }

    reply.send(usuario);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao consultar usuário' });
    console.error(error);
  }
}

export async function deletarUsuarios(req: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
  try {
    const id = parseInt(req.params.id);
    await prisma.usuario.delete({ where: { id } });

    reply.send('Sucesso ao deletar usuário');
  } catch (error: any) {
    if (error.code === 'P2025') {
      reply.status(404).send({ error: 'Usuário não encontrado' });
    } else {
      reply.status(500).send({ error: 'Erro ao deletar usuário' });
      console.error(error);
    }
  }
}

export async function editarUsuarios(req: FastifyRequest<{ Body: Body; Params: Params }>, reply: FastifyReply) {
  try {
    const id = parseInt(req.params.id);
    const { nome, email, matricula, senha } = req.body;

    const hashPassword = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.update({
      where: { id },
      data: {
        nome,
        email,
        matricula,
        senha: hashPassword,
      },
    });

    reply.send(usuario);
  } catch (error: any) {
    if (error.code === 'P2025') {
      reply.status(404).send({ error: 'Usuário não encontrado' });
    } else {
      reply.status(500).send({ error: 'Erro ao editar usuário' });
      console.error(error);
    }
  }
}
