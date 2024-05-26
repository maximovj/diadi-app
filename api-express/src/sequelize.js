require('dotenv').config();
const { Sequelize } = require('sequelize');

const database_env = {
    connection: process.env.DB_CONNECTION || 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'diadiapp_db',
}

const sequelize = new Sequelize({
    host: database_env.host,
    port: database_env.port,
    username: database_env.username,
    password: database_env.password,
    database: database_env.database,
    dialect: database_env.connection,
});

delete database_env.password;
delete database_env.username;
delete database_env.port;
delete database_env.database;

module.exports = {database_env,  sequelize};