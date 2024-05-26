const express = require('express');
const router  = express.Router();
const diarioController = require('../controller/DiarioController');

router.post('/diario', diarioController.crearDiario);

router.put('/diario/:id', diarioController.modificarDiario);

module.exports = router;


