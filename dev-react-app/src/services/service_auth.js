// Modulo para hacer peticiones HTTP/S
import axios from 'axios';

// Modulo para manejar cookies
import Cookies from 'js-cookie';
const token = Cookies.get('session_diadiapp');

// Configurar petición axios
const serviceAuth = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Origin': process.env.REACT_APP_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

// Servicio para registrarme en el sistema
export const registrar = (usuario) => {
    return serviceAuth.post('/auth/registrar', usuario);
}

// Servicio para acceder al sistema
export const acceder = (usuario) => {
    return serviceAuth.post('/auth/acceder', usuario);
}