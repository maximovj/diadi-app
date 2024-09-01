import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContext";
import { Boton } from "../../components/Boton";

export function TaskModal({ show, handleClose, handleSubmit, newTask, handleChange }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`modal ${show ? 'd-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className={`modal-content ${theme === 'light' ? 'bg-light text-dark' : 'card-dark-mode text-light'}`}>
          <div className="modal-header">
            <h5 className="modal-title">Nueva Tarea</h5>
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
                  value={newTask.title}
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
                  value={newTask.description}
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
                  value={newTask.importance}
                  onChange={handleChange}
                >
                  <option value="Baja">Baja</option>
                  <option value="Normal">Normal</option>
                  <option value="Alta">Alta</option>
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
                    value={newTask.startDate}
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
                    value={newTask.deadline}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <Boton tipo="secondary" onClick={handleClose}>Cancelar</Boton>
            <Boton tipo="success" onClick={handleClose}>Guardar Tarea</Boton>
          </div>
        </div>
      </div>
    </div>
  );
}