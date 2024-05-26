const express = require('express');
const router  = express.Router();
const diarioController = require('../controller/DiarioController');

router.get('/diario/:id', diarioController.verDiario);

router.post('/diario', diarioController.crearDiario);

router.put('/diario/:id', diarioController.modificarDiario);

router.delete('/diario/:id', diarioController.eliminarDiario);

module.exports = router;


