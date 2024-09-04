// Modulo para hacer peticiones HTTP/S
import axios from 'axios';

// Modulo para manejar cookies
import Cookies from 'js-cookie';
const token = Cookies.get('session_diadiapp');

// Configurar petición axios
const serviceDiario = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Origin': process.env.REACT_APP_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

// Servicio para crear un diario
export const serviceDiarioCrear = (diario) => {
    return serviceDiario.post('/diario', diario);
}

// Servicio para listar 15 diarios
export const serviceDiarioListar = () => {
    return serviceDiario.get('/diario/mio');
}

// Servicio para ver un diario
export const serviceDiarioVer = (id) => {
    return serviceDiario.get(`/diario/${id}`);
}

// Servicio para actualizar un diario
export const serviceDiarioActualizar = (diario, id) => {
    return serviceDiario.put(`/diario/${id}`, diario);
}

// Servicio para eliminar un diario
export const serviceDiarioEliminar = (id) => {
    return serviceDiario.delete(`/diario/${id}`);
}