require('dotenv').config();
const cors = require('cors');

// Permitir todos los cors CORS_ORIGIN_* del archivo .env
const getAllEnv = Object.keys(process.env);
const getCorsOrigin = getAllEnv.filter(variable => variable.startsWith('CORS_ORIGIN_'));
const cors_origins = getCorsOrigin.map(variable => process.env[variable]);
const allowedOrigins = cors_origins;

// Configuración para CORS
const corsConfig = cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'User-Agent', 'User-Agent', 'Content-Length'],
    origin: function (origin, callback) {
        const allowOrigin = origin || '';
        if (allowedOrigins.indexOf(allowOrigin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
});

module.exports = corsConfig;