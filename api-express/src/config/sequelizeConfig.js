require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configurar conexión a la base de datos 
// Obtiene variables de entorno del archivo .env
const database = new Sequelize({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'diadiapp_db',
    dialect: process.env.DB_CONNECTION || 'mysql',
    logging: false,
});

// Verifica conexión
database.authenticate()
    .then(() => console.log('Base de datos conectado exitosamente.'))
    .catch((err) => console.log('Hubo un error en la conexión a la base de datos', err));

module.exports = database;