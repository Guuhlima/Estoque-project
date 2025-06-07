import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import publicItem from './routes/cadastroEquipamentos.js'
import publicUser from './routes/user.js'

dotenv.config();

const PORT = process.env.PORT
const app = express();

app.use(express.json());
app.use(cors());
app.listen(PORT, () => {`O servidor está rodando ${PORT}`})
app.use('/', publicItem);
app.use('/user', publicUser);