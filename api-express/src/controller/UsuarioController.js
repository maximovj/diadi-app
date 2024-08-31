const usuario = require('../models/Usuario.js');

exports.listarUsuarios = async (req, res) => {
    try {
        const usuario_listar = await Usuario.findAll({ limit: 15 });
        res.status(201).json(usuario_listar);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};

exports.verUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario_ver = await Usuario.findOne({ where: { id } });
        res.status(201).json(usuario_ver);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};

exports.crearUsuario = async (req, res) => {
    const { usuario, correo, contrasena } = req.body;
    try {
        const registrar_usuario = await Usuario.create({ usuario, correo, contrasena });
        res.status(201).json(registrar_usuario);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};

exports.modificarUsuario = async (req, res) => {
    const { id } = req.params;
    const { usuario, correo, contrasena } = req.body;
    try {
        const modificar_usuario = await Usuario.update({ usuario, correo, contrasena }, { where: { id } });
        res.status(201).json(modificar_usuario);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};

exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminar_usuario = await Usuario.destroy({ where: { id } });
        res.status(201).json(eliminar_usuario);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};