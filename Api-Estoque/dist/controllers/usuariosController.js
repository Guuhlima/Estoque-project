import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
export async function cadastrarUsuarios(req, reply) {
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
    }
    catch (error) {
        if (error.code === 'P2002') {
            reply.status(409).send({ error: 'Email já está em uso' });
        }
        else {
            reply.status(500).send({ error: 'Erro ao cadastrar usuário' });
            console.error(error);
        }
    }
}
export async function login(req, reply) {
    try {
        const { email, senha } = req.body;
        const user = await prisma.usuario.findUnique({
            where: { email },
        });
        if (!user) {
            return reply.status(404).send({ error: 'Usuário não encontrado' });
        }
        const isValid = await bcrypt.compare(senha, user.senha);
        if (!isValid) {
            return reply.status(401).send({ error: 'Senha incorreta' });
        }
        reply.send('Login realizado com sucesso');
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao realizar login' });
        console.error(error);
    }
}
export async function visualizarUsuarios(_, reply) {
    try {
        const usuarios = await prisma.usuario.findMany();
        reply.send(usuarios);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao consultar usuários' });
        console.error(error);
    }
}
export async function visualizarUsuariosPorId(req, reply) {
    try {
        const id = parseInt(req.params.id);
        const usuario = await prisma.usuario.findUnique({ where: { id } });
        if (!usuario) {
            return reply.status(404).send({ error: 'Usuário não encontrado' });
        }
        reply.send(usuario);
    }
    catch (error) {
        reply.status(500).send({ error: 'Erro ao consultar usuário' });
        console.error(error);
    }
}
export async function deletarUsuarios(req, reply) {
    try {
        const id = parseInt(req.params.id);
        await prisma.usuario.delete({ where: { id } });
        reply.send('Sucesso ao deletar usuário');
    }
    catch (error) {
        if (error.code === 'P2025') {
            reply.status(404).send({ error: 'Usuário não encontrado' });
        }
        else {
            reply.status(500).send({ error: 'Erro ao deletar usuário' });
            console.error(error);
        }
    }
}
export async function editarUsuarios(req, reply) {
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
    }
    catch (error) {
        if (error.code === 'P2025') {
            reply.status(404).send({ error: 'Usuário não encontrado' });
        }
        else {
            reply.status(500).send({ error: 'Erro ao editar usuário' });
            console.error(error);
        }
    }
}
