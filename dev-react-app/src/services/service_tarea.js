import axios from "axios";
import Cookies from 'js-cookie';
const token = Cookies.get('session_diadiapp');

const serviceTarea = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Origin': process.env.REACT_APP_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

export function serviceTareaCrear(data) {
    return serviceTarea.post('/tarea', data);
}

export function serviceTareaListar() {
    return serviceTarea.get('/tarea/mio');
}

export function serviceTareaVer(id) {
    return serviceTarea.get(`/tarea/${id}`);
}

export function serviceTareaActualizar(tarea, id) {
    return serviceTarea.put(`/tarea/${id}`, tarea);
}

export function serviceTareaEliminar(id) {
    return serviceTarea.delete(`/tarea/${id}`);
}