import express from 'express'
import pool from '../config/db.js'

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Equipamentos
 *   description: API para gerenciamento de equipamentos
 */

/**
 * @swagger
 * /equipamentos/cadastro:
 *   post:
 *     summary: Cadastrar novo equipamento
 *     tags: [Equipamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               equipamento:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Equipamento criado com sucesso
 */
router.post('/cadastro', async (req, res) => {
    try {
        const { equipamento, quantidade, data } = req.body;

        const createItem = await pool.query(
            'INSERT INTO equipamentos (equipamento, quantidade, data) VALUES ($1, $2, $3) RETURNING *',
            [ equipamento, quantidade, data]
        )

        return res.json(createItem.rows[0])
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Erro ao cadastrar informação');
    }
});

/**
 * @swagger
 * /visualizar:
 *   get:
 *     summary: Visualizar todos os equipamentos
 *     tags: [Equipamentos]
 *     responses:
 *       200:
 *         description: Lista de equipamentos
 */
router.get('/visualizar', async(req, res) => {
    try {
        const getItem = await pool.query(
            'SELECT * FROM equipamentos'
        )

        return res.json(getItem.rows)
    } catch (err){
        console.error(err.message);
        return res.status(500).send('Erro ao buscar informações');
    }
});

/**
 * @swagger
 * /visualizar/{id}:
 *   get:
 *     summary: Visualizar um equipamento por ID
 *     tags: [Equipamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Equipamento encontrado
 *       401:
 *         description: Equipamento não encontrado
 */
router.get('/visualizar/:id', async(req,res) => {
    try {
        const {id} = req.params

        const getidItem = await pool.query(
            'SELECT * FROM equipamentos WHERE ID = $1',
            [id]
        )

        if(getidItem.rowCount == 0) {
            return res.status(401).send('Não foi possivel localizar id')
        }

        return res.json(getidItem.rows[0])
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Erro ao buscar informação')
    }
});

/**
 * @swagger
 * /editar/{id}:
 *   put:
 *     summary: Editar um equipamento existente
 *     tags: [Equipamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               equipamento:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Equipamento atualizado
 *       401:
 *         description: Equipamento não encontrado
 */
router.put('/editar/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const { equipamento, quantidade, data } = req.body;

        const editItem = await pool.query(
            'UPDATE equipamentos SET equipamento = $1, quantidade = $2, data = $3 WHERE ID = $4',
            [equipamento, quantidade, data, id]
        )

        if(editItem.rowCount == 0) {
            return res.status(401).send('Não foi possivel localizar informações')
        }

        return res.status(200).send('Informações atualizadas com sucesso')
    } catch(err) {
        console.error(err.message);
        return res.status(500).send('Erro ao atualizar informações')
    }
});

/**
 * @swagger
 * /deletar/{id}:
 *   delete:
 *     summary: Deletar um equipamento
 *     tags: [Equipamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Equipamento deletado
 */
router.delete('/deletar/:id', async(req, res) => {
    try {
        const {id} = req.params;

        const deleteItem = await pool.query(
            'DELETE FROM equipamentos WHERE ID = $1',
            [id]
        )

        return res.status(200).send('Informações apagadas com sucesso');
    } catch(err) {
        console.error(err.message)
        return res.status(500).send('Erro ao deletar informação')
    }
});

export default router