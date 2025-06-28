'use client';

import React from 'react';
import Link from 'next/link';

interface NavBarProps {
  onLogout: (e: React.MouseEvent) => void;
}

const NavBar = ({ onLogout }: NavBarProps) => {
  return (
    <nav className="bg-gray-800 py-4 px-8 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Estoque</h1>
      <div className="space-x-4">
        <Link href="/create" className="hover:underline text-white">Criar</Link>
        <Link href="/delete" className="hover:underline text-white">Deletar</Link>
        <Link href="/get" className="hover:underline text-white">Consultar</Link>
        <Link href="/update" className="hover:underline text-white">Editar</Link>
        <a href="#" onClick={onLogout} className="hover:underline text-red-400">Sair</a>
      </div>
    </nav>
  );
};

export default NavBar;
