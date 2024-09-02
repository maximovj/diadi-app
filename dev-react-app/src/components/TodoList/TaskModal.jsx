import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContext";
import { Boton } from "../../components/Boton";

export function TaskModal({ show, handleClose, handleSubmit, tarea, newTask, handleChange }) {
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
                <label htmlFor="titulo" className="form-label">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="titulo"
                  value={tarea.titulo}
                  onChange={handleChange}
                  placeholder="Ingrese el título de la tarea"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  name="descripcion"
                  rows="3"
                  value={tarea.descripcion}
                  onChange={handleChange}
                  placeholder="Ingrese la descripción de la tarea"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="importancia" className="form-label">Importancia</label>
                <select
                  className="form-select"
                  id="importancia"
                  name="importancia"
                  value={tarea.importancia}
                  onChange={handleChange}
                >
                  <option value="baja">Baja</option>
                  <option value="normal">Normal</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="estado" className="form-label">Estado</label>
                <select
                  className="form-select"
                  id="estado"
                  name="estado"
                  value={tarea.estado}
                  onChange={handleChange}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_progreso">En progreso</option>
                  <option value="finalizado">Finalizado</option>
                </select>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="fecha_inicio" className="form-label">Fecha de Inicio</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha_inicio"
                    name="fecha_inicio"
                    value={tarea.fecha_inicio}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="fecha_limite" className="form-label">Fecha Límite</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha_limite"
                    name="fecha_limite"
                    value={tarea.fecha_limite}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <Boton tipo="secondary" onClick={handleClose}>Cancelar</Boton>
            <Boton tipo="success" onClick={handleSubmit}>Guardar Tarea</Boton>
          </div>
        </div>
      </div>
    </div>
  );
}