const tarea = require('../models/Tarea.js');

// @author Víctor J.
// @created 31/08/2024
// @updated 31/08/2024
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries

exports.listarTareas = async (req, res) => {
    const tareas_15 = await tarea.findAll({ limit: 15 });
    res.status(200).json({ test: 'Endpoint /GET', tareas_15 });
};

exports.verTarea = async (req, res) => {
    const id = req.params.id;
    const buscar_tarea = await tarea.findByPk(id);

    if (buscar_tarea) {
        res.status(200).json({ test: 'Endpoint /GET', buscar_tarea });
    } else {
        return res.status(404).json({ test: 'Tarea no encontrada' });
    }
};

exports.crearTarea = async (req, res) => {
    const { titulo, descripcion, estado, importancia, fecha_inicio, fecha_limite } = req.body;
    const crear_tarea = await tarea.create({
        titulo,
        descripcion,
        estado,
        importancia,
        fecha_inicio,
        fecha_limite
    });
    res.status(200).json({ test: 'Endpoint /GET', crear_tarea });
};

exports.modificarTarea = async (req, res) => {
    const { titulo, descripcion, estado, importancia, fecha_inicio, fecha_limite } = req.body;
    const id = req.params.id;

    const buscar_tarea = await tarea.findByPk(id);

    if (buscar_tarea) {
        const actualizar_tarea = await buscar_tarea.update({
            titulo,
            descripcion,
            estado,
            importancia,
            fecha_inicio,
            fecha_limite
        });
        return res.status(200).json({ test: 'Endpoint /GET', actualizar_tarea });
    } else {
        return res.status(404).json({ test: 'tarea no encontrada' });
    }
};

exports.eliminarTarea = async (req, res) => {
    const id = req.params.id;
    const buscar_tarea = await tarea.findByPk(id);

    if (buscar_tarea) {
        await buscar_tarea.destroy();
        return res.status(200).json({ test: 'Tarea eliminado' });
    } else {
        return res.status(404).json({ test: 'Tarea no encontrada' });
    }
};