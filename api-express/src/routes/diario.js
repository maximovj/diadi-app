const express = require('express');
const router  = express.Router();
const diarioController = require('../controller/DiarioController');

router.post('/diario', diarioController.crearDiario);

module.exports = router;


