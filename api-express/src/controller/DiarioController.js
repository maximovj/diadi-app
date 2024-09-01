const Diario = require('../models/diarioModel.js');

// @author Víctor J.
// @created 31/08/2024
// @updated 31/08/2024
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries

exports.listarDiario = async (req, res) => {
    const { usuario_id } = req.query;
    try {
        const diario_listar = await Diario.findAll({ where: { usuario_id }, limit: 15 });
        res.status(201).json(diario_listar);
    } catch (err) {
        res.status(404).json({ err });
    }
}

exports.verDiario = async (req, res) => {
    try {
        const diario = await Diario.findByPk(req.params.id);

        if (!diario) {
            return res.status(404).json({ err: 'Diario no encontrado en el sistema.' });
        }

        return res.status(200).json(diario);
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

exports.crearDiario = async (req, res) => {
    const { titulo, contenido } = req.body;
    try {
        const usuario_id = req.session_payload.id;
        const diario_crear = await Diario.create({ titulo, contenido, usuario_id });
        res.status(201).json(diario_crear);
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
}

exports.modificarDiario = async (req, res) => {
    try {
        const { titulo, contenido } = req.body;
        const diario = await Diario.findByPk(req.params.id);

        if (diario === null) {
            return res.status(404).json({ err: 'Diario no encontrado en el sistema.' });
        }

        await diario.update({ titulo, contenido });
        return res.status(200).json({ msg_title: 'Diario', msg_content: 'Diario modificado exitosamente.' });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

exports.eliminarDiario = async (req, res) => {
    try {
        const diario = await Diario.findByPk(req.params.id);

        if (!diario) {
            return res.status(404).json({ err: 'Diario no encontrado en el sistema.' });
        }

        await diario.destroy();
        return res.status(200).json({ msg_title: 'Diario', msg_content: 'Diario eliminado exitosamente.' });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}