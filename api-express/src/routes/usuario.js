const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/usuario', async (req, res) => {
    const { usuario, correo, contrasena } = req.body;
    try{
        const registrar_usuario = await Usuario.create({ usuario, correo, contrasena });
        res.status(201).json(registrar_usuario);
    }catch(err){
        res.status(404).json({ error: err.message });
    }
});

module.exports = router;