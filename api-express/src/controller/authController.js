const Usuario = require('../models/usuarioModel.js');

exports.registrar = (req, res) => {
    const { usuario, correo, contrasena } = req.body;
    Usuario.create({ usuario, correo, contrasena })
        .then(() => res.status(201).json({ ctx_contenido: 'Usuario registrado', success: true, }))
        .catch((err) => {
            console.log(Object.keys(err), err.name, err.origina, err.sql, err.errors);
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
                return res.status(200).json({
                    ctx_contenido: 'Usuario inicio sesión correctamente.', success: true,
                    data: { id: data.id, correo: data.correo }
                });
            } else {
                return res.status(401).json({ ctx_contenido: 'Credenciales incorrectas.', success: false, data: null });
            }
        })
        .catch((err) => {
            return res.status(500).json({ ctx_contenido: err.message, success: false, data: null });
        });
};