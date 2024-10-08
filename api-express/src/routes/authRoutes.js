const express = require('express');
const router = express.Router();
const { registrar, acceder } = require('../controller/authController.js');

// Ruta para registrar un nuevo usuario
router.post('/auth/registrar', registrar);

// Ruta para acceder al sistema con un usuario
router.post('/auth/acceder', acceder);

module.exports = router;
