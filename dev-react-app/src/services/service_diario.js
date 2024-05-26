import axios from "axios";

const serviceDiario = axios.create({
    baseURL: 'http://localhost:3010/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});


//serviceDiario.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const crearDiario = (diario) =>{
    return serviceDiario.post('/diario', diario);
}

export const listarDiario = (usuario_id) => {
    return serviceDiario.get('/diario/mio', { params: {
        usuario_id
    } });
}