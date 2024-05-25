require('dotenv').config();
const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const db_env = require('./database');
app.set('port', process.env.PORT || 3010);

const sequelize = new Sequelize({
    database: db_env.database,
    username: db_env.username,
    password: db_env.password,
    port: db_env.port,
    host: db_env.host,
    dialect: db_env.connection,
});

app.get('/', function (request, response) {
    response.send('API de DIADI-APP');
});

const server = app.listen(app.get('port'), async function () {
    const { address, port } = server.address();
    const ip = address === '::' ? 'localhost' : address;
    const protocol = 'http';
    const url = `${protocol}://${ip}:${port}`;

    try {
        await sequelize.authenticate();
        console.log(
            'Servidor corriendo exitosamente:' + '\n',
            '::db_info::',
            JSON.stringify(db_env, null, -2) + '\n',
            '::status::',
            JSON.stringify(server.address(), null, -2) + '\n',
            '::url::',
            url + '\n');
    } catch (err) {
        console.log(
            'Error en la conexión a la base de datos:' + '\n',
            '::db_info::' + '\n',
            JSON.stringify(db_env, null, 2) + '\n',
            '::error::' + '\n',
            err + '\n');
    } finally {
        sequelize.close();
    }
});