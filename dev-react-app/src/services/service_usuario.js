import axios from 'axios';

const serviceUsuario = axios.create({
    baseURL : 'http://localhost:3010/api/v1', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

/**
 * @param { correo, usuario, contrasena } usuario 
 */
export const crearUsuario = (usuario) => {
    serviceUsuario.post('/usuario', usuario);
}