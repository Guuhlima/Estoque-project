'use client';

import { useState } from 'react';
import TransferForm from './create/TransferForm';
import CreateEstoqueForm from './create-estoque/CreateEstoqueForm';

export default function TransferDashboardPage() {
  const [view, setView] = useState<'inicio' | 'criarEstoque' | 'listarEstoques' | 'novaTransferencia'>('inicio');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Painel de Transferência</h1>

      {view === 'inicio' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setView('criarEstoque')}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg shadow"
          >
            Criar Estoque
          </button>

          <button
            onClick={() => setView('listarEstoques')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg shadow"
          >
            Estoques Existentes
          </button>

          <button
            onClick={() => setView('novaTransferencia')}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg shadow"
          >
            Novas Transferências
          </button>
        </div>
      )}

      {view === 'criarEstoque' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Cadastro de Novo Estoque</h2>
          <CreateEstoqueForm />
        </div>
      )}

      {view === 'listarEstoques' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Estoques Existentes</h2>
          <p className="text-gray-600">[Listagem de estoques ainda não implementada]</p>
        </div>
      )}

      {view === 'novaTransferencia' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Nova Transferência</h2>
          <TransferForm />
        </div>
      )}

      {view !== 'inicio' && (
        <button
          onClick={() => setView('inicio')}
          className="mt-8 block text-sm text-blue-500 hover:underline"
        >
          ⬅ Voltar ao menu
        </button>
      )}
    </div>
  );
}
