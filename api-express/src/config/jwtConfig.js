require('dotenv').config();
const jwt = require('jsonwebtoken');
const hash_secret = process.env.HASH_SECRET || '3!yH$xd6nsnXwdG?sqm34C$p%tD#7b';

// Configuración para verificar token (usando JSON Web Token)
const jwtConfig = (req, res, next) => {
    const auth = req.headers.authorization || '';
    const token = auth?.split(' ')[1] || '';

    if (auth.startsWith('Bearer') && token) {
        jwt.verify(token, hash_secret, (err, payload) => {
            if (err) {
                return res.status(401).json({ ctx_contenido: 'Token no valido', success: false, });
            }

            req.session_payload = payload;
            next();
        });
    } else {
        return res.status(401).json({ ctx_contenido: 'Token no proporcionado', success: false, });
    }
};

module.exports = jwtConfig;