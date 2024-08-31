const Usuario = require('../models/usuarioModel.js');

exports.registrar = (req, res) => {
    const { usuario, correo, contrasena } = req.body;
    Usuario.create({ usuario, correo, contrasena })
        .then(() => res.status(201).json({ cxt_contenido: 'Usuario registrado', success: true, }))
        .catch((err) => res.status(500).json({ cxt_contenido: err.message, success: false, }));
};

exports.acceder = (req, res) => {
    const { usuario, contrasena } = req.body;
    Usuario.findOne({ where: { usuario: usuario } })
        .then((data) => {
            if (data.contrasena === contrasena) {
                return res.status(200).json({
                    cxt_contenido: 'Usuario inicio sesión correctamente.', success: true,
                    data: { id: data.id, correo: data.correo }
                });
            } else {
                return res.status(401).json({ cxt_contenido: 'Credenciales incorrectas.', success: false, data: null });
            }
        })
        .catch(() => res.status(500).json({ cxt_contenido: err.message, success: false, data: null }));
};