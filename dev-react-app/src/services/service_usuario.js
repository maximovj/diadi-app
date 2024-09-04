import axios from "axios";
import Cookies from 'js-cookie';
const token = Cookies.get('session_diadiapp');

const serviceUsuario = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Origin': process.env.REACT_APP_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

// Servicio para actualizar un usuario
export function serviceUsuarioActualizar(data) {
    return serviceUsuario.put('/usuario/actualizar-contrasena', data);
}

// Servicio para verificar un usuario
export function serviceUsuarioVerificar() {
    return serviceUsuario.post('/usuario/verificar');
}

// Servicio para eliminar un usuario 
export function servicioUsuarioEliminar() {
    return serviceUsuario.delete('usuario/eliminar');
}