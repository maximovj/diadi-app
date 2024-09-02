const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarioModel.js');

// @author Víctor J.
// @created 31/08/2024
// @updated 31/08/2024
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries

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
        res.status(404).json({ error: err.message });
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

exports.actualizarContrasenaUsuario = async (req, res) => {
    const { id } = req.session_payload;
    const { contrasena_actual, contrasena_nueva, repetir_contrasena_nueva } = req.body;

    // Verificar si las nuevas contraseñas coinciden
    if (contrasena_nueva !== repetir_contrasena_nueva) {
        return res.status(400).json({
            ctx_contenido: 'La contraseña nueva no coincide con la confirmación.',
            success: false,
            data: null
        });
    }

    try {
        // Buscar al usuario por ID
        const buscar_usuario = await Usuario.findByPk(id);

        if (!buscar_usuario) {
            return res.status(404).json({
                ctx_contenido: 'Usuario no encontrado.',
                success: false,
                data: null
            });
        }

        // Verificar si la contraseña actual es correcta
        const isIgual = await bcryptjs.compare(contrasena_actual, buscar_usuario.contrasena);

        if (!isIgual) {
            return res.status(401).json({
                ctx_contenido: 'La contraseña actual es incorrecta.',
                success: false,
                data: null
            });
        }

        // Encriptar la nueva contraseña
        const encrypt_contrasena = await bcryptjs.hash(contrasena_nueva, 10);

        // Actualizar la contraseña en la base de datos
        await Usuario.update({ contrasena: encrypt_contrasena }, { where: { id } });

        res.status(201).json({
            ctx_contenido: 'Contraseña actualizada exitosamente.',
            success: true,
            data: null
        });
    } catch (err) {
        res.status(500).json({
            ctx_contenido: 'Error al actualizar la contraseña.',
            success: false,
            error: err.message
        });
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