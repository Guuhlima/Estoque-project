import express from 'express'
import pool from '../config/db.js'

const router = express.Router();

/**
 * @swagger
 * /history/cadastro:
 *   post:
 *     summary: Cadastra um novo historico
 *     tags: [Historico]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - matricula
 *               - data
 *               - descricao
 *             properties:
 *               matricula:
 *                 type: string
 *               data:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *       500:
 *         description: Erro ao realizar cadastro de usuário
 */
router.post('/cadastro', async (req, res) => {
    try {
        const {matricula, data, descricao} = req.body;

        const createHisoty = await pool.query(
            'INSERT INTO historico (matricula, data, descricao) VALUES ($1, $2, $3) RETURNING *',
            [matricula, data, descricao]
        )

        return res.json(createHisoty.rows[0])
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Erro ao realizar cadastro de historico')
    }
});

export default router
