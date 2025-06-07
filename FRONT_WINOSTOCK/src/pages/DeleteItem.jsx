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
        <div>
            <form onSubmit={handleDelete}>
                <input 
                    type='text'
                    placeholder='ID'
                    value={idItem}
                    onChange={(e) => setIdItem(e.target.value)}
                />

                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}

export default DeleteItem