require('dotenv').config();

const database_env = {
    connection: process.env.DB_CONNECTION || 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'diadiapp_db',
}

module.exports = database_env;