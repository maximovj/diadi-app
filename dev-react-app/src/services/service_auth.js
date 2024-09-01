import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('session_diadiapp');

const serviceUsuario = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Origin': process.env.REACT_APP_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': window.location.href,
        'Authorization': `Bearer ${token}`
    }
});


// Servicio para registrarme en el sistema
export const registrar = (usuario) => {
    return serviceUsuario.post('/auth/registrar', usuario);
}

// Servicio para acceder al sistema
export const acceder = (usuario) => {
    return serviceUsuario.post('/auth/acceder', usuario);
}