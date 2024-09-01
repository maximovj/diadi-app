require('dotenv').config();
const Usuario = require('../models/usuarioModel.js');
const jwt = require('jsonwebtoken');
const hash_secret = process.env.HASH_SECRET || '3!yH$xd6nsnXwdG?sqm34C$p%tD#7b';

exports.registrar = (req, res) => {
    const { usuario, correo, contrasena } = req.body;
    Usuario.create({ usuario, correo, contrasena })
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
            if (data && data.contrasena === contrasena) {
                const token = jwt.sign({ id: data.id, correo: data.correo }, hash_secret, { expiresIn: '1h' });
                return res.status(200).json({
                    ctx_contenido: 'Usuario inicio sesión correctamente.', success: true,
                    data: token
                });
            } else {
                return res.status(401).json({ ctx_contenido: 'Credenciales incorrectas.', success: false, data: null });
            }
        })
        .catch((err) => {
            return res.status(500).json({ ctx_contenido: err.message, success: false, data: null });
        });
};