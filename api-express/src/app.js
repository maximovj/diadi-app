require('dotenv').config();
const sequelizeConfig = require('./config/sequelizeConfig.js');
const corsConfig = require('./config/corsConfig.js');
const jwtConfig = require('./config/jwtConfig.js');
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
const rutas_auth = require('./routes/authRoutes.js');

// Se define variables de entorno
app.set('port', process.env.PORT || 3010);
app.set('log', process.env.LOG || true);

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Se configura CORS
app.use(corsConfig);

// Usar las rutas
app.use('/api/v1', rutas_auth);
app.use('/api/v1', jwtConfig, rutas_usuario);
app.use('/api/v1', jwtConfig, rutas_diario);
app.use('/api/v1', jwtConfig, rutas_tarea);

sequelizeConfig.sync({ alter: false, force: false });

module.exports = app;