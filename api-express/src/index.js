require('dotenv').config();
const { database_env, sequelize } = require('./sequelize');
const express = require('express');
const app = express();
const Diario = require('./models/Diario');
const Usuario = require('./models/Usuario');
const rutas_usuario = require('./routes/usuario');

app.set('port', process.env.PORT || 3010);

// Middleware
app.use(express.json());
app.use('/api/v1', rutas_usuario);

const iniciarServicio = async () => {
    try {
        await sequelize.authenticate();
        // force: true para borrar y crear de nuevo las tablas
        await sequelize.sync({ force: false });

        const server = app.listen(app.get('port'), async function () {
            const { address, port } = server.address();
            const ip = address === '::' ? 'localhost' : address;
            const protocol = 'http';
            const url = `${protocol}://${ip}:${port}`;
            console.log(
                'Servidor corriendo exitosamente:' + '\n',
                '::db_info::',
                JSON.stringify(database_env, null, -2) + '\n',
                '::status::',
                JSON.stringify(server.address(), null, -2) + '\n',
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