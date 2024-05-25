require('dotenv').config();
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3010);

app.get('/', function (request, response){
    response.send('API de DIADI-APP');
});

app.listen(app.get('port'), function(){
    console.log('Servidor ejecutandose', app.get('port'));
});