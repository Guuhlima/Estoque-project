import React, { useState } from "react";
import api from '../services/api.js'
import { useNavigate } from "react-router-dom";

const CreateItem = () => {
    const [equipamento, setEquipamento] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [data, setData] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/cadastro', {equipamento, quantidade, data})
            alert('Equipamento cadastro com sucesso')
        } catch (error) {
            console.error('Erro ao realizar cadastro', error)
            alert('Erro ao criar item')
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-md">
                <a
                    href="/Home"
                    className="text-blue-500 hover:underline text-sm mb-4 inline-block"
                >
                    ← Voltar
                </a>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Cadastrar Equipamento
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Equipamento"
                        value={equipamento}
                        onChange={(e) => setEquipamento(e.target.value)}
                        className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="number"
                        placeholder="Quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="date"
                        placeholder="Data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}


export default CreateItem