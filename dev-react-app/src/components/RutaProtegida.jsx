// Componentes y Hooks de ReactJS
import { Navigate } from 'react-router-dom';

// Modulo para manejar cookies
import Cookies from 'js-cookie';

// Componente funcional
export function RutaProtegida({ children }) {
    const isAuthenticated = Boolean(Cookies.get('session_diadiapp'));

    return isAuthenticated ? children : <Navigate to='/acceder' />
};