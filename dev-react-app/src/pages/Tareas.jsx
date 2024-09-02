import { useCallback, useEffect, useState } from "react";
import { TaskModal } from "../components/TodoList/TaskModal";
import { TaskDetailsModal } from "../components/TodoList/TaskModelDetails";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { getBorderColor, groupTasksByDate } from "../utils/fnTaskList";

// Modulo de notificaciones toast
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Servicios
import { serviceTareaCrear, serviceTareaListar } from "../services/service_tarea";

export function Tareas() {
  const [currentUser, setCurrentUser] = useState("admin"); // Usuario estático por ahora
  const [tasks, setTasks] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    importance: "normal",
    deadline: "",
    startDate: "",
    inProgress: false,
    completed: false,
  });

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

  // Función para obtener las tareas desde el localStorage
  const fetchTasks = useCallback(() => {
    const storedTasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    setTasks(storedTasks);

    serviceTareaListar()
      .then(response => {
        if (response.data?.success) {
          setTareas(response.data.data);
        }
      });

  }, [currentUser]);

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
          handleCloseModal(); // Cerrar el modal después de guardar
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          showToast(err.response.data.ctx_contenido, 'error');
        }
      });

  };

  // Función para abrir el modal de detalles de tarea
  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  // Función para cerrar el modal de detalles de tarea
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedTask(null); // Limpiar la tarea seleccionada
  };

  // Función para editar una tarea
  const handleEditTask = (editedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    saveTasksToLocalStorage(updatedTasks); // Guardar las tareas actualizadas en el localStorage
    handleCloseDetailsModal(); // Cerrar el modal de detalles después de editar
  };

  // Función para eliminar una tarea
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasksToLocalStorage(updatedTasks); // Guardar las tareas actualizadas en el localStorage
    handleCloseDetailsModal(); // Cerrar el modal de detalles después de eliminar
  };

  // Función para manejar los cambios en la tarea seleccionada en el modal de detalles
  const handleSelectedTaskChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask({
      ...selectedTask,
      [name]: value,
    });
  };

  // Función para guardar las tareas actualizadas en el localStorage
  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem(currentUser, JSON.stringify(updatedTasks));
    setTasks(updatedTasks); // Actualizar el estado de las tareas
  };

  // Agrupar las tareas por fecha
  const groupTasksByDate = (taskList) => {
    return taskList.reduce((acc, task) => {
      const date = task.startDate || task.deadline; // Usar startDate o deadline
      const formattedDate = date ? date : "Fecha sin asignar";
      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(task);
      return acc;
    }, {});
  };

  // Renderizar las tareas agrupadas por fecha
  const renderTasksByDate = (taskList) => {
    const groupedByDate = groupTasksByDate(taskList);
    return Object.keys(groupedByDate).map((date) => (
      <div key={date}>
        <h5>{date}</h5>
        {groupedByDate[date].map((task) => (
          <div
            key={task.id}
            className={`card mb-2 border-${task.importance}`}
            onClick={() => handleViewDetails(task)}
          >
            <div
              className={`card h-100 ${document.modoOscuroActivo ? "card-dark-mode" : ""
                }`}
            >
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <p>
                <strong>Importancia:</strong> {task.importance} |{" "}
                <strong>Fecha limite:</strong> {task.deadline || " sin asignar"}
              </p>
            </div>
          </div>
        ))}
      </div>
    ));
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
              </div>
              <div className="card-footer">
                <small className="text-muted">
                  Creada: {itemTarea.createdAt}
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
        newTask={newTask}
        tarea={tarea}
        handleChange={handleChange}
      />

      {/* Modal para ver detalles de tarea */}
      <TaskDetailsModal
        show={showDetailsModal}
        handleClose={handleCloseDetailsModal}
        task={selectedTask}
        handleEdit={handleEditTask}
        handleDelete={handleDeleteTask}
        handleChange={handleSelectedTaskChange}
      />

      <ToastContainer />
    </div>
  );
}
