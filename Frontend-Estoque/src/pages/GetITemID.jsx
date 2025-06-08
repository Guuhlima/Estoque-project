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
        <div>
            <form onSubmit={handleGet}>
                <input
                    type='text'
                    placeholder='ID'
                    value={idItem}
                    onChange={(e) => setIdItem(e.target.value)}
                />

                <button type='submit'>Enviar</button>
            </form>
            {equipamento && (
                <ul>
                    <li>
                        {equipamento.equipamento} - {equipamento.quantidade} - {equipamento.data}
                    </li>
                </ul>
            )}
        </div>
    )
}

export default GetItemId