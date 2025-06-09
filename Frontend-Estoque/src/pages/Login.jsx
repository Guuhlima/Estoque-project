import React, {useState} from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            await api.post('/user/login', {email,senha});
            localStorage.setItem('auth', 'true')
            navigate('/Home');
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            alert('Erro ao realizar login')
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );

}

export default Login