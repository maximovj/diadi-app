require('dotenv').config();
const sequelizeConfig = require('./config/sequelizeConfig.js');
const express = require('express');
const app = express();
const cors = require('cors');

// Permitir todos los cors CORS_ORIGIN_* from .env file
const getAllEnv = Object.keys(process.env);
const getCorsOrigin = getAllEnv.filter(variable => variable.startsWith('CORS_ORIGIN_'));
const cors_origins = getCorsOrigin.map(variable => process.env[variable]);
const allowedOrigins = cors_origins;


// Importar modelos para que las relaciones se definan
const Diario = require('./models/diarioModel.js');
const Usuario = require('./models/usuarioModel.js');
const Tarea = require('./models/tareaModel.js');

// Importar las rutas
const rutas_usuario = require('./routes/usuarioRoutes.js');
const rutas_diario = require('./routes/diarioRoutes.js');
const rutas_tarea = require('./routes/tareaRoutes.js');

app.set('port', process.env.PORT || 3010);

// Middleware para parsear JSON
app.use(express.json());

app.use(cors({
    methods: '*',
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, x-csrf-token, X-CSRF-Token, Content-Length, User-Agent, Referer',
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

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