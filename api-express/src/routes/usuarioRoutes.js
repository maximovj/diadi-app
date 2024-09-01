const express = require('express');
const router = express.Router();
const {
    crearUsuario,
    eliminarUsuario,
    listarUsuarios,
    modificarUsuario,
    verUsuario } = require('../controller/usuarioController.js');

// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries

// Esta ruta es para listar todos los usuarios registrados
router.get('/usuario', listarUsuarios);

// Esta ruta es para ver los datos de un usuario registrado
router.get('/usuario/:id', verUsuario);

// Esta ruta es para crear o registrar un nuevo usuario
router.post('/usuario', crearUsuario);

// Esta ruta es para editar o modificar un usuario registrado
router.put('/usuario/:id', modificarUsuario);

// Esta ruta es para eliminar un usuario registrado
router.delete('/usuario/:id', eliminarUsuario);

module.exports = router;