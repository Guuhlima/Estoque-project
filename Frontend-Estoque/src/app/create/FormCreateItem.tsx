'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { itemSchema, ItemFormData } from './schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/services/api';

const FormCreateItem = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
  });

  const onSubmit = async (data: ItemFormData) => {
    try {
      await api.post('/cadastro', data);
      setMessage("Equipamento cadastrado com sucesso!");
      setTimeout(() => router.push('/home'), 2000);
    } catch (err) {
      console.error(err);
      setMessage("Erro ao cadastrar equipamento.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div>
        <label className="block font-medium">Equipamento</label>
        <input {...register("equipamento")} className="w-full border p-2 rounded text-gray-900" />
        {errors.equipamento && <p className="text-red-500 text-sm">{errors.equipamento.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Quantidade</label>
        <input type="number" {...register("quantidade")} className="w-full border p-2 rounded text-gray-900" />
        {errors.quantidade && <p className="text-red-500 text-sm">{errors.quantidade.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Data</label>
        <input type="date" {...register("data")} className="w-full border p-2 rounded text-gray-900" />
        {errors.data && <p className="text-red-500 text-sm">{errors.data.message}</p>}
      </div>

      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded w-full">
        Cadastrar
      </button>

      {message && <p className="text-center text-sm text-blue-600 mt-4">{message}</p>}
    </form>
  );
};

export default FormCreateItem;
