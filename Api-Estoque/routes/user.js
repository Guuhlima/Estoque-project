import express from 'express'
import pool from '../config/db.js'
import bcrypt from 'bcrypt'

const router = express.Router();

/**
 * @swagger
 * /cadastro:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - matricula
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               matricula:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *       500:
 *         description: Erro ao realizar cadastro de usuário
 */
router.post('/cadastro', async(req, res) => {
    try {
        const { nome , email, matricula, senha } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(senha, salt)

        const registerUser = await pool.query(
            'INSERT INTO usuarios (nome, email, matricula ,senha) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, matricula, hashPassword]
        )

        return res.json(registerUser.rows[0])
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Erro ao realizar cadastro de usuario')
    }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Usuário não encontrado ou senha incorreta
 */
router.post('/login', async(req, res) => {
    try {
        const { email, senha } = req.body;

        const loginUser = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        const user = loginUser.rows[0]

        if (!user) {
            return res.status(401).send('Usuario nao encontrado');
        }

        const isValid = await bcrypt.compare(senha, user.senha);

        if (!isValid) {
            return res.status(401).send('Senha incorreta');
        }

        return res.status(200).send('Login realizado com sucesso')
    } catch(err) {
        console.error(err.message);
        return res.status(200).send('Erro ao realizar login');
    }
});

export default router