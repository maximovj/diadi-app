const Tarea = require('../models/tareaModel.js');

// @author Víctor J.
// @created 31/08/2024
// @updated 31/08/2024
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
// @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries

exports.listarTareas = async (req, res) => {
    const usuario_id = req.session_payload.id;
    try {
        const listar_tareas = await Tarea.findAll({ where: { usuario_id: usuario_id }, limit: 15 });
        res.status(200).json({
            ctx_contenido: 'Tarea listado exitosamente.',
            success: true,
            data: listar_tareas
        });
    } catch (err) {
        res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};

exports.verTarea = async (req, res) => {
    try {
        const id = req.params.id;
        const buscar_tarea = await Tarea.findByPk(id);

        if (buscar_tarea) {
            return res.status(200).json({
                ctx_contenido: 'Tarea encontrado en el sistema.',
                success: true,
                data: buscar_tarea,
            });
        } else {
            return res.status(404).json({
                ctx_contenido: 'Tarea no encontrado en el sistema.',
                success: false,
                data: null,
            });
        }
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};

exports.crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion, estado, importancia, fecha_inicio, fecha_limite } = req.body;
        const usuario_id = req.session_payload.id;
        const crear_tarea = await Tarea.create({
            titulo,
            descripcion,
            estado,
            importancia,
            fecha_inicio,
            fecha_limite,
            usuario_id
        });
        res.status(200).json({
            ctx_contenido: 'Tarea creado exitosamente.',
            success: true,
            data: crear_tarea,
        });
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};

exports.modificarTarea = async (req, res) => {
    try {
        const { titulo, descripcion, estado, importancia, fecha_inicio, fecha_limite } = req.body;
        const id = req.params.id;
        const buscar_tarea = await Tarea.findByPk(id);

        if (!buscar_tarea) {
            return res.status(404).json({
                ctx_contenido: 'Tarea no encontrada en el sistema.',
                success: false,
                data: null,
            });
        }

        const actualizar_tarea = await buscar_tarea.update({
            titulo,
            descripcion,
            estado,
            importancia,
            fecha_inicio,
            fecha_limite
        });

        return res.status(200).json({
            ctx_contenido: 'Tarea actualizado exitosamente.',
            success: true,
            data: actualizar_tarea,
        });
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};

exports.eliminarTarea = async (req, res) => {
    try {
        const id = req.params.id;
        const buscar_tarea = await Tarea.findByPk(id);

        if (!buscar_tarea) {
            return res.status(404).json({
                ctx_contenido: 'Tarea no encontrada en el sistema.',
                success: false,
                data: null,
            });
        }

        await buscar_tarea.destroy();

        return res.status(200).json({
            ctx_contenido: 'Tarea eliminado exitosamente.',
            success: true,
            data: buscar_tarea,
        });
    } catch (err) {
        return res.status(500).json({
            ctx_contenido: err.message,
            success: false,
            data: null
        });
    }
};