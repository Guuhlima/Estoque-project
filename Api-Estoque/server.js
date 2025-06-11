import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import publicItem from './routes/publicEquipamentos.js'
import publicUser from './routes/user.js'
import publicHistory from './routes/publicHistory.js'
import setupSwagger from './swagger.js' 

dotenv.config();

const PORT = process.env.PORT
const app = express();

app.use(express.json());
app.use(cors());
setupSwagger(app);
app.listen(PORT, () => {`O servidor está rodando ${PORT}`})

//ROTAS
app.use('/', publicItem);
app.use('/user', publicUser);
app.use('/history', publicHistory)