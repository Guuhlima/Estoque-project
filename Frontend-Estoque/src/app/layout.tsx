import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Estoque App',
  description: 'Gerenciamento de Equipamentos',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
