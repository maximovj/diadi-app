const express = require('express');
const routers = express.Router();
const {
    crearTarea,
    eliminarTarea,
    listarTareas,
    modificarTarea,
    verTarea } = require('../controller/TareaController.js');

// Listar 15 tareas
routers.get('/tarea', listarTareas);

// Ver información de una tarea
routers.get('/tarea/:id', verTarea);

// Registrar una tarea
routers.post('/tarea', crearTarea);

// Actualizar una tarea
routers.put('/tarea/:id', modificarTarea);

//  Eliminar una tarea
routers.delete('/tarea/:id', eliminarTarea);

module.exports = routers;