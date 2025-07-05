'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transferSchema, TransferSchemaType } from './schema';
import api from '@/services/api';

interface Estoque {
  id: number;
  nome: string;
}

export default function TransferForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferSchemaType>({
    resolver: zodResolver(transferSchema),
  });

  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [equipamentos, setEquipamentos] = useState<{ id: number; nome: string }[]>([]);


  useEffect(() => {
    async function fetchEstoques() {
      try {
        const res = await api.get('/stock/visualizar');
        setEstoques(res.data);
      } catch (error) {
        console.error('Erro ao buscar estoques', error);
      }
    }

    fetchEstoques();
  }, []);

  useEffect(() => {
    async function fetchEquipamentos(){
      try {
        const res = await api.get('/equipment/visualizar');
        setEquipamentos(res.data)
      } catch (error) {
        console.error('Erro ao buscar equipamentos', error)
      }
    }

    fetchEquipamentos();
  }, []);

  const onSubmit = async (data: TransferSchemaType) => {
    try {
      await api.post('/transfer/cadastro', data);
      alert('Transferência realizada com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar transferência.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6 bg-white p-6 shadow-md rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Equipamento</label>
        <select
          {...register('itemId', { valueAsNumber: true })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        >
          <option value="">Selecione um equipamento</option>
          {equipamentos.map((equipamento) => (
            <option key={equipamento.id} value={equipamento.id}>
              {equipamento.nome}
            </option>
          ))}
        </select>
        {errors.itemId && <p className="text-sm text-red-500 mt-1">{errors.itemId.message}</p>}
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estoque de Origem</label>
        <select
          {...register('estoqueOrigemId')}
          className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
        >
          <option value="">Selecione</option>
          {estoques.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nome}
            </option>
          ))}
        </select>
        {errors.estoqueOrigemId && <p className="text-sm text-red-500 mt-1">{errors.estoqueOrigemId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estoque de Destino</label>
        <select
          {...register('estoqueDestinoId')}
          className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
        >
          <option value="">Selecione</option>
          {estoques.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nome}
            </option>
          ))}
        </select>
        {errors.estoqueDestinoId && <p className="text-sm text-red-500 mt-1">{errors.estoqueDestinoId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
        <input
          type="number"
          {...register('quantidade')}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
