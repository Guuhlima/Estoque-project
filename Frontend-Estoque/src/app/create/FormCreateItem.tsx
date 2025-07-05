'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { itemSchema, ItemFormData } from './schema';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import api from '@/services/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const FormCreateItem = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const MySwal = withReactContent(Swal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
  });

  const onSubmit = async (data: ItemFormData) => {
    try {
      await api.post('/cadastro', data);

      MySwal.fire({
        icon: 'success',
        title: 'Cadastrado!',
        text: 'Equipamento cadastrado com sucesso!',
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao cadastrar equipamento.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={() => {
          localStorage.removeItem('auth');
          window.location.href = '/';
        }}
      />

      <main
        className={`transition-all duration-300 px-4 sm:px-8 py-12 flex justify-center ${
          sidebarCollapsed ? 'ml-16' : 'ml-60'
        }`}
      >
        <Card className="w-full max-w-2xl bg-background border border-border shadow-lg rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center">Cadastrar Equipamento</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Equipamento</label>
                <Input {...register('nome')} placeholder="Ex: Notebook" />
                {errors.nome && (
                  <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quantidade</label>
                <Input type="number" {...register('quantidade')} placeholder="Ex: 10" />
                {errors.quantidade && (
                  <p className="text-red-500 text-sm mt-1">{errors.quantidade.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Data</label>
                <Input type="date" {...register('data')} />
                {errors.data && (
                  <p className="text-red-500 text-sm mt-1">{errors.data.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full text-base">
                Cadastrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FormCreateItem;
