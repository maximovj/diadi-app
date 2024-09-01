import axios from "axios";
import Cookies from 'js-cookie';
const token = Cookies.get('session_diadiapp');

const serviceDiario = axios.create({
    baseURL: 'http://localhost:3010/api/v1',
    headers: {
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});


//serviceDiario.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const crearDiario = (diario) => {
    return serviceDiario.post('/diario', diario);
}

export const listarDiario = (usuario_id) => {
    return serviceDiario.get('/diario/mio', {
        params: {
            usuario_id
        }
    });
}