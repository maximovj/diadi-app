const Usuario = require('../models/Usuario');
const Diario = require('../models/Diario');

// Esta ruta es para crear o registrar un nuevo diario
exports.crearDiario = async (req, res) => {
    const { titulo, contenido, usuario_id } = req.body;
    try{
        const diario_crear = await Diario.create({ titulo, contenido, usuario_id });
        res.status(201).json(diario_crear);
    }catch(err){
        res.status(404).json({ err });
    }
}

// Esta ruta es para editar o modificar un diario registrado
exports.modificarDiario = async (req, res) => {
    const { id } = req.params;
    const { titulo, contenido, usuario_id } = req.body;
    try{
        const diario_modificar = await Diario.update({ titulo, contenido, usuario_id }, { where: { id } });
        res.status(201).json(diario_modificar); 
    } catch(err){
        res.status(404).json({ err });
    }
}