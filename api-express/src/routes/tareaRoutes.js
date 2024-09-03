const express = require('express');
const routers = express.Router();
const {
    crearTarea,
    eliminarTarea,
    listarTareas,
    modificarTarea,
    verTarea } = require('../controller/_tareaController.js');

// Esta ruta es para listar todas las tareas registrados
routers.get('/tarea/mio', listarTareas);

// Esta ruta es para ver los datos de una tarea registrada
routers.get('/tarea/:id', verTarea);

// Esta ruta es para crear o registrar una nueva tarea
routers.post('/tarea', crearTarea);

// Esta ruta es para editar o modificar una tarea registrada
routers.put('/tarea/:id', modificarTarea);

// Esta ruta es para eliminar una tarea registrada
routers.delete('/tarea/:id', eliminarTarea);

module.exports = routers;