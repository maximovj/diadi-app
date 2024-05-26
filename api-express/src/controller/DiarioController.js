const Usuario = require('../models/Usuario');
const Diario = require('../models/Diario');


// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries
// Esta ruta es para listar todos los diarios registrados
exports.listarDiario = async(req, res) => {
    const { usuario_id } = req.body;
    try{
        const diario_listar = await Diario.findAll({ where: { usuario_id }, limit: 15});
        res.status(201).json(diario_listar);
    } catch(err){
        res.status(404).json({ err });
    }
}

// Esta ruta es para ver los datos de un diario registrado
exports.verDiario = async (req, res) => {
    try {
        const diario = await Diario.findByPk(req.params.id);

        if(!diario) {
            return res.status(404).json({ err: 'Diario no encontrado en el sistema.' });
        }

        return res.status(200).json(diario);
    } catch(err){
        return res.status(500).json({ err });
    }
}

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
    try{
        const { titulo, contenido, usuario_id } = req.body;
        const diario = await Diario.findByPk(req.params.id);
        
        if(diario === null){
            return res.status(404).json({ err: 'Diario no encontrado en el sistema.' });
        }
        
        diario.titulo = titulo;
        diario.contenido = contenido;
        diario.usuario_id = usuario_id;

        await diario.save();
        return res.status(200).json({ msg_title: 'Diario', msg_content: 'Diario modificado exitosamente.' });
    } catch(err){
        return res.status(500).json({ err });
    }
}

// Esta ruta es para eliminar un diario registrado
exports.eliminarDiario = async (req, res) => {
    try{
        const diario = await Diario.findByPk(req.params.id);

        if(!diario){
            return res.status(404).json({ err: 'Diario no encontrado en el sistema.' });
        }

        await diario.destroy();
        return res.status(200).json({ msg_title: 'Diario', msg_content: 'Diario eliminado exitosamente.' });
    } catch(err){
        return res.status(500).json(err);
    }
}