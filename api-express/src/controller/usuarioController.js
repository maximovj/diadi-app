const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarioModel.js');
const hash_secret = process.env.HASH_SECRET || '3!yH$xd6nsnXwdG?sqm34C$p%tD#7b';


// @author Víctor J.
// @created 31/08/2024
// @updated 31/08/2024
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries

exports.listarUsuarios = async (req, res) => {
    try {
        const usuario_listar = await Usuario.findAll({ limit: 15 });

        res.status(201).json({
            ctx_contenido: 'Usuario listado exitosamente.',
            success: true,
            data: usuario_listar
        });
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};

exports.verUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const ver_usuario = await Usuario.findOne({ where: { id } });

        if (!ver_usuario) {
            return res.status(404).json({
                ctx_contenido: 'Usuario no encontrado en el sistema.',
                success: false,
                data: null
            });
        }

        return res.status(201).json({
            ctx_contenido: 'Usuario listado exitosamente.',
            success: true,
            data: ver_usuario
        });
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};

exports.crearUsuario = async (req, res) => {
    try {
        const { usuario, correo, contrasena } = req.body;
        const crear_usuario = await Usuario.create({ usuario, correo, contrasena });
        res.status(201).json({
            ctx_contenido: 'Usuario creado exitosamente.',
            success: true,
            data: crear_usuario
        });
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};

exports.modificarUsuario = async (req, res) => {
    try {
        const { usuario, correo, contrasena } = req.body;
        const id = req.params.id;
        const buscar_usuario = await Usuario.findByPk(id);

        if (!buscar_usuario) {
            return res.status(404).json({
                ctx_contenido: 'Usuario no encontrado en el sistema.',
                success: false,
                data: null
            });
        }

        const modificar_usuario = buscar_usuario.update({
            usuario,
            correo,
            contrasena
        });

        return res.status(201).json({
            ctx_contenido: 'Usuario modificado exitosamente.',
            success: true,
            data: modificar_usuario
        });
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
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
    try {
        const id = req.params.id;
        const buscar_usuario = await Usuario.findByPk(id);

        if (!buscar_usuario) {
            return res.status(404).json({
                ctx_contenido: 'Usuario no encontrado en el sistema.',
                success: false,
                data: null
            });
        }

        await buscar_usuario.destroy();
        res.status(201).json(eliminar_usuario);
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};

exports.verificarUsuario = async (req, res) => {
    try {
        const id = req.session_payload.id;
        const correo = req.session_payload.id;
        const buscar_usuario = await Usuario.findByPk(id);

        if (!buscar_usuario) {
            return res.status(404).json({
                ctx_contenido: 'Usuario no encontrado en el sistema.',
                success: false,
                data: null
            });
        }

        if (buscar_usuario?.id !== id || buscar_usuario?.correo !== correo) {
            return res.status(401).json({
                ctx_contenido: 'Usuario no verificado.',
                success: false,
                data: null
            });
        }

        const token = jwt.sign({
            id: buscar_usuario.id,
            correo: buscar_usuario.correo
        },
            hash_secret,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            ctx_contenido: 'Usuario verificado correctamente.',
            success: true,
            data: token
        });
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};