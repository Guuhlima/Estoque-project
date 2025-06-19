import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { equipamentosRoutes } from './routes/equipamentosRoutes';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const app = Fastify().withTypeProvider<TypeBoxTypeProvider>();

app.register(equipamentosRoutes);

app.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
  console.log(`🚀 Servidor rodando em ${address}`);
});
