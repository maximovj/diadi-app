// Hooks de react js 
import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// Componentes
import { TaskModal } from "../../components/TodoList/TaskModal";
import { Tarjeta } from "../../components/Tarjeta";
import { Boton } from "../../components/Boton";
import { Contenedor } from "../../components/Contenedor";

// Modulo de notificaciones toast
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modulo para manipular la fecha
import moment from 'moment';
import 'moment/locale/es-mx';

// Servicios
import { serviceTareaCrear, serviceTareaListar } from "../../services/service_tarea";
import { Rutas } from "../../routes/routes";

// Contexto 
import { useAuth } from "../../context/AuthContext";

export function Tareas() {
  const { logout } = useAuth();
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
      })
      .catch(() => {
        logout();
      });
  }, [logout]);

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
      .catch(() => {
        logout();
      });

  };

  // Componente principal de la página de tareas
  return (
    <Contenedor alignItems="align-items-stretch">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Lista de tareas</h2>
        <Boton tipo={`primary`} onClick={handleOpenModal}>
          + Nueva Tarea
        </Boton>
      </div>

      {/* Se muestran todas las tareas */}
      <div className="row mt-4 g-2">
        {tareas.map((itemTarea) => (
          <div className="col-12 col-lg-4 mb-4" key={itemTarea.id}>
            <Tarjeta className={`card-dark-mode w-100 h-100`}>
              <div className="card-body">
                <h5>{itemTarea.titulo}</h5>
                {itemTarea.descripcion}
                <hr className="dropdown-divider" />
                <h6>
                  <span className="badge bg-success">{itemTarea.estado}</span> &nbsp;
                  <span className="badge bg-warning">{itemTarea.importancia}</span>
                </h6>
                <div><small className="text-muted" style={{ fontSize: '9px' }}>{moment(itemTarea.fecha_inicio).format('LL')} - {moment(itemTarea.fecha_limite).format('LL')}</small></div>
              </div>
              <div className="card-footer">
                <div className="d-flex align-content-center justify-content-between">
                  <small className="text-muted">
                    {moment(itemTarea.createdAt).fromNow()}
                  </small>
                  <Link
                    to={{
                      pathname: `${Rutas.TAREAS_EDITAR}`,
                      search: `?id=${itemTarea.id}`
                    }}
                  >
                    <i className="la la-pencil-square-o"></i>
                  </Link>
                </div>
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
        handleChange={handleChange}
        tarea={tarea}
      />

      <ToastContainer />
    </Contenedor>
  );
}
