const app = require('./src/app.js');

const iniciarServicio = async () => {
    const server = app.listen(app.get('port'), async function () {
        const { address, port } = server.address();
        const ip = address === '::' ? 'localhost' : address;
        const protocol = 'http';
        const url = `${protocol}://${ip}:${port}`;

        if (app.get('log') === "true") {
            console.log(
                'Servidor corriendo exitosamente:' + '\n' + '\n',
                '::status::',
                JSON.stringify(server.address(), null, -2) + '\n',
                '::url::',
                url + '\n');
        }
    });
}

iniciarServicio();