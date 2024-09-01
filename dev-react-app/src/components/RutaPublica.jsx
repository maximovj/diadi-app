import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export function RutaPublica({ children }) {
    const isAuthenticated = Boolean(Cookies.get('session_diadiapp'));

    return isAuthenticated ? <Navigate to="/panel" /> : children;
}