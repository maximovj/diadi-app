const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries
// Esta ruta es para listar todos los usuarios registrados
router.get('/usuario', async (req, res) => {
    try{
        const usuario_listar = await Usuario.findAll({limit: 15});
        res.status(201).json(usuario_listar);
    }catch(err){
        res.status(404).json({ error: err.errors[0] });
    }
});

// Esta ruta es para ver los datos de un usuario registrado
router.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const usuario_ver = await Usuario.findOne({where: { id }});
        res.status(201).json(usuario_ver);
    }catch(err){
        res.status(404).json({ error: err.errors[0] });
    }
});

// Esta ruta es para crear o registrar un nuevo usuario
router.post('/usuario', async (req, res) => {
    const { usuario, correo, contrasena } = req.body;
    try{
        const registrar_usuario = await Usuario.create({ usuario, correo, contrasena });
        res.status(201).json(registrar_usuario);
    }catch(err){
        res.status(404).json({ error: err.message[0] });
    }
});

// Esta ruta es para editar o modificar un usuario registrado
router.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { usuario, correo, contrasena } = req.body;
    try{
        const modificar_usuario = await Usuario.update({ usuario, correo, contrasena }, { where: { id } });
        res.status(201).json(modificar_usuario);
    }catch(err){
        res.status(404).json({ error: err.errors[0] });
    }
});

// Esta ruta es para eliminar un usuario registrado
router.delete('/usuario/:id',  async (req, res) => {
    const { id } = req.params;
    try{
        const eliminar_usuario = await Usuario.destroy({ where: { id } });
        res.status(201).json(eliminar_usuario);
    }catch(err){
        res.status(404).json({ error: err.errors[0] });
    }
});

module.exports = router;