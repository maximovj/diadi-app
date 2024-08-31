require('dotenv').config();
const sequelizeConfig = require('./config/sequelizeConfig.js');
const corsConfig = require('./config/corsConfig.js');
const express = require('express');
const app = express();

// Importar modelos para que las relaciones se definan
require('./models/diarioModel.js');
require('./models/usuarioModel.js');
require('./models/tareaModel.js');

// Importar las rutas
const rutas_usuario = require('./routes/usuarioRoutes.js');
const rutas_diario = require('./routes/diarioRoutes.js');
const rutas_tarea = require('./routes/tareaRoutes.js');

// Se define variables de entorno
app.set('port', process.env.PORT || 3010);

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsConfig);

// Usar las rutas
app.use('/api/v1', rutas_usuario);
app.use('/api/v1', rutas_diario);
app.use('/api/v1', rutas_tarea);

sequelizeConfig.sync({ alter: false, force: false });

const iniciarServicio = async () => {
    try {
        const server = app.listen(app.get('port'), async function () {
            const { address, port } = server.address();
            const ip = address === '::' ? 'localhost' : address;
            const protocol = 'http';
            const url = `${protocol}://${ip}:${port}`;
            console.log(
                'Servidor corriendo exitosamente:' + '\n',
                '::status::',
                JSON.stringify(server.address(), null, -2) + '\n',
                '::cors::',
                JSON.stringify(allowedOrigins, null, -2) + '\n',
                '::url::',
                url + '\n');
        });

    } catch (err) {
        console.log(
            'Error en la conexión a la base de datos:' + '\n',
            '::db_info::' + '\n',
            JSON.stringify(database_env, null, 2) + '\n',
            '::error::' + '\n',
            err + '\n');
    }
}

iniciarServicio();