const express = require('express');
const router = express.Router();
const diarioController = require('../controller/_diarioController');

// Esta ruta es para listar todos los diarios registrados
router.get('/diario/mio', diarioController.listarDiario);

// Esta ruta es para ver los datos de un diario registrado
router.get('/diario/:id', diarioController.verDiario);

// Esta ruta es para crear o registrar un nuevo diario
router.post('/diario', diarioController.crearDiario);

// Esta ruta es para editar o modificar un diario registrado
router.put('/diario/:id', diarioController.modificarDiario);

// Esta ruta es para eliminar un diario registrado
router.delete('/diario/:id', diarioController.eliminarDiario);

module.exports = router;


