require('dotenv').config();
const cors = require('cors');

// Permitir todos los cors CORS_ORIGIN_* from .env file
const getAllEnv = Object.keys(process.env);
const getCorsOrigin = getAllEnv.filter(variable => variable.startsWith('CORS_ORIGIN_'));
const cors_origins = getCorsOrigin.map(variable => process.env[variable]);
const allowedOrigins = cors_origins;

const corsConfig = cors({
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
});

module.exports = corsConfig;