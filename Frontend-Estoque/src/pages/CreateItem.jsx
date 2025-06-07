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
        <div className="h-screen flex flex-col justify-center items-center bg-blue-400">
            <a href="/">Voltar</a>
            <h2 className="text-white text-2xl mb-4">Cadastrar Equipamentos</h2>

                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Equipamento"
                        value={equipamento}
                        onChange={(e) => setEquipamento(e.target.value)}
                        className="p-2 border rounded"
                    />

                    <input 
                        type="number"
                        placeholder="Quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="p-2 border rounded"
                    />

                    <input 
                        type="date"
                        placeholder="Data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="p-2 border rounded"
                    />

                    <button className="bg-green-500" type="submit">Cadastrar</button>
                </form>

        </div>
    )
}


export default CreateItem