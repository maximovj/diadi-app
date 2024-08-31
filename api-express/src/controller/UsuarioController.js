const usuario = require('../models/usuarioModel.js');

// @author Víctor J.
// @created 31/08/2024
// @updated 31/08/2024
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries

exports.listarUsuarios = async (req, res) => {
    try {
        const usuario_listar = await usuario.findAll({ limit: 15 });
        res.status(201).json(usuario_listar);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};

exports.verUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario_ver = await usuario.findOne({ where: { id } });
        res.status(201).json(usuario_ver);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};

exports.crearUsuario = async (req, res) => {
    const { usuario, correo, contrasena } = req.body;
    try {
        const registrar_usuario = await usuario.create({ usuario, correo, contrasena });
        res.status(201).json(registrar_usuario);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};

exports.modificarUsuario = async (req, res) => {
    const { id } = req.params;
    const { usuario, correo, contrasena } = req.body;
    try {
        const modificar_usuario = await usuario.update({ usuario, correo, contrasena }, { where: { id } });
        res.status(201).json(modificar_usuario);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};

exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminar_usuario = await usuario.destroy({ where: { id } });
        res.status(201).json(eliminar_usuario);
    } catch (err) {
        res.status(404).json({ error: err.errors[0] });
    }
};