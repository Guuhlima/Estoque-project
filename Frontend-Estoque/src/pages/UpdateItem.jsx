import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const UpdateItem = () => {
    const [idItem, setIdItem] = useState('')
    const [equipamento, setEquipamento] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [data, setData] = useState('');

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
        <div>
            <form onSubmit={handleUpdate}>
                <input 
                    type='text'
                    placeholder='ID do item'
                    value={idItem}
                    onChange={(e) => setIdItem(e.target.value)}
                />

                <input 
                    type='text'
                    placeholder='Equipamento'
                    value={equipamento}
                    onChange={(e) => setEquipamento(e.target.value)}
                />

                <input 
                    type='text'
                    placeholder='Quantidade'
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                />

                <input 
                    type='date'
                    placeholder='Data'
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />

                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}

export default UpdateItem