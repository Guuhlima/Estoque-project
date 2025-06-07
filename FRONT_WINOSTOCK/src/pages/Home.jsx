import React, {useEffect, useState} from "react";
import api from '../services/api'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [equipamentos, setEquipamentos] = useState([]);

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
        <div className="flex justify-center">
            <ul>
                {equipamentos.map(equipamento => (
                    <li key={equipamento.id}>{equipamento.equipamento} - {equipamento.quantidade}</li>
                ))}
            </ul>
            <a href="/CreateItem">Criar Equipamento</a>
            <a href="/DeleteItem">Deletar Item</a>
            <a href="/GetItemId">Consultar Item</a>
        </div>
    )
}

export default Home