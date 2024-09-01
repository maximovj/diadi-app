require('dotenv').config();
const Usuario = require('../models/usuarioModel.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hash_secret = process.env.HASH_SECRET || '3!yH$xd6nsnXwdG?sqm34C$p%tD#7b';
const dominio = process.env.DOMINIO || 'local.host';

function fncGenerarCorreo(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.';
    const randomString = Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    return `${Date.now()}.${randomString}`;
}

exports.registrar = async (req, res) => {
    const { usuario, contrasena } = req.body;
    const crypt_contrasena = await bcryptjs.hash(contrasena, 10);
    const correo_generado = `${fncGenerarCorreo(7)}@${dominio}`;
    Usuario.create({ usuario, correo: correo_generado, contrasena: crypt_contrasena })
        .then(() => res.status(201).json({ ctx_contenido: 'Usuario registrado', success: true, }))
        .catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ ctx_contenido: 'El usuario ya esta registrado', success: false, });
            } else {
                return res.status(500).json({ ctx_contenido: err.message, success: false, });
            }
        });
};

exports.acceder = (req, res) => {
    const { usuario, contrasena } = req.body;
    Usuario.findOne({ where: { usuario: usuario } })
        .then((data) => {
            if (!data?.contrasena) {
                return res.status(401).json({ ctx_contenido: 'Usuario no registrado.', success: false, data: null });
            }

            bcryptjs.compare(contrasena, data.contrasena)
                .then((isIgual) => {
                    if (isIgual) {
                        const token = jwt.sign({ id: data.id, correo: data.correo }, hash_secret, { expiresIn: '1h' });
                        return res.status(200).json({
                            ctx_contenido: 'Usuario inicio sesión correctamente.',
                            success: true,
                            data: token
                        });
                    } else {
                        return res.status(401).json({ ctx_contenido: 'Credenciales incorrectas.', success: false, data: null });
                    }
                })
                .catch((err) => res.status(500).json({ ctx_contenido: err.message, success: false, data: null }));
        })
        .catch((err) => {
            return res.status(500).json({ ctx_contenido: err.message, success: false, data: null });
        });
};