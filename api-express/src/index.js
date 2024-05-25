require('dotenv').config();
const express = require('express');
const app = express();
app.set('puerto', process.env.APP_PUERTO || 3010);

app.get('/', function (request, response){
    response.send('API de DIADI-APP');
});

app.listen(app.get('puerto'), function(){
    console.log('Servidor ejecutandose', app.get('puerto'));
});