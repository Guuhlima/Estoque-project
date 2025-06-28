'use client';

import React, { useEffect, useState } from 'react';
import withAuth from '../components/withAuth';
import api from '@/services/api';
import NavBar from '../components/NavBar';
import TableEquipamentos from '../components/TableEquipamentos';

const Home = () => {
  const [equipamentos, setEquipamentos] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await api.get('/visualizar');
      setEquipamentos(response.data);
    };
    fetchItem();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar onLogout={handleLogout} />
      <main className="p-6">
        <TableEquipamentos data={equipamentos} />
      </main>
    </div>
  );
};

export default withAuth(Home);
