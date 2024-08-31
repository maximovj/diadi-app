const express = require('express');
const routers = express.Router();
const tarea = require('../models/Tarea.js');

// Listar 15 tareas
routers.get('/tarea', async (req, res) => {
    const tareas_15 = await tarea.findAll({ limit: 15 });
    res.status(200).json({ test: 'Endpoint /GET', tareas_15 });
});

// Ver información de una tarea
routers.get('/tarea/:id', async (req, res) => {
    const id = req.params.id;
    const buscar_tarea = await tarea.findByPk(id);

    if (buscar_tarea) {
        res.status(200).json({ test: 'Endpoint /GET', buscar_tarea });
    } else {
        return res.status(404).json({ test: 'Tarea no encontrada' });
    }
});

// Registrar una tarea
routers.post('/tarea', async (req, res) => {
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
});

// Actualizar una tarea
routers.put('/tarea/:id', async (req, res) => {
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
});

//  Eliminar una tarea
routers.delete('/tarea/:id', async (req, res) => {
    const id = req.params.id;
    const buscar_tarea = await tarea.findByPk(id);

    if (buscar_tarea) {
        await buscar_tarea.destroy();
        return res.status(200).json({ test: 'Tarea eliminado' });
    } else {
        return res.status(404).json({ test: 'Tarea no encontrada' });
    }
});


module.exports = routers;