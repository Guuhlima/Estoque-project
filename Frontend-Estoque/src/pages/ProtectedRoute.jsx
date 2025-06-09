import { Children } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('auth') == 'true'

    return isAuthenticated ? children : <Navigate to="/"/>
    
}

export default ProtectedRoute