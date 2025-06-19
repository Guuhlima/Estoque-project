import React, {useState, useEffect} from 'react'
import api from '../services/api'

const DeleteItem = () => {
    const[idItem, setIdItem] = useState('')

    const handleDelete = async (e) => {
        try {
            const response = api.delete(`/deletar/${idItem}`)
            setIdItem(response.data);
            alert('Sucesso ao deletar informação')
        } catch (error) {
            console.error('Erro ao deletar informação', error)
            alert('Erro ao deletar item');
        }
    }
    
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-md">
                <a href='/Home'>Voltar</a>
                <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Deletar Equipamento</h1>

                <form onSubmit={handleDelete} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Digite o ID do item"
                        value={idItem}
                        onChange={(e) => setIdItem(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-medium"
                    >
                        Deletar
                    </button>
                </form>
            </div>
        </div>
    );

}

export default DeleteItem