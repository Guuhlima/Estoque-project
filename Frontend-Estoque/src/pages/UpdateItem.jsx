import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const UpdateItem = () => {
    const [idItem, setIdItem] = useState('')
    const [equipamento, setEquipamento] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [data, setData] = useState('');

    const buscaritemPorId = async () => {
        try {
            const response = await api.get(`/visualizar/${idItem}`);
            const item = response.data
            setEquipamento(item.equipamento)
            setQuantidade(item.quantidade)
            setData(item.data)
        } catch (error) {
            console.error('Erro ao buscar informações do item:', error)
            alert('Erro ao buscar item')
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try{
            const response = await api.put(`/editar/${idItem}`, {
                equipamento,
                quantidade,
                data
            })
            setEquipamento(response.data)
            alert('Item atualizado com sucesso!')
        } catch (error) {
            console.error('Erro ao atualizar informações', error)
            alert('Erro ao atualizar informações')
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
                    Atualizar Equipamento
                </h2>

                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="ID do item"
                        value={idItem}
                        onChange={(e) => setIdItem(e.target.value)}
                        onBlur={buscaritemPorId}
                        className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        placeholder="Equipamento"
                        value={equipamento || ""}
                        onChange={(e) => setEquipamento(e.target.value)}
                        className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        placeholder="Quantidade"
                        value={quantidade || ""}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="date"
                        placeholder="Data"
                        value={data ? data.slice(0, 10) : ""}
                        onChange={(e) => setData(e.target.value)}
                        className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
                    >
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    );

}

export default UpdateItem