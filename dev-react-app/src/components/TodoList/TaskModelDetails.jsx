import { useEffect, useState } from "react";

export function TaskDetailsModal({ show, handleClose, task, handleEdit, handleDelete }) {
  const [editedTask, setEditedTask] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (task) {
      setEditedTask(task);
      setStartDate(task.startDate || ''); // Inicializar con cadena vacía si no hay fecha
      setDeadline(task.deadline || ''); // Inicializar con cadena vacía si no hay fecha
    }
  }, [task]);

  if (!editedTask) return null; // Mostrar modal solo cuando editedTask tiene un valor

  const confirmDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      handleDelete(editedTask.id);
      alert('La tarea ha sido eliminada correctamente.');
      handleClose();
    }
  };

  const handleSaveChanges = () => {
    if (editedTask) {
      // Actualizar editedTask con las fechas corregidas
      const updatedTask = {
        ...editedTask,
        startDate: startDate || null, // Convertir a null si es cadena vacía
        deadline: deadline || null, // Convertir a null si es cadena vacía
      };
      handleEdit(updatedTask);
      saveTasksToLocalStorage(updatedTask);
      alert('Cambios guardados correctamente.');
      handleClose();
    } else {
      alert('No se detectaron cambios.');
    }
  };

  const saveTasksToLocalStorage = (task) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(t => t.id === task.id ? task : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'deadline') {
      setDeadline(value);
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog">
      <div className={`modal-content ${document.body.classList.contains('dark-mode') ? 'card-dark-mode' : ''}`}>
          <div className="modal-header">
            <h5 className="modal-title">Detalles de Tarea</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={editedTask.title}
                  onChange={handleChange}
                  placeholder="Ingrese el título de la tarea"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={editedTask.description}
                  onChange={handleChange}
                  placeholder="Ingrese la descripción de la tarea"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="importance" className="form-label">Importancia</label>
                <select
                  className="form-select"
                  id="importance"
                  name="importance"
                  value={editedTask.importance}
                  onChange={handleChange}
                >
                  <option value="low">Baja</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                </select>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="startDate" className="form-label">Fecha de Inicio</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="deadline" className="form-label">Fecha Límite</label>
                  <input
                    type="date"
                    className="form-control"
                    id="deadline"
                    name="deadline"
                    value={deadline}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="completed"
                  name="completed"
                  checked={editedTask.completed}
                  onChange={() => setEditedTask({ ...editedTask, completed: !editedTask.completed })}
                />
                <label className="form-check-label" htmlFor="completed">Completada</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger me-auto" onClick={confirmDelete}>Eliminar</button>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  );
}