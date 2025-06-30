'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEstoqueSchema, CreateEstoqueSchemaType } from './schema';
import axios from 'axios';

export default function CreateEstoqueForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEstoqueSchemaType>({
    resolver: zodResolver(createEstoqueSchema),
  });

  const onSubmit = async (data: CreateEstoqueSchemaType) => {
    try {
      await axios.post('/stock/cadastro', data);
      alert('Estoque criado com sucesso!');
      reset();
    } catch (error) {
      console.error(error);
      alert('Erro ao criar estoque.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Estoque</label>
        <input
          type="text"
          {...register('nome')}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.nome && <p className="text-sm text-red-500 mt-1">{errors.nome.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        {isSubmitting ? 'Criando...' : 'Criar Estoque'}
      </button>
    </form>
  );
}
