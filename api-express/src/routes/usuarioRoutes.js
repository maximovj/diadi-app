const express = require('express');
const router = express.Router();
const {
    crearUsuario,
    eliminarUsuario,
    listarUsuarios,
    modificarUsuario,
    actualizarContrasenaUsuario,
    verUsuario } = require('../controller/usuarioController.js');

// Esta ruta es para validar un usuario autenticado
router.post('/usuario/verificar',);

// Esta ruta es para listar todos los usuarios registrados
router.get('/usuario', listarUsuarios);

// Esta ruta es para ver los datos de un usuario registrado
router.get('/usuario/:id', verUsuario);

// Esta ruta es para crear o registrar un nuevo usuario
router.post('/usuario', crearUsuario);

// Esta ruta es para editar o modificar un usuario registrado
router.put('/usuario/actualizar-contrasena', actualizarContrasenaUsuario);

// Esta ruta es para editar o modificar un usuario registrado
router.put('/usuario/:id', modificarUsuario);

// Esta ruta es para eliminar un usuario registrado
router.delete('/usuario/:id', eliminarUsuario);

module.exports = router;