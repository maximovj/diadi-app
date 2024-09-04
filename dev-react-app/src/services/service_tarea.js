// Modulo para hacer peticiones HTTP/S
import axios from 'axios';

// Modulo para manejar cookies
import Cookies from 'js-cookie';
const token = Cookies.get('session_diadiapp');

// Configurar petición axios
const serviceTarea = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Origin': process.env.REACT_APP_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

// Servicio para crear una tarea
export function serviceTareaCrear(data) {
    return serviceTarea.post('/tarea', data);
}

// Servicio para listar 15 tareas
export function serviceTareaListar() {
    return serviceTarea.get('/tarea/mio');
}

// Servicio para ver una tarea
export function serviceTareaVer(id) {
    return serviceTarea.get(`/tarea/${id}`);
}

// Servicio para actualizar una tarea
export function serviceTareaActualizar(tarea, id) {
    return serviceTarea.put(`/tarea/${id}`, tarea);
}

// Servicio para eliminar una tarea
export function serviceTareaEliminar(id) {
    return serviceTarea.delete(`/tarea/${id}`);
}