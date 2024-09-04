import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export function RutaProtegida({ children }) {
    const isAuthenticated = Boolean(Cookies.get('session_diadiapp'));

    return isAuthenticated ? children : <Navigate to='/acceder' />
}