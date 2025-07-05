'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Warehouse,
  Plus,
  Trash2,
  Search,
  Pencil,
  Repeat,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface SidebarProps {
  onLogout: (e: React.MouseEvent) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navLinks = [
  { href: '/create', label: 'Criar', icon: <Plus className="w-4 h-4" /> },
  { href: '/delete', label: 'Deletar', icon: <Trash2 className="w-4 h-4" /> },
  { href: '/get', label: 'Consultar', icon: <Search className="w-4 h-4" /> },
  { href: '/update', label: 'Editar', icon: <Pencil className="w-4 h-4" /> },
  { href: '/transfer', label: 'Transferência', icon: <Repeat className="w-4 h-4" /> },
];

const Sidebar = ({ onLogout, collapsed, onToggle }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen ${
        collapsed ? 'w-16' : 'w-60'
      } transition-all duration-300 fixed left-0 top-0 z-50
        border-r border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white`}
    >
      <div className="flex items-center justify-between px-4 py-5 text-xl font-bold border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/home" className="flex items-center gap-2 hover:opacity-80 transition">
          <Warehouse className="w-6 h-6 text-blue-500" />
          {!collapsed && <span>Estoque</span>}
        </Link>
        <button
          onClick={onToggle}
          className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          {collapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${
              pathname === link.href
                ? 'bg-blue-100 dark:bg-zinc-800 text-blue-500'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {link.icon}
            {!collapsed && link.label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
        <DarkModeToggle />
        <button
          onClick={onLogout}
          className={`flex items-center gap-2 text-sm text-red-500 hover:text-red-600 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && 'Sair'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
