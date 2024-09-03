import axios from "axios";
import Cookies from 'js-cookie';
const token = Cookies.get('session_diadiapp');

const serviceDiario = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Origin': process.env.REACT_APP_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

export const crearDiario = (diario) => {
    return serviceDiario.post('/diario', diario);
}

export const listarDiario = () => {
    return serviceDiario.get('/diario/mio');
}

export const serviceDiarioVer = (id) => {
    return serviceDiario.get(`/diario/${id}`);
}

export const serviceDiarioActualizar = (diario, id) => {
    return serviceDiario.put(`/diario/${id}`, diario);
}

export const serviceDiarioEliminar = (id) => {
    return serviceDiario.delete(`/diario/${id}`);
}