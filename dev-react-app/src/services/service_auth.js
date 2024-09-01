import axios from 'axios';

const serviceUsuario = axios.create({
    baseURL: 'http://localhost:3010/api/v1',
    headers: {
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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