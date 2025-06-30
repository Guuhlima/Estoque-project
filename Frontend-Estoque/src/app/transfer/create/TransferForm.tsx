'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transferSchema, TransferSchemaType } from './schema';
import axios from 'axios';

export default function TransferForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferSchemaType>({
    resolver: zodResolver(transferSchema),
  });

  const onSubmit = async (data: TransferSchemaType) => {
    try {
      await axios.post('/transfer/transferencias', data);
      alert('Transferência realizada com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar transferência.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6 bg-white p-6 shadow-md rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ID do Item</label>
        <input
          type="number"
          {...register('itemId')}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.itemId && <p className="text-sm text-red-500 mt-1">{errors.itemId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estoque de Origem</label>
        <input
          type="number"
          {...register('estoqueOrigemId')}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.estoqueOrigemId && <p className="text-sm text-red-500 mt-1">{errors.estoqueOrigemId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estoque de Destino</label>
        <input
          type="number"
          {...register('estoqueDestinoId')}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.estoqueDestinoId && <p className="text-sm text-red-500 mt-1">{errors.estoqueDestinoId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
        <input
          type="number"
          {...register('quantidade')}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.quantidade && <p className="text-sm text-red-500 mt-1">{errors.quantidade.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Transferir
      </button>
    </form>
  );
}
