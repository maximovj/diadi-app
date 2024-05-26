const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Esta ruta es para crear o registrar un nuevo usuario
router.post('/usuario', async (req, res) => {
    const { usuario, correo, contrasena } = req.body;
    try{
        const registrar_usuario = await Usuario.create({ usuario, correo, contrasena });
        res.status(201).json(registrar_usuario);
    }catch(err){
        res.status(404).json({ error: err.message });
    }
});

// Esta ruta es para editar o modificar un usuario registrado
router.put('/usuario/:id', async (req, res) => {
    const {id} = req.params;
    const { usuario, correo, contrasena } = req.body;
    try{
        const modificar_usuario = await Usuario.update({ usuario, correo, contrasena }, { where: { id } });
        res.status(201).json(modificar_usuario);
    }catch(err){
        res.status(404).json({ error: err.errors[0] });
    }
});

module.exports = router;