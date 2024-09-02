import { useCallback, useEffect, useState } from "react";
import { TaskModal } from "../components/TodoList/TaskModal";
import { TaskDetailsModal } from "../components/TodoList/TaskModelDetails";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { getBorderColor, groupTasksByDate } from "../utils/fnTaskList";

// Modulo de notificaciones toast
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modulo para manipular la fecha
import moment from 'moment';
import 'moment/locale/es-mx';

// Servicios
import { serviceTareaCrear, serviceTareaListar } from "../services/service_tarea";

export function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [tarea, setTarea] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    importancia: 'baja',
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_limite: new Date().toISOString().split('T')[0],
  });

  // Mostrar notificaciones de toast
  const showToast = (message, type) => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const fetchTasks = useCallback(() => {
    serviceTareaListar()
      .then(response => {
        if (response.data?.success) {
          setTareas(response.data.data);
        }
      });
  }, []);

  // Cargar las tareas al cargar el componente
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Función para abrir el modal de nueva tarea
  const handleOpenModal = () => setShowModal(true);

  // Función para cerrar el modal de nueva tarea
  const handleCloseModal = () => {
    setShowModal(false);
    setTarea({
      titulo: '',
      descripcion: '',
      estado: 'pendiente',
      importancia: 'baja',
      fecha_inicio: new Date().toISOString().split('T')[0],
      fecha_limite: new Date().toISOString().split('T')[0],
    });
  };

  // Función para manejar los cambios en el formulario de nueva tarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarea({
      ...tarea,
      [name]: value,
    });
  };

  // Función para manejar el submit del formulario de nueva tarea
  const handleSubmit = () => {
    if (!tarea.titulo || !tarea.descripcion) {
      showToast('Verifica que los campos sean correctos.', 'error');
      return;
    }

    serviceTareaCrear(tarea)
      .then((response) => {
        if (response.data?.success) {
          showToast(response.data.ctx_contenido, 'success');
          setTareas([...tareas, response.data.data]);
          handleCloseModal(); // Cerrar el modal después de guardar
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          showToast(err.response.data.ctx_contenido, 'error');
        }
      });

  };

  // Componente principal de la página de tareas
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Lista de Tareas</h2>
        <Boton tipo={`primary`} onClick={handleOpenModal}>
          + Nueva Tarea
        </Boton>
      </div>

      {/* Se muestran todas las tareas */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
        {tareas.map((itemTarea) => (
          <div className="col" key={itemTarea.id}>
            <Tarjeta className={`m-auto card-dark-mode h-100`}>
              <div className="card-header">
                <h6>{itemTarea.titulo}</h6>
              </div>
              <div className="card-body">
                {itemTarea.descripcion}
                <hr className="dropdown-divider" />
                <h6>
                  <span className="badge bg-success">{itemTarea.estado}</span> &nbsp;
                  <span className="badge bg-warning">{itemTarea.importancia}</span>
                </h6>
                <div><small className="text-muted" style={{ fontSize: '9px' }}>{moment(itemTarea.fecha_inicio).format('LL')} - {moment(itemTarea.fecha_limite).format('LL')}</small></div>
              </div>
              <div className="card-footer">
                <small className="text-muted">
                  {moment(itemTarea.createdAt).fromNow()}
                </small>
              </div>
            </Tarjeta>
          </div>
        ))}
      </div>

      {/* Modal para crear nueva tarea */}
      <TaskModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        tarea={tarea}
        handleChange={handleChange}
      />

      <ToastContainer />
    </div>
  );
}
