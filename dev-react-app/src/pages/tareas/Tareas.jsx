// Hooks de react js 
import { useCallback, useEffect, useState } from "react";

// Servicios
import { serviceTareaCrear, serviceTareaListar } from "../../services/service_tarea";

// Componentes
import { ModalCrear } from "../../components/tareas/ModalCrear";
import { Boton } from "../../components/Boton";
import { Contenedor } from "../../components/Contenedor";
import { SinTareas } from "../../components/tareas/SinTareas";
import { TarjetaTarea } from "../../components/tareas/TarjetaTarea";

// Modulo de notificaciones toast
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexto 
import { useAuth } from "../../context/AuthContext";

// Componentes funcional
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

  const renderizarTareas = () => {
    if (tareas.length <= 0) {
      return <SinTareas />
    } else {
      return tareas.map((tarea) => (
        <TarjetaTarea itemTarea={tarea} key={`${tarea.id + Date.now()}`} />
      ));
    }
  }

  // Componente principal de la página de tareas
  return (
    <Contenedor alignItems="align-items-stretch">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Lista de tareas</h2>
        <Boton type={`primary`} onClick={handleOpenModal}>
          <i className='la la-plus-circle' /> Nuevo tarea
        </Boton>
      </div>

      {/* Se muestran todas las tareas */}
      <div className="row mt-4 g-2">
        {renderizarTareas()}
      </div>

      {/* Modal para crear nueva tarea */}
      <ModalCrear
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
