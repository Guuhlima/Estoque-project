import React, {useEffect, useState} from "react";
import api from '../services/api'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [equipamentos, setEquipamentos] = useState([]);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('auth');
        navigate('/')
    }
    

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await api.get('/visualizar');
                setEquipamentos(response.data)
            } catch (error) {
                console.error('Erro ao buscar informações', error)
                alert('Erro ao buscar informações')
            }
        }

        fetchItem();
    }, [])

    return (
        <div className="w-screen h-screen bg-gray-900 text-gray-100 flex flex-col">
            <nav className="bg-gray-800 py-4 px-8 shadow-md flex justify-between items-center">
                <h1 className="text-xl font-bold">Estoque</h1>
                <div className="space-x-4">
                    <a href="/CreateItem" className="hover:underline text-white">Criar</a>
                    <a href="/DeleteItem" className="hover:underline text-white">Deletar</a>
                    <a href="/GetItemId" className="hover:underline text-white">Consultar</a>
                    <a href="/UpdateItem" className="hover:underline text-white">Editar</a>
                    <a href="#" onClick={handleLogout} className="hover:underline text-red-400">Sair</a>
                </div>
            </nav>

            <main className="flex-grow flex justify-center items-center p-8">
                <div className="bg-white text-gray-800 rounded-lg shadow-lg w-[95%] max-w-6xl p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Lista de Equipamentos</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-2 border-b">ID</th>
                                    <th className="p-2 border-b">Equipamento</th>
                                    <th className="p-2 border-b">Quantidade</th>
                                    <th className="p-2 border-b">Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {equipamentos.map((equipamento) => (
                                    <tr key={equipamento.id} className="hover:bg-gray-100">
                                        <td className="p-2 border-b">{equipamento.id}</td>
                                        <td className="p-2 border-b">{equipamento.equipamento}</td>
                                        <td className="p-2 border-b">{equipamento.quantidade}</td>
                                        <td className="p-2 border-b">{equipamento.data}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home