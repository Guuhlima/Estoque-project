import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { equipamentosRoutes } from './routes/equipamentosRoutes';
import { usuariosRoutes } from './routes/usuariosRoutes';
import { historicoRoutes } from './routes/historicoRoutes';
import { transferenciasRoutes } from './routes/transferenciasRoutes';
import { estoquesRoutes } from 'routes/estoquesRoutes';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const app = Fastify().withTypeProvider<TypeBoxTypeProvider>();

await app.register(cors, {
  origin: 'http://localhost:3000',
});

app.register(equipamentosRoutes);
app.register(usuariosRoutes);
app.register(historicoRoutes);
app.register(transferenciasRoutes);
app.register(estoquesRoutes);

app.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
  console.log(`🚀 Servidor rodando em ${address}`);
});
