const express = require('express');

const app = express();

app.get('/', function (request, response){
    response.send('API de DIADI-APP');
});

app.listen(3000, function(){
    console.log('Servidor ejecutandose');
});