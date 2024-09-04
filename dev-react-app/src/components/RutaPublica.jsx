// Componentes y Hooks de ReactJS
import { Navigate } from 'react-router-dom';

// Modulo para manejar cookies
import Cookies from 'js-cookie';

// Componente funcional
export function RutaPublica({ children }) {
    const isAuthenticated = Boolean(Cookies.get('session_diadiapp'));

    return isAuthenticated ? <Navigate to="/panel" /> : children;
}