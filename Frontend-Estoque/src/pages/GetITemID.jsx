import React, {useState} from 'react'
import api from '../services/api'

const GetItemId = () => {
    const [idItem, setIdItem] = useState('')
    const [equipamento, setEquipamento] = useState(null);

    const handleGet = async (e) => {
        e.preventDefault();

        try {
            const response = await api.get(`/visualizar/${idItem}`);
            setEquipamento(response.data);
        } catch (error) {
            console.error('Erro ao consultar informações', error)
            alert('Erro ao buscar item');
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-md">
                <a href='/Home'>Voltar</a>
                <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Consultar Equipamento</h1>

                <form onSubmit={handleGet} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Digite o ID do item"
                        value={idItem}
                        onChange={(e) => setIdItem(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-medium"
                    >
                        Consultar
                    </button>
                </form>

                {equipamento && (
                    <ul className="mt-6 bg-white rounded p-4 shadow">
                        <li className="text-gray-700">
                            <strong>Equipamento:</strong> {equipamento.equipamento}<br />
                            <strong>Quantidade:</strong> {equipamento.quantidade}<br />
                            <strong>Data:</strong> {equipamento.data}
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );

}

export default GetItemId